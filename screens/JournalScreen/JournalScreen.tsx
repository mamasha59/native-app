import { View, Text } from "react-native";
import MainLayout from "../../components/MainLayout/MainLayout";
import { DropDown } from "../../assets/images/icons";
import { CalendarProvider } from "react-native-calendars";
import WeekCalendar from "react-native-calendars/src/expandableCalendar/WeekCalendar";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { months } from "./months";

const JournalScreen = () => {

  const [month, setSelectedMonth] = useState<any>('');
  const [currentMonth, setCurrentMonth] = useState<any>('');

  const today = new Date().toISOString().split('T')[0];
  const fastDate = getPastDate(3);
  const futureDates = getFutureDates(12);
  const dates = [fastDate, today].concat(futureDates);

  const getCurrentMonth = new Date().getMonth();

  useEffect(() => {
    setCurrentMonth(months[getCurrentMonth].value);
  },[getCurrentMonth])

    console.log(currentMonth);
    
    function getFutureDates(numberOfDays: number) {
      const array: string[] = [];
      for (let index = 1; index <= numberOfDays; index++) {
        let d = Date.now();
        
        if (index > 8) {
          // set dates on the next month
          const newMonth = new Date().getMonth() + 1;
          d = new Date(d).setMonth(newMonth);
        }
        const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);    
      }
      return array;
    }

    function getPastDate(numberOfDays: number) {
      return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
    }

  return (
    <MainLayout title="Дневник мочеиспускания">
      <View className="mb-4 relative">
        <Picker
          mode="dropdown"
          prompt="Ну выбири уже!"
          selectedValue={currentMonth}
          onValueChange={(itemValue) =>
            setSelectedMonth(itemValue)}
        >
          {months.map((e,index) => 
            <Picker.Item fontFamily="geometria-regular"
              key={index}
              style={{fontSize: 12, lineHeight: 15 }}
              label={e.value}
              value={e.value}/>
          )}
        </Picker>
        <View className="p-1 absolute left-[20%] bottom-[14px]">
              <DropDown/>
        </View>
        <View className="absolute right-0 w-12 h-12 p-3 bg-white"></View>
      </View>
     
      {/* <View className="w-12 h-12 bg-[#4BAAC5] items-center justify-center rounded-md">
        <Text style={{ fontFamily: "geometria-regular" }} className="color-[#ffff] text-xs">
          сб
        </Text>
        <Text style={{ fontFamily: "geometria-bold" }} className="color-[#ffff] text-xl">
          15
        </Text>
      </View> */}
      <CalendarProvider date={dates[1]} showTodayButton>
        <WeekCalendar
          displayLoadingIndicator={true}
          allowShadow={false}
          firstDay={1}
          style={{}}
          />
      </CalendarProvider>
 
      {/* list */}
      {/* <View className="flex-1 gap-3">
        <View  className="flex-row justify-between items-center border px-[15px] py-[10px] rounded-md border-[#4babc563]">
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Время</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">21:54</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Катетеризация:</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">Фолея</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Выпито жид.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">200 мл.</Text>
          </View>
          <View className="gap-1 p-2">
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
          </View>
        </View>
        <View  className="flex-row justify-between items-center border px-[15px] py-[10px] rounded-md border-[#4babc563]">
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Время</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">21:54</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Катетеризация:</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">Фолея</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Выпито жид.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">200 мл.</Text>
          </View>
          <View className="gap-1 p-2">
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
          </View>
        </View>
        <View  className="flex-row justify-between items-center border px-[15px] py-[10px] rounded-md border-[#4babc563]">
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Время</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">21:54</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Катетеризация:</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">Фолея</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Выпито жид.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">200 мл.</Text>
          </View>
          <View className="gap-1 p-2">
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
          </View>
        </View>
        <View  className="flex-row justify-between items-center border px-[15px] py-[10px] rounded-md border-[#4babc563]">
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Время</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">21:54</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Катетеризация:</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">Фолея</Text>
          </View>
          <View className="items-start">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-[#101010]">Выпито жид.</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-[#101010]">200 мл.</Text>
          </View>
          <View className="gap-1 p-2">
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
            <View className="bg-[#4BAAC5] w-[4px] h-[4px] rounded-full"></View>
          </View>
        </View>
      </View> */}
    </MainLayout>
  );
};

export default JournalScreen;
