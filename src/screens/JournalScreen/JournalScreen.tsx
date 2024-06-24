import { ScrollView, Text, View, RefreshControl, ActivityIndicator, TouchableOpacity, Alert, Platform} from "react-native";
import { useCallback, useState, useRef, useEffect } from "react";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Dropdown } from "react-native-element-dropdown";
import { format } from "date-fns";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import { DropDown } from "../../assets/images/icons";

import JournalRecord from "./JournalRecord/JournalRecord";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import JournalCalendar from "./JournalCalendar/JournalCalendar";
import { day, getCurrentMonth, monthsEng } from "../../utils/date";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import { iDairyRecord, iMonth } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetBadges, setCalendareDay } from "../../store/slices/appStateSlicer";
import Statistics from "./Statistics/Statistics";
import FilterList from "./FilterList/FilterList";
import { StackNavigationRoot } from "../../components/RootNavigations/RootNavigations";

interface iJournalScreen{
  navigation: StackNavigationRoot
}

const JournalScreen = ({navigation}:iJournalScreen) => { // TODO что бы скачивать файл с помощью expo file sistem мне нужен url с бека, пока что так
  const dispatch = useAppDispatch();
  const journalRecords:iDairyRecord[] = useAppSelector((state) => state.journal.urineDiary); // массив записей из хранилища редакса
  const selectedCalendareDate = useAppSelector(user => user.appStateSlice.calendareDay); // достаем из стора редакса выбранню дату на календаре

  const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления
  const [filtredJournalRecords, setFiltredJournalRecords] = useState<iDairyRecord[]>([]); // массив отфильтрованных по дате записей
  const [loading, setLoading] = useState<boolean>(true);

  const [filterSetting, setFilterSetting] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const [statisticPerDay, setStatisticPerDay] = useState<{cannulation?:number,leakage?:number,amountOfDrankFluids?:number,amountOfReleasedUrine?:number}>({
    cannulation: 0,
    leakage: 0,
    amountOfDrankFluids:0,
    amountOfReleasedUrine: 0,
  });
  
  const [month, setSelectedMonth] = useState<iMonth>({
    month: monthsEng[getCurrentMonth].value,
    index: getCurrentMonth,
  });

  useEffect(() => { // журнал данные всегда по текущий день
    const today = format(new Date(), 'MM/dd/yyyy HH:mm:ss').slice(0,10);
    if(today !== selectedCalendareDate) {
      dispatch(setCalendareDay(today));
      dispatch(resetBadges());
    }
  },[])

  useEffect(() => {
    const applyFilter = (records: iDairyRecord[], filter: string) => {
      switch (filter) {
        case 'Нелатон':
          return records.filter((e) => e.catheterType === filter);
        case 'amountOfReleasedUrine':
          return records.filter((e) => e.amountOfReleasedUrine && e.amountOfReleasedUrine > 0);
        case 'amountOfDrankFluids':
          return records.filter((e) => e.amountOfDrankFluids && e.amountOfDrankFluids > 0);
        case 'leakageReason':
          return records.filter((e) => e.leakageReason && e.leakageReason?.length > 0);
        case 'timeStamp':
          return records;
        default:
          return records;
      }
    };
    setLoading(true);
    setTimeout(() => { // искуственный лоудер
      const todayJournal = journalRecords.filter((e) => e.timeStamp?.slice(0, 10) === selectedCalendareDate);
        
      const filteredRecords = applyFilter(todayJournal, filterSetting);
      setFiltredJournalRecords(filteredRecords);
      
      setLoading(false); // Скрыть индикатор загрузки
    }, 500);

  }, [filterSetting, selectedCalendareDate, journalRecords, day]);  
  
  useEffect(() => { // добавление данных в блок Статистика за сегодня
    const filteredRecords = journalRecords.filter(e => e.timeStamp?.slice(0, 10) === selectedCalendareDate); // фильтруем по даты, либо выбранной дате
    
    const cannulationStaticPerDay = filteredRecords.filter(e => e.catheterType); // фильтруем по типу катетора, для статистики Катетеризаций:
    const leakageStaticPerDay = filteredRecords.filter(e => e.leakageReason); // фильтруем по причине подтекания, для статистики Подтекание:

    const amountOfDrankFluidsPerDay = filteredRecords
      .map((e) => e.amountOfDrankFluids)
      .reduce((acc,e) => acc! + (e || 0), 0);

    const amountOfReleasedUrinePerDay = filteredRecords
      .map((e) => e.amountOfReleasedUrine)
      .reduce((acc,e) => acc! + (e || 0), 0);

    setStatisticPerDay({
      cannulation:cannulationStaticPerDay.length,
      leakage:leakageStaticPerDay.length,
      amountOfDrankFluids: amountOfDrankFluidsPerDay!,
      amountOfReleasedUrine: amountOfReleasedUrinePerDay!,
    });
  },[selectedCalendareDate,journalRecords, day]);

  const printToFile = async () => { // функция при нажатии на кнопку Отправить что бы сгенерировать pdf файл и отправить его
    const { uri } = await Print.printToFileAsync({ html, width: 2480, base64:true, useMarkupFormatter:true });
    // await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Поделиться документом' });
    const isSharingExist = Sharing.isAvailableAsync();
    if(!isSharingExist) {
      Alert.alert('Doesnt work on this device!');
      return;
    } 
    await Sharing.shareAsync(uri, {dialogTitle:'Title sex', mimeType:'application/pdf'})
  };

  const html = `
  <html lang="rus">
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <meta http-equiv="Content-Disposition" content="attachment; filename="Мое.pdf">
      <title>Дневник мочеиспускания</title>
      </head>
      <body style="padding: 0; margin: 0; font-family: 'geometria-regular';max-width: 2480px; margin: 0 auto 0 auto">
      <div
          style="
          padding: 8.75rem;
          color: white;
          background: linear-gradient(90deg, #4baac5 0.16%, #7076b0 101.13%);
          position: relative;
          "
      >
          <div style="display: flex; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 30px;">
              <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
              Дата:
              <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                  >dг.</b
              >
              </p>
              <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
              Фамилия И.О.:
              <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                  >$d</b
              >
              </p>
              <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
              Дата рождения:
              <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                  >$dг.</b
              >
              </p>
          </div>
          </div>
          <div
          style="
              position: absolute;
              right: 10%;
              top: 10%;
              display: flex;
              align-items: center;
              gap: 60px;
          "
          >
          <img
              src="https://github.com/mamasha59/native-app/assets/68348736/59860e0b-43b8-4d8b-b11e-970d62ec7911"
              style="width: 110px" 
          />
          <h1 style="font-size: 120px; line-height: 144px;">
              Uro <span style="font-style: italic;">Control</span>
          </h1>
          </div>
      </div>
      <div style="color: #101010; padding: 100px;">
          <h2 style="font-size: 80px; line-height: 96px; margin: 0;">
          Дневник мочеиспускания
          </h2>
          <table class="GeneratedTable">
          <thead style="font-size: 20px; line-height: 24px;">
              <tr>
              <th>Дата</th>
              <th>Время</th>
              <th>Тип катетера</th>
              <th>Скорость катетеризации, сек</th>
              <th>Объем выделенной мочи, мл</th>
              <th>Объем выпитой жидкости, мл</th>
              <th>Подтекание мочи (да/нет)</th>
              <th>Активность при подтекании (в покое, кашель, бег и.т.п.)</th>
              </tr>
          </thead>
          <tbody>
          ${journalRecords.map((e, index) => `
              <tr key=${index}>
              <td>${e.timeStamp?.slice(0, 10) || ''}</td>
              <td>${e.whenWasCanulisation || ''}</td>
              <td>${e.catheterType || ''}</td>
              <td>Что это не знаю</td>
              <td>${e.amountOfReleasedUrine || ''}</td>
              <td>${e.amountOfDrankFluids || ''}</td>
              <td>Тоже не знаю</td>
              <td>${e.leakageReason || ''}</td>
              </tr>
              `).join('')
          }
          </tbody>
          </table>
      </div>
      </body>
  </html>
  <style>
      *{
      margin: 0;
      padding: 0;
      }
      body {
      min-height: 100vh;
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;
      line-height: 1.5;
      }
      img {
      max-width: 100%;
      display: block;
      }
      table {
      border-collapse: collapse;
      border-spacing: 0;
      }
      table.GeneratedTable {
      width: 100%;
      margin: 80px 0 120px 0;
      background-color: #ffffff;
      border-width: 2px;
      border-color: #4baac5;
      border-style: solid;
      color: #101010;  
      }
      table.GeneratedTable td,
      table.GeneratedTable th {
      border-width: 2px;
      border-color: #4baac5;
      border-style: solid;
      padding: 3px;
      }
      table.GeneratedTable thead {
      background-color: #ffffff;
      }
  </style>
  </html>
  `;

  const updateRecords = useCallback(() => { // обновление списка, тяним тапом по списку
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(resetBadges());
    }, 2000);
    scrollViewRef.current?.scrollTo({x:0,y:0,animated:true});
  }, []);

  return (
    <MainLayout title="Дневник мочеиспускания">
      {/* Выбор месяца | Отображение нынешнего месяца */}
      <Dropdown
        data={monthsEng}
        style={{width: 100,}}
        fontFamily="geometria-regular"
        labelField="value"
        valueField="value"
        placeholder={month.month}
        containerStyle={{width:210}}
        autoScroll
        activeColor="#4BAAC5"
        mode="modal"
        value={month.month}
        accessibilityLabel={month.month}
        renderRightIcon={() => <DropDown/>}
        onChange={item => {
          setSelectedMonth({month: item.value, index: item.index});
      }}
      />
      <JournalCalendar month={month} setSelectedMonth={setSelectedMonth} />
      <FilterList setFilterSetting={setFilterSetting}/>
      <Statistics selectedCalendareDate={selectedCalendareDate} statisticPerDay={statisticPerDay}/>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateRecords}/>}
        className="flex-1 overflow-hidden"
        showsVerticalScrollIndicator={false}
        snapToStart={true}
        ref={scrollViewRef}
      >
        {/* list */}
        {loading 
          ? <ActivityIndicator size={"large"}/>
          :
          (journalRecords.length === 0 || filtredJournalRecords.length === 0
            ? <View focusable={false}>
                <Text style={{fontFamily:'geometria-regular'}} className="text-lg">There are no entries here yet...</Text>
              </View>
            : filtredJournalRecords.map((e,index) => 
                <JournalRecord
                  timeStamp={e.timeStamp}
                  id={e.id}
                  key={index} 
                  whenWasCanulisation={e.whenWasCanulisation}
                  amountOfDrankFluids={e.amountOfDrankFluids}
                  catheterType={e.catheterType}
                  amountOfReleasedUrine={e.amountOfReleasedUrine}
                  leakageReason={e.leakageReason}
                />)
          )
        }
      </ScrollView>
      <DoubleButton
        showIcon={false}
        textOfLeftButton="Отправить"
        textOfRightButton="Сохранить PDF"
        handlePressLeftButton={printToFile}
        handlePressRightButton={() => navigation.navigate('PdfOnBoarding')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Survey')} activeOpacity={0.6} className="max-h-[40px] p-1 flex-1 min-w-[250px] bg-main-blue rounded-[89px] flex-row items-center justify-center mx-auto mb-2">
        <Text style={{fontFamily:'geometria-bold'}} className="text-[#FFFFFF] text-sm text-center">опросник</Text>
      </TouchableOpacity>

    </MainLayout>
  );
};
export default JournalScreen;