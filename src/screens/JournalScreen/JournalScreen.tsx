import { ScrollView, Text, View, RefreshControl} from "react-native";
import { useCallback, useState, useRef, useEffect } from "react";
import * as Print from 'expo-print';
// import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
import { Dropdown } from "react-native-element-dropdown";
// import { Asset } from 'expo-asset';
// import { manipulateAsync } from 'expo-image-manipulator';

import { DropDown } from "../../assets/images/icons";

import JournalRecord from "./JournalRecord/JournalRecord";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import JournalCalendar from "./JournalCalendar/JournalCalendar";
import { getCurrentMonth, months } from "../../utils/date";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import { iDairyRecord, iMonth } from "../../types";
import { useAppSelector } from "../../store/hooks";

const JournalScreen = () => { // TODO что бы скачивать файл с помощью expo file sistem мне нужен url с бека, пока что так
  const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления
  const [filtredJournalRecords, setFiltredJournalRecords] = useState<iDairyRecord[]>([]); // массив отфильтрованных по дате записей

  const scrollViewRef = useRef<ScrollView>(null);

  const [month, setSelectedMonth] = useState<iMonth>({
    month: months[getCurrentMonth].value,
    index: getCurrentMonth,
  });
  
  const journalRecords:iDairyRecord[] = useAppSelector((state) => state.journal.urineDiary); // массив записей из сторе редакса
  const userData = useAppSelector(user => user.user);
  const selectedCalendareDate = useAppSelector(user => user.appStateSlice.calendareDay); // достаем из стора редакса выбранню дату на календаре
  const today = new Date().toISOString().slice(0,10);

  useEffect(() => {
    if (selectedCalendareDate){
      setFiltredJournalRecords(journalRecords.filter((e) => e.timeStamp === selectedCalendareDate));
    } else {
      setFiltredJournalRecords(journalRecords.filter((e) => e.timeStamp === today));
    }
  },[selectedCalendareDate, journalRecords]);

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
                >${userData.birthday}г.</b
              >
            </p>
            <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
              Фамилия И.О.:
              <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                >${userData.nameSurname}</b
              >
            </p>
            <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
              Дата рождения:
              <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                >${userData.birthday}г.</b
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
              <td>${e.timeStamp || ''}</td>
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
  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html, width: 2480 });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle:'Поделиться документом' });
  };

  const updateRecords = useCallback(() => { // обновление списка, тяним тапом по списку
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    scrollViewRef.current?.scrollTo({x:0,y:0,animated:true});
  }, []);

  return (
    <MainLayout title="Дневник мочеиспускания">
      {/* Выбор месяца | Отображение нынешнего месяца */}
      <Dropdown
        data={months}
        style={{width:100, marginBottom:4}}
        fontFamily="geometria-regular"
        maxHeight={300}
        labelField="value"
        valueField="value"
        placeholder={month.month}
        searchPlaceholder="Поиск месяца"
        containerStyle={{width:210}}
        autoScroll
        search
        value={month.month}
        accessibilityLabel={month.month}
        renderRightIcon={() => <DropDown/>}
        onChange={item => {
          setSelectedMonth({month: item.value, index: item.index});
      }}
      />
      <JournalCalendar month={month} setSelectedMonth={setSelectedMonth} />
      {/* list */}
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateRecords}/>}
        className="flex-1 overflow-hidden"
        showsVerticalScrollIndicator={false}
        snapToStart={true}
        ref={scrollViewRef}
        >
        {journalRecords.length === 0 || filtredJournalRecords.length === 0
          ? <View focusable={false}><Text style={{fontFamily:'geometria-regular'}} className="text-lg">Здесь пока нет записей...</Text></View>
          : filtredJournalRecords.map((e,index) => 
              <JournalRecord
                id={e.id}
                key={index} 
                whenWasCanulisation={e.whenWasCanulisation}
                amountOfDrankFluids={e.amountOfDrankFluids}
                catheterType={e.catheterType}
                amountOfReleasedUrine={e.amountOfReleasedUrine}
                leakageReason={e.leakageReason}
              />)
        }
      </ScrollView>
      <DoubleButton
        showIcon={false}
        textOfLeftButton="Отправить"
        textOfRightButton="Сохранить PDF"
        handlePressLeftButton={printToFile}
      />
    </MainLayout>
  );
};

export default JournalScreen;
