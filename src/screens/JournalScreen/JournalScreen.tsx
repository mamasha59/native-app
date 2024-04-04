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
import { day, getCurrentMonth, months } from "../../utils/date";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import { iDairyRecord, iMonth } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetBadges } from "../../store/slices/appStateSlicer";
import { useCreatePdf } from "../../hooks/useCreatePdf";

const JournalScreen = () => { // TODO что бы скачивать файл с помощью expo file sistem мне нужен url с бека, пока что так
  const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления
  const [filtredJournalRecords, setFiltredJournalRecords] = useState<iDairyRecord[]>([]); // массив отфильтрованных по дате записей
  const scrollViewRef = useRef<ScrollView>(null);

  const [statisticPerDay, setStatisticPerDay] = useState<{cannulation?:number,leakage?:number,amountOfDrankFluids?:number,amountOfReleasedUrine?:number}>({
    cannulation: 0,
    leakage: 0,
    amountOfDrankFluids:0,
    amountOfReleasedUrine: 0,
  });
  const [html] = useCreatePdf();
  
  const [month, setSelectedMonth] = useState<iMonth>({
    month: months[getCurrentMonth].value,
    index: getCurrentMonth,
  });
  
  const journalRecords:iDairyRecord[] = useAppSelector((state) => state.journal.urineDiary); // массив записей из хранилища редакса
  const selectedCalendareDate = useAppSelector(user => user.appStateSlice.calendareDay); // достаем из стора редакса выбранню дату на календаре
    
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedCalendareDate){ // если выбрали дату на календаре фильтруем записи по выбранной дате
      setFiltredJournalRecords(journalRecords.filter((e) => e.timeStamp === selectedCalendareDate));
    } else {                    // фильтруем записи по сегоднешнему дню
      setFiltredJournalRecords(journalRecords.filter((e) => e.timeStamp === day.toISOString().slice(0,10)));
    }   
  },[selectedCalendareDate, journalRecords, refreshing]);

  useEffect(() => { // добавление данных в блок Статистика за сегодня
    const cannulationStaticPerDay = journalRecords.filter(e => e.catheterType && e.timeStamp === selectedCalendareDate);
    const leakageStaticPerDay = journalRecords.filter(e => e.leakageReason && e.timeStamp === selectedCalendareDate);
    const amountOfDrankFluidsPerDay = journalRecords
      .filter(e => e.timeStamp === selectedCalendareDate)
      .map((e) => e.amountOfDrankFluids)
      .filter(e => e !== undefined)
      .reduce((acc,e) => acc! + e!, 0);
    const amountOfReleasedUrinePerDay =journalRecords
      .filter(e => e.timeStamp === selectedCalendareDate)
      .map((e) => e.amountOfReleasedUrine)
      .filter(e => e !== undefined)
      .reduce((acc,e) => acc! + e!, 0);
    
    setStatisticPerDay({
      cannulation:cannulationStaticPerDay.length,
      leakage:leakageStaticPerDay.length,
      amountOfDrankFluids: amountOfDrankFluidsPerDay!,
      amountOfReleasedUrine: amountOfReleasedUrinePerDay!,
    });
  },[selectedCalendareDate,journalRecords])

  const printToFile = async () => { // функция при нажатии на кнопку Отправить что бы сгенерировать pdf файл и отправить его
    const { uri } = await Print.printToFileAsync({ html, width: 2480 });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle:'Поделиться документом' });
  };

  const updateRecords = useCallback(() => { // обновление списка, тяним тапом по списку
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    dispatch(resetBadges());
    scrollViewRef.current?.scrollTo({x:0,y:0,animated:true});
  }, []);

  return (
    <MainLayout title="Дневник мочеиспускания">
      {/* Выбор месяца | Отображение нынешнего месяца */}
      <Dropdown
        data={months}
        style={{width:100}}
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
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={updateRecords}/>}
        className="flex-1 overflow-hidden"
        showsVerticalScrollIndicator={false}
        snapToStart={true}
        ref={scrollViewRef}
        >
      <View className="items-start mb-1">
        <Text style={{fontFamily:'geometria-bold'}}>
          Статистика за {selectedCalendareDate === new Date().toISOString().slice(0,10) ? 'сегодня' : selectedCalendareDate}:
        </Text>
      </View>
      <View className="flex-0 mb-1">
          <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Катетеризаций:
            <Text className="text-purple-button"> {statisticPerDay.cannulation}</Text>
          </Text>
          <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Подтекание:
            <Text className="text-purple-button"> {statisticPerDay.leakage}</Text>
          </Text>
          <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Выпито жидкости:
            <Text className="text-purple-button"> {statisticPerDay.amountOfDrankFluids} мл.</Text>
          </Text>
          <Text style={{fontFamily:'geometria-regular'}} className="mr-2">Выделенно жидкости:
            <Text className="text-purple-button"> {statisticPerDay.amountOfReleasedUrine} мл.</Text>
          </Text>
      </View>
      {/* list */}
      {journalRecords.length === 0 || filtredJournalRecords.length === 0
        ? <View focusable={false}>
            <Text style={{fontFamily:'geometria-regular'}} className="text-lg">Здесь пока нет записей...</Text>
          </View>
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