import { ScrollView, Text, View, RefreshControl, ActivityIndicator, TouchableOpacity} from "react-native";
import { useCallback, useState, useRef, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { format } from "date-fns";

import { DropDown } from "../../assets/images/icons";

import JournalRecord from "./JournalRecord/JournalRecord";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import { day, getCurrentMonth, monthsEng } from "../../utils/date";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import { iDairyRecord, iMonth } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetBadges, setCalendareDay } from "../../store/slices/appStateSlicer";
import Statistics from "./Statistics/Statistics";
import { StackNavigationRoot } from "../../components/RootNavigations/RootNavigations";
import { handleModalCustomizePdfDocument } from "../../store/slices/journalDataSlice";
import FilterCategories from "./FilterCategories/FilterCategories";
import ListOfCalendarDays from "./Calendar/ListOfCalendarDays/ListOfCalendarDays";
import ModalCustomizePdf from "./ModalCustomizePdf/ModalCustomizePdf";
import { dateFormat } from "../../utils/const";

interface iJournalScreen{
  navigation: StackNavigationRoot,
}

const JournalScreen = ({navigation}:iJournalScreen) => { // TODO убрать статистику из стора
  const dispatch = useAppDispatch();
  const {urineDiary, modalCustomizePdfDocument} = useAppSelector((state) => state.journal); // массив записей из хранилища редакса
  const {calendareDay} = useAppSelector(user => user.appStateSlice); // достаем из стора редакса выбранню дату на календаре и ответы

  const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления
  const [filtredJournalRecords, setFiltredJournalRecords] = useState<iDairyRecord[]>([]); // массив отфильтрованных по дате записей
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonName, setButtonName] = useState<string>('');

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

  const handleModalState = () => {    
    dispatch(handleModalCustomizePdfDocument(!modalCustomizePdfDocument));
  }

  const handlePressButton = (button:string) => {
    setButtonName(button);
    handleModalState();
  }

  useEffect(() => { // журнал данные всегда по текущий день
    const today = format(new Date(), dateFormat).slice(0,10);
    if(today !== calendareDay) {
      dispatch(setCalendareDay(today));
      dispatch(resetBadges());
    }
  },[])

  useEffect(() => { // filtering by catagories
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
      const todayJournal = urineDiary.filter((e) => e.timeStamp?.slice(0, 10) === calendareDay);
        
      const filteredRecords = applyFilter(todayJournal, filterSetting);
      setFiltredJournalRecords(filteredRecords);
      setLoading(false); // Скрыть индикатор загрузки
    }, 500);

  }, [filterSetting, calendareDay, urineDiary, day]);  
  
  useEffect(() => { // добавление данных в блок Статистика за сегодня
    const filteredRecords = urineDiary.filter(e => e.timeStamp?.slice(0, 10) === calendareDay); // фильтруем по даты, либо выбранной дате
    
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
  },[calendareDay,urineDiary, day]);

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
      <ListOfCalendarDays month={month} setSelectedMonth={setSelectedMonth} />
      <FilterCategories setFilterSetting={setFilterSetting}/>
      <Statistics selectedCalendareDate={calendareDay} statisticPerDay={statisticPerDay}/>
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
          (urineDiary.length === 0 || filtredJournalRecords.length === 0
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
        handlePressLeftButton={() => handlePressButton('share')}
        handlePressRightButton={() => handlePressButton('download')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Survey', {})} activeOpacity={0.6} className="max-h-[40px] p-1 flex-1 min-w-[250px] bg-main-blue rounded-[89px] flex-row items-center justify-center mx-auto mb-2">
        <Text style={{fontFamily:'geometria-bold'}} className="text-[#FFFFFF] text-sm text-center">опросник</Text>
      </TouchableOpacity>
      <ModalCustomizePdf buttonName={buttonName} handleModalState={handleModalState} key={'modalcustomizepdfjournalscreen'}/>
    </MainLayout>
  );
};
export default JournalScreen;