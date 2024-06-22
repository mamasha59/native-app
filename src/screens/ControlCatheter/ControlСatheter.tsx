import { ScrollView } from "react-native";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import RestOf from "./RestOf/RestOf";
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import CathetorNotice from "./CathetorNotice/CathetorNotice";
import { useAppSelector } from "../../store/hooks";

const ControlСatheter = () => {

  const journal = useAppSelector(state => state.journal.urineDiary);
  const selectedCalendareDate = useAppSelector(user => user.appStateSlice.calendareDay); // достаем из стора редакса выбранню дату на календаре

  const filteredRecords = journal.filter(e => e.timeStamp?.slice(0, 10) === selectedCalendareDate); // фильтруем по даты, либо выбранной дате
  
  return (
    <MainLayout title="Контроль катетора">
      <ScrollView className="flex-1 mb-5" showsVerticalScrollIndicator={false}>
        <RestOf/>
        <СatheterСonsumption filteredRecords={filteredRecords.length} selectedCalendareDate={selectedCalendareDate}/>
        <CathetersForRoad filteredRecords={filteredRecords.length}/>
        <CathetorNotice/>
      </ScrollView>
    </MainLayout>
  );
};

export default ControlСatheter;
