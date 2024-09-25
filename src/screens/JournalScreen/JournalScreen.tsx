import { Text, View, ActivityIndicator, TouchableOpacity, Modal, Dimensions, FlatList, Pressable} from "react-native";
import { useCallback, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { DropDown } from "../../assets/images/icons";

import JournalRecord from "./JournalRecord/JournalRecord";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import { day, getCurrentMonth } from "../../utils/date";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import { iDairyRecord, iMonth } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetBadges } from "../../store/slices/appStateSlicer";
import Statistics from "./Statistics/Statistics";
import { handleModalCustomizePdfDocument } from "../../store/slices/journalDataSlice";
import FilterCategories from "./FilterCategories/FilterCategories";
import ListOfCalendarDays from "./Calendar/ListOfCalendarDays/ListOfCalendarDays";
import ModalCustomizePdf from "./ModalCustomizePdf/ModalCustomizePdf";

const {height,width} = Dimensions.get('window');

interface iStatistic {
  cannulation?:number,
  leakage?:number,
  amountOfDrankFluids?:number,
  amountOfReleasedUrine?:number
}

const JournalScreen = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();

  const {urineDiary, modalCustomizePdfDocument} = useAppSelector((state) => state.journal); // массив записей из хранилища редакса
  const {calendarDay} = useAppSelector(user => user.appStateSlice); // достаем из стора редакса выбранню дату на календаре и ответы

  const [refreshing, setRefreshing] = useState<boolean>(false); // состояние обновления
  const [filteredJournalRecords, setFilteredJournalRecords] = useState<iDairyRecord[]>([]); // массив отфильтрованных по дате записей
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonName, setButtonName] = useState<string>('');

  const [filterSetting, setFilterSetting] = useState<string>('');
  const [openSelectMonth, setOpenSelectMonth] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const nelaton = t("nelaton");
  const months = [
    { value: t("months.january"), index: 0},
    { value: t("months.february"), index: 1},
    { value: t("months.march"), index: 2},
    { value: t("months.april"), index: 3},
    { value: t("months.may"), index: 4},
    { value: t("months.june"), index: 5},
    { value: t("months.july"), index: 6},
    { value: t("months.august"), index: 7},
    { value: t("months.september"), index: 8},
    { value: t("months.october"), index: 9},
    { value: t("months.november"), index: 10},
    { value: t("months.december"), index: 11},
];

  const [statisticPerDay, setStatisticPerDay] = useState<iStatistic>({
    cannulation: 0,
    leakage: 0,
    amountOfDrankFluids:0,
    amountOfReleasedUrine: 0,
  });
   
  const [month, setSelectedMonth] = useState<iMonth>({
    month: months[getCurrentMonth].value,
    index: getCurrentMonth,
  });

  const handleModalState = () => dispatch(handleModalCustomizePdfDocument(!modalCustomizePdfDocument));

  const handlePressButton = (button:string) => {
    setButtonName(button);
    handleModalState();
  }

  // useEffect(() => { // журнал данные всегда по текущий день
  //   const today = format(new Date(), dateFormat).slice(0,10);
        
  //   if(today !== calendarDay) {
  //     dispatch(setCalendareDay(today));
  //     dispatch(resetBadges());
  //   }
  // },[])

  useEffect(() => { // filtering by catagories
    const applyFilter = (records: iDairyRecord[], filter: string) => {
      switch (filter) {
        case nelaton:
          return records.filter((e) => e.catheterType?.length! > 0);
        case 'amountOfReleasedUrine':
          return records.filter((e) => e.amountOfReleasedUrine && +e.amountOfReleasedUrine.split(' ')[0] > 0);
        case 'amountOfDrankFluids':
          return records.filter((e) => e.amountOfDrankFluids && +e.amountOfDrankFluids.split(' ')[0] > 0);
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
      const todayJournal = urineDiary.filter((e) => e.timeStamp?.slice(0, 10) === calendarDay);
        
      const filteredRecords = applyFilter(todayJournal, filterSetting);
        setFilteredJournalRecords(filteredRecords);
        setLoading(false); // Скрыть индикатор загрузки
    }, 500);

  }, [filterSetting, calendarDay, urineDiary, day]);  
  
  useEffect(() => { // добавление данных в блок Статистика за сегодня
    const filteredRecords:iDairyRecord[] = urineDiary.filter(e => e.timeStamp?.slice(0, 10) === calendarDay); // фильтруем по даты, либо выбранной дате
    
    const cannulationStaticPerDay = filteredRecords.filter(e => e.catheterType); // фильтруем по типу катетора, для статистики Катетеризаций:
    const leakageStaticPerDay = filteredRecords.filter(e => e.leakageReason); // фильтруем по причине подтекания, для статистики Подтекание:

    const amountOfDrankFluidsPerDay = filteredRecords
      .filter(e => e && e.amountOfDrankFluids)
      .map((e) => e.amountOfDrankFluids)
      .reduce((acc,e) => acc + (+e.split(' ')[0] || 0), 0);

    const amountOfReleasedUrinePerDay = filteredRecords
      .filter(e => e && e.amountOfReleasedUrine)
      .map((e) => e.amountOfReleasedUrine)
      .reduce((acc,e) => acc + (+e.split(' ')[0] || 0), 0);


    const setStatistics = {
      cannulation:cannulationStaticPerDay.length,
      leakage:leakageStaticPerDay.length,
      amountOfDrankFluids: amountOfDrankFluidsPerDay!,
      amountOfReleasedUrine: amountOfReleasedUrinePerDay!,
    }
    setStatisticPerDay(setStatistics);
  },[calendarDay,urineDiary,day]);

  useEffect(() => { // set correct name of month if language if changed
    setSelectedMonth({month: months[month.index].value, index: month.index});
  },[i18n.language])

  const updateRecords = useCallback(() => { // обновление списка, тяним тапом по списку
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      dispatch(resetBadges());
    }, 1000);
  }, [i18n.language]);

  const handleModalSelectMonth = () => setOpenSelectMonth(!openSelectMonth);

  const onMonthClick = (month: { value: string; index: number;}) => {
    setSelectedMonth({month: month.value, index: month.index});
    handleModalSelectMonth();
  }

  return (
    <MainLayout title={t("journalScreen.title")}>
      <TouchableOpacity className="flex-row items-center mb-2" onPress={handleModalSelectMonth}>
        <Text style={{fontFamily:'geometria-regular'}} className="text-xl text-start mr-2">{month.month}</Text>
        <DropDown/>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={handleModalSelectMonth}
        visible={openSelectMonth}>
        <Pressable
          onPress={(event) => event.target === event.currentTarget && handleModalSelectMonth()}
          className="flex-1 justify-center items-center mx-auto bg-[#00000037] w-full h-full">
          <View
            style={{width: width / 2, height: height / 1.5}}
            className="bg-[#fff] items-center justify-center py-2">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={months}
              renderItem={({item}) =>
                <TouchableOpacity className={`py-3 border-b w-full ${getCurrentMonth === item.index && 'bg-[#00000037]'}`} onPress={() => onMonthClick(item)}>
                  <Text style={{fontFamily:'geometria-regular'}} className="text-xl text-center">{item.value}</Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.value}
            />
          </View>
        </Pressable>
      </Modal>

      <ListOfCalendarDays month={month} months={months} setSelectedMonth={setSelectedMonth} />
      <FilterCategories setFilterSetting={setFilterSetting}/>
      <Statistics selectedCalendarDate={calendarDay} statisticPerDay={statisticPerDay}/>

      <FlatList
        data={loading || urineDiary.length === 0 || filteredJournalRecords.length === 0 ? [] : filteredJournalRecords}
        renderItem={({ item }) => (
          <JournalRecord
            timeStamp={item.timeStamp}
            id={item.id}
            whenWasCanulisation={item.whenWasCanulisation}
            amountOfDrankFluids={item.amountOfDrankFluids}
            catheterType={item.catheterType}
            amountOfReleasedUrine={item.amountOfReleasedUrine}
            leakageReason={item.leakageReason}
          />
          )
        }
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        ListEmptyComponent={loading 
          ? <ActivityIndicator size="large" /> 
          : <View focusable={false}>
              <Text style={{ fontFamily: 'geometria-regular' }} className="text-lg">
                {t("journalScreen.no_records_for_the_selected_day")}...
              </Text>
            </View>
        }
        showsVerticalScrollIndicator={false}
        snapToStart={true}
        snapToInterval={70}
        decelerationRate={'fast'}
        refreshing={refreshing}
        ref={flatListRef}
        onRefresh={updateRecords}
        className="flex-1 overflow-hidden"
        ListFooterComponent={<View className="h-14"/>}
      />

      <DoubleButton
        blurView
        showIcon={false}
        textOfLeftButton={t("journalScreen.send")}
        textOfRightButton={t("journalScreen.download_PDF")}
        handlePressLeftButton={() => handlePressButton('share')}
        handlePressRightButton={() => handlePressButton('download')}
      />
      <ModalCustomizePdf buttonName={buttonName} handleModalState={handleModalState} key={'modalcustomizepdfjournalscreen'}/>
    </MainLayout>
  );
};
export default JournalScreen;