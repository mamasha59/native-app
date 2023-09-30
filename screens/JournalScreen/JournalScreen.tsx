import { View, ScrollView, Share, Alert } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import { DropDown } from "../../assets/images/icons";

import JournalRecord from "../../components/JournalRecord/JournalRecord";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import JournalCalendar from "../../components/JournalCalendar/JournalCalendar";
import { getCurrentMonth, months } from "../../utils/date";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import { iMonth } from "../../Types";

const JournalScreen = () => {
  const [month, setSelectedMonth] = useState<iMonth>({
    month: months[getCurrentMonth].value,
    index: getCurrentMonth,
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
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

  return (
    <MainLayout title="Дневник мочеиспускания">
      {/* Выбор месяца | Отображение нынешнего месяца */}
      <View className="mb-4 relative p-0 m-0">
        <Picker
          mode="dropdown"
          selectedValue={month.month}
          onValueChange={(itemValue, index) =>
            setSelectedMonth({ month: itemValue, index: index })
          }
        >
          {months.map((e, index) => (
            <Picker.Item
              fontFamily="geometria-regular"
              key={index}
              style={{ fontSize: 12, lineHeight: 15 }}
              label={e.value}
              value={e.value}
            />
          ))}
        </Picker>
        <View className="p-1 absolute left-[20%] bottom-[14px]">
          <DropDown />
        </View>
        <View className="absolute right-0 w-12 h-12 p-3 bg-[#ffff]"></View>
      </View>
      {/* календарь */}
      <JournalCalendar month={month} setSelectedMonth={setSelectedMonth} />
      {/* list */}
      <ScrollView className="flex-1 overflow-hidden">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <JournalRecord key={index} />
          ))}
      </ScrollView>
      <DoubleButton
        showIcon={false}
        textOfLeftButton="Отправить"
        textOfRightButton="Сохранить PDF"
        handlePressLeftButton={onShare}
      />
    </MainLayout>
  );
};

export default JournalScreen;
