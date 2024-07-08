import { View, Text, TouchableOpacity, ScrollView, Alert, Platform } from "react-native";
import {Calendar, DateData} from 'react-native-calendars';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { format, subDays } from "date-fns";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from "expo-linear-gradient";

import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import { generatePdfPattern } from "../../../utils/PdfPattern/PdfPattern";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import { dateFormat } from "../../../utils/const";
import { iDairyRecord } from "../../../types";
import { handleCheckBoxAddSurveyInPdf } from "../../../store/slices/journalDataSlice";

interface iModalCustomizePdf {
    handleModalState: () => void,
    buttonName: string
}

export type FilteredRecords = {
  [date: string]: iDairyRecord[];
};

const window = Dimensions.get('window');

const ModalCustomizePdf = ({handleModalState, buttonName}:iModalCustomizePdf) => {
    const chooseCalendarDay = '#50cebb'
    const dispatch = useAppDispatch()
    const {urineDiary, modalCustomizePdfDocument, checkBoxAddSurveyInPdf} = useAppSelector(state => state.journal);
    const {surveyAnswers, calendareDay} = useAppSelector(state => state.appStateSlice);
    const userData = useAppSelector(state => state.user);

    const navigate = useNavigation<StackNavigationRoot>();

    const [markedDates, setMarkedDates] = useState<MarkedDates>({});
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
      
    const maxDate = format(new Date(), dateFormat).slice(0,10);
    useEffect(() => {
      setStartDate(calendareDay);
      setMarkedDates({
        [calendareDay] : { color: '#50cebb', textColor: 'white' }
      })
    },[])

    const onDayPress = (day: DateData) => {
      let newMarkedDates: MarkedDates = {};
      const dayString = day.dateString;
  
      if (Object.keys(markedDates).length === 0) {
        newMarkedDates[dayString] = { startingDay: true, color: chooseCalendarDay, textColor: 'white' };
        setStartDate(dayString);
        setEndDate(null);
      } else if (Object.keys(markedDates).length === 1) {
        const start = Object.keys(markedDates)[0];
        const end = dayString;
        
        if (start !== end) {
          let range: MarkedDates = {};
          let startDateObj = new Date(start);
          let endDateObj = new Date(end);

          while (startDateObj <= endDateObj) {
            const dateString = startDateObj.toISOString().split('T')[0];
            range[dateString] = {
              color: '#70d7c7',
              textColor: 'white'
            };
            startDateObj.setDate(startDateObj.getDate() + 1);
          }
          range[start] = { startingDay: true, color: chooseCalendarDay, textColor: 'white' };
          range[end] = { endingDay: true, color: chooseCalendarDay, textColor: 'white' };
          newMarkedDates = range;
          setEndDate(end);
        }
      } else {
        newMarkedDates[dayString] = { startingDay: true, color: chooseCalendarDay, textColor: 'white' };
        setStartDate(dayString);
        setEndDate(null);
      }
      setMarkedDates(newMarkedDates);
    };
  
    const getSelectedPeriod = () => {
      if (startDate && endDate) {
        return `с ${startDate} по ${endDate}`;
      } else if (startDate) {
        return `${startDate}`;
      }
      return 'Selected date';
    };

    const handleButtonSaveOrShare = async () => { // generate Pdf from Html and share it      
      dispatch(handleCheckBoxAddSurveyInPdf(false)); // switch checkbox of Survey
      const dateRecords:FilteredRecords = {};
      if (Object.keys(markedDates).length > 0){
        Object.keys(markedDates).forEach(date => {
            dateRecords[date] = [];
        });
      
        urineDiary.forEach(record => {
            const timeStamp = record.timeStamp;
            const recordDate = timeStamp.split(' ')[0];
    
            if (dateRecords[recordDate]) {
                dateRecords[recordDate].push(record);
            }
        });
        const pdf = await generatePdfPattern({showSurvey: checkBoxAddSurveyInPdf, filteredRecordByDate: dateRecords, answers: surveyAnswers, userData: userData});

        if(dateRecords) {
          const { uri } = await Print.printToFileAsync({html:pdf, useMarkupFormatter:true, base64:true});

          if(buttonName === 'download'){          
            if (Platform.OS === "android") {
              const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          
              if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
          
                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'Yor-Journal', 'application/pdf')
                  .then(async (uri) => {
                    await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                  })
                  .catch(e => console.log(e))
                  .finally(() => handleModalState())
              } else {
                Sharing.shareAsync(uri);
              }
            } else {
              Sharing.shareAsync(uri);
            }
          } else {
            const isSharingExist = Sharing.isAvailableAsync();
            if(!isSharingExist) {
              Alert.alert('Doesnt work on this device!');
              return;
            }
            await Sharing.shareAsync(uri, {dialogTitle:'Title sex', mimeType:'application/pdf'});
          }
        }
        handleModalState();
      } else {
        Alert.alert('Выберите интервал!')
      }
    };

    const handlePressButtonSurvey = () => {
      navigate.navigate('Survey', {cameFrom: 'customizePdf'});
      handleModalState();
    }

    const handlePressButtonUserData = () => {
      navigate.navigate('PdfOnBoarding');
      handleModalState();
    }

    const getLastThreeDays = (numberOfDays:number) => {
      const today = new Date();
      let newMarkedDates: MarkedDates = {};

      for (let i = 0; i < numberOfDays; i++) {
        const date = subDays(today, i);
        const formattedDate = format(date, 'yyyy-MM-dd');        
        newMarkedDates[formattedDate] = { color: '#50cebb', textColor: 'white' };
      }

      // Получаем ключи и изменяем первый и последний элементы
      const keys = Object.keys(newMarkedDates);
      if (keys.length > 0) {
        newMarkedDates[keys[0]] = { endingDay: true, color: '#50cebb', textColor: 'white' }; // end
        newMarkedDates[keys[keys.length - 1]] = { startingDay: true, color: '#50cebb', textColor: 'white' }; // start
        setStartDate(keys[keys.length - 1]); // UI end of selected days interval
        setEndDate(keys[0]);  // UI start of selected days interval
      }
      setMarkedDates(newMarkedDates);      
    };

  return (
    <ModalSelect height={1} showIcon={false} title="Создание документа" onItemPress={()=> console.log('hi')} openModal={modalCustomizePdfDocument} setOpenModal={handleModalState}>
        <ScrollView className="flex-1 h-full pt-2">
            <View className="flex-1 items-center justify-between h-full">
                <View className="flex-1 items-center h-full">
                    <Text style={{fontFamily:'geometria-regular'}} className="">Выберите интервал документа:</Text>
                    <Text style={{fontFamily:'geometria-regular'}} className="text-sm">
                      формат:
                      <Text className="italic"> гггг-мм-дд</Text>
                     </Text>

                    <View className="items-center mt-6">
                        <View className="flex-row items-center mb-2">
                            <TouchableOpacity className="p-2 border-b-[0.5px] border-t-[0.5px]">
                                <Text style={{fontFamily:'geometria-bold'}} className="text-lg">{getSelectedPeriod() || 'Select date'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Calendar
                          maxDate={maxDate}
                          markingType="period"
                          enableSwipeMonths
                          style={{ width: window.width / 1.5 }}
                          className="mx-auto"
                          markedDates={markedDates}
                          firstDay={1}
                          onDayPress={onDayPress}
                          theme={{textDayFontWeight:'900'}}
                        />
                        <View className="flex-row  gap-2">
                            <TouchableOpacity onPress={() => getLastThreeDays(3)} activeOpacity={.7} className="px-2 items-center">
                                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg text-center after:border-b border-main-blue">3 дня</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => getLastThreeDays(7)} activeOpacity={.7} className="px-2 items-center">
                                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg text-center after:border-b border-main-blue">7 дней</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => getLastThreeDays(30)} activeOpacity={.7} className="px-2 items-center">
                                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg text-center after:border-b border-main-blue">месяц</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="m-2">
                          <View className="flex-row">
                            <View className="bg-[#50cebb] w-5 h-5 rounded-l-full"></View>
                            <View className="bg-[#70d7c7] w-5 h-5"></View>
                            <View className="bg-[#70d7c7] w-5 h-5"></View>
                            <View className="bg-[#50cebb] w-5 h-5 rounded-r-full"></View>
                            <Text style={{fontFamily:'geometria-regular'}} className="text-sm"> - промежуток дней</Text>
                          </View>
                          <View className="flex-row mt-2">
                            <View className="bg-[#50cebb] w-5 h-5 rounded-l-full"></View>
                            <Text style={{fontFamily:'geometria-regular'}} className="text-sm"> - один день</Text>
                          </View>
                        </View>
                    </View>
                    <View className="flex-1">
                      <TouchableOpacity onPress={handlePressButtonSurvey} activeOpacity={.7} className="items-center flex-row justify-center">
                          <View className="w-5 h-5 border border-main-blue p-2 items-center justify-center rounded-full mr-2">
                            {checkBoxAddSurveyInPdf && <View className="bg-main-blue rounded-full w-4 h-4"></View>}
                          </View>
                          <Text style={{fontFamily:'geometria-bold'}} className="text-black text-base text-center leading-[20px]">
                              Пройти и включить PDF опросник удовлетворенности катетеризацией
                          </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={handlePressButtonUserData} activeOpacity={.7} className="items-center justify-center flex-row mt-4">
                          <View className="w-5 h-5 border border-main-blue p-2 items-center justify-center rounded-full mr-2">
                            {userData.name?.length! > 0 && <View className="bg-main-blue rounded-full w-4 h-4"></View>}
                          </View>
                          <Text style={{fontFamily:'geometria-bold'}} className="text-black text-base text-center leading-[20px]">
                             {userData.name?.length ? 'Изменить данные о себе' : 'Заполнить данные о себе'}
                          </Text>
                      </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={.7} onPress={handleButtonSaveOrShare} className="mt-6 rounded-md flex-1">
                  <LinearGradient
                    colors={['#83B759', '#609B25']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0.0553, 0.9925]}
                    className="rounded-md">
                    <Text style={{fontFamily:'geometria-bold'}} className="text-[#fff] px-9 py-4">сформировать и {buttonName === 'download' ? 'скачать файл' : 'поделиться файлом'} PDF</Text>
                  </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </ModalSelect>
  );
};

export default ModalCustomizePdf;