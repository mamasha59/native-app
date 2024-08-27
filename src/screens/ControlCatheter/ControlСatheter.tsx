import { ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import RestOf from "./RestOf/RestOf";
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import CatheterNotice from "./CatheterNotice/CatheterNotice";
import { useAppSelector } from "../../store/hooks";

const ControlCatheter = () => {
  const {t} = useTranslation();
  const journal = useAppSelector(state => state.journal.urineDiary);
  const selectedCalendareDate = useAppSelector(user => user.appStateSlice.calendareDay); // достаем из стора редакса выбранню дату на календаре

  const filteredRecords = journal.filter(e => e.timeStamp?.slice(0, 10) === selectedCalendareDate); // фильтруем по даты, либо выбранной дате
  
  return (
    <MainLayout title={t("catheterStockScreen.catheter_stock_screen")}>
      <ScrollView className="flex-1 mb-5" showsVerticalScrollIndicator={false}>
        <RestOf/>
        <СatheterСonsumption filteredRecords={filteredRecords.length} selectedCalendareDate={selectedCalendareDate}/>
        <CathetersForRoad filteredRecords={filteredRecords.length}/>
        <CatheterNotice/>
      </ScrollView>
    </MainLayout>
  );
};

export default ControlCatheter;
