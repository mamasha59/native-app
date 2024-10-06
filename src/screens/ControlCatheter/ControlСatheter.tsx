import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import { useAppSelector } from "../../store/hooks";
import NoticeOfRemainCatheters from "../UserData/FifthDataScreen/NoticeOfRemainCatheters/NoticeOfRemainCatheters";
import Consumables from "./Consumables/Consumables";
import useBackHandler from "../../hooks/useBackHandler";
import ManageConsumableItems from "./ManageConsumableItems/ManageConsumableItems";
import SwitchWidgetConsumableItems from "../ProfileStack/SwitchWidgetConsumableItems/SwitchWidgetConsumableItems";

const ControlCatheter = () => {
  const {t} = useTranslation();
  const journal = useAppSelector(state => state.journal.urineDiary);
  const selectedCalendarDate = useAppSelector(user => user.appStateSlice.calendarDay); // достаем из стора редакса выбранню дату на календаре

  useBackHandler();

  const filteredRecords = journal.filter(e => e.timeStamp?.slice(0, 10) === selectedCalendarDate); // фильтруем по даты, либо выбранной дате
  
  return (
    <MainLayout title={t("catheterStockScreen.title")}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ManageConsumableItems/>
        <SwitchWidgetConsumableItems/>
        <СatheterСonsumption filteredRecords={filteredRecords.length} selectedCalendareDate={selectedCalendarDate}/>
        <CathetersForRoad filteredRecords={filteredRecords.length}/>
        <NoticeOfRemainCatheters/>
        <Consumables/>
      </ScrollView>
    </MainLayout>
  );
};

export default ControlCatheter;
