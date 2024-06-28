import { ScrollView, Text, View, RefreshControl, ActivityIndicator, TouchableOpacity, Alert} from "react-native";
import { useCallback, useState, useRef, useEffect } from "react";
import * as Print from 'expo-print';
import { Dropdown } from "react-native-element-dropdown";
import { format } from "date-fns";
import * as Sharing from 'expo-sharing';

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
import { genetatePdfPattern } from "../../utils/PdfPattern/PdfPattern";
import { setFiltredRecordsByDate, setStatisticsPerDay } from "../../store/slices/journalDataSlice";

interface iJournalScreen{
  navigation: StackNavigationRoot
}

const JournalScreen = ({navigation}:iJournalScreen) => { // TODO что бы скачивать файл с помощью expo file sistem мне нужен url с бека, пока что так
  const dispatch = useAppDispatch();
  const journalRecords:iDairyRecord[] = useAppSelector((state) => state.journal.urineDiary); // массив записей из хранилища редакса
  const selectedCalendareDate = useAppSelector(user => user.appStateSlice.calendareDay); // достаем из стора редакса выбранню дату на календаре
  const userData = useAppSelector(user => user.user); // достаем из стора редакса выбранню дату на календаре

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
      dispatch(setFiltredRecordsByDate(filteredRecords));
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

    const setStatistics = {
      cannulation:cannulationStaticPerDay.length,
      leakage:leakageStaticPerDay.length,
      amountOfDrankFluids: amountOfDrankFluidsPerDay!,
      amountOfReleasedUrine: amountOfReleasedUrinePerDay!,
    }

    setStatisticPerDay(setStatistics);
    dispatch(setStatisticsPerDay(setStatistics));
  },[selectedCalendareDate,journalRecords, day]);

  const printToFile = async () => { // genarete Pdf from Html and share it
    const pdf = await genetatePdfPattern({
      filtredRecordByDate: filtredJournalRecords,
      selectedCalendareDate: selectedCalendareDate,
      statisticsPerDay: statisticPerDay,
      userData: userData});
    const { uri } = await Print.printToFileAsync({html:pdf, useMarkupFormatter:true, base64:true, margins: {left:0, bottom:0, right: 0, top: 0}, });

    const isSharingExist = Sharing.isAvailableAsync();
    if(!isSharingExist) {
      Alert.alert('Doesnt work on this device!');
      return;
    }
    await Sharing.shareAsync(uri, {dialogTitle:'Title sex', mimeType:'application/pdf'})
  };

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
        textOfRightButton="Скачать PDF"
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