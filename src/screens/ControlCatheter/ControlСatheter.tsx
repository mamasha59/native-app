import { BackHandler, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import RestOf from "./RestOf/RestOf";
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import { useAppSelector } from "../../store/hooks";
import NoticeOfRemainCatheters from "../UserData/FifthDataScreen/NoticeOfRemainCatheters/NoticeOfRemainCatheters";
import Consumables from "./Consumables/Consumables";
import { useEffect } from "react";
import { NavigationPropsRoot } from "../../components/RootNavigations/RootNavigations";

const ControlCatheter = ({navigation}:NavigationPropsRoot<'ControlCatheter'>) => {
  const {t} = useTranslation();
  const journal = useAppSelector(state => state.journal.urineDiary);
  const selectedCalendareDate = useAppSelector(user => user.appStateSlice.calendareDay); // достаем из стора редакса выбранню дату на календаре

  useEffect(() => {
    const navigateBack = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', navigateBack );

    return () => backHandler.remove();
  }, []);

  const filteredRecords = journal.filter(e => e.timeStamp?.slice(0, 10) === selectedCalendareDate); // фильтруем по даты, либо выбранной дате
  
  return (
    <MainLayout title='Контроль расходников:'>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <RestOf/>
        <СatheterСonsumption filteredRecords={filteredRecords.length} selectedCalendareDate={selectedCalendareDate}/>
        <CathetersForRoad filteredRecords={filteredRecords.length}/>
        <NoticeOfRemainCatheters/>
        <Consumables/>
      </ScrollView>
    </MainLayout>
  );
};

export default ControlCatheter;
