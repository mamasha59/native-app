import { View, ScrollView, RefreshControl, TouchableOpacity, Text, Share, Alert } from "react-native";
import { useRef, useState, useCallback } from "react";
import { Picker } from "@react-native-picker/picker";

import MainLayout from "../../components/MainLayout/MainLayout";
import { DropDown } from "../../assets/images/icons";
import { months } from "./months";
import { iDay, iMonth } from "../../Types";
import CalendarDay from "../../components/CalendarDay/CalendarDay";
import JournalRecord from "../../components/JournalRecord/JournalRecord";

const JournalScreen = () => {
  const day = new Date();
  const getCurrentMonth = day.getMonth(); // сегоднящний месяц
  const [month, setSelectedMonth] = useState<iMonth>({month: months[getCurrentMonth].value, index: getCurrentMonth});

  const scrollViewRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления

  const daysArray:iDay[] | undefined = createArrayOfDays(day.getDate()); // массив дней от начала месяца до сегодня

  function createArrayOfDays(numberOfDay: number) {
    const arrayOfDays = [];
    const currentYear = day.getFullYear();
    // Определяем последний день текущего месяца
    const lastDayOfMonth = new Date(currentYear, month.index + 1, 0).getDate();

    for (let i = 1; i <= lastDayOfMonth; i++) {
      const currentDate = new Date(currentYear, getCurrentMonth, i);
      const weekDay = currentDate.getDay();
      
      arrayOfDays.push({
        dayNumber: i,
        weekNumber: weekDay,
        month: month,
        year: currentYear,
      });
    }
    console.log(arrayOfDays);
    return getCurrentMonth === month.index ? arrayOfDays.slice(0, numberOfDay) : arrayOfDays;
  }
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    scrollViewRef.current?.scrollTo();
    setSelectedMonth({month: months[getCurrentMonth].value, index: getCurrentMonth});
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
// TODO - ИСПРАВИТЬ ДНИ НЕДЕЛИ - компонент для общих кнопок(такие же кнопки и на главном экране)
  return (
    <MainLayout title="Дневник мочеиспускания" >
      {/* Выбор месяца | Отображение нынешнего месяца */}
      <View className="mb-4 relative p-0 m-0">
        <Picker
          mode="dropdown"
          selectedValue={month.month}
          onValueChange={(itemValue, index) =>
            setSelectedMonth({month: itemValue, index: index})}
        >
          {months.map((e,index) => 
            <Picker.Item fontFamily="geometria-regular"
              key={index}
              style={{fontSize: 12, lineHeight: 15}}
              label={e.value}
              value={e.value}/>
          )}
        </Picker>
        <View className="p-1 absolute left-[20%] bottom-[14px]">
          <DropDown/>
        </View>
        <View className="absolute right-0 w-12 h-12 p-3 bg-[#ffff]"></View>
      </View>
      {/* календарь */}
      <ScrollView
        scrollEnabled={!refreshing}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        snapToStart={true}
        ref={scrollViewRef}
        horizontal={true}
        className={`flex-grow-0 overflow-hidden ${refreshing && 'opacity-70'}`}>
        {daysArray.reverse().map(e => 
          <CalendarDay key={e.dayNumber} e={e}/>
        )}
      </ScrollView>
      {/* list */}
      <ScrollView className="flex-1">
         {Array(10).fill(null).map((_,index)=>
          <JournalRecord key={index}/>
         )} 
      </ScrollView>
      <View className="flex-row justify-between mb-5">
        <TouchableOpacity activeOpacity={0.7} onPress={onShare} className="px-10 py-[14px] bg-[#96A] rounded-[89px]">
          <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-[#ffff]">Отправить</Text> 
          </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} className="px-10 py-[14px] bg-main-blue rounded-[89px]">
          <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-[#ffff]">Сохранить PDF</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default JournalScreen;
