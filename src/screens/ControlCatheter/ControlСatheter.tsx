import { ScrollView } from "react-native";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import RestOf from "./RestOf/RestOf";
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import CathetorNotice from "./CathetorNotice/CathetorNotice";

const ControlСatheter = () => {
  
  return (
    <MainLayout title="Контроль катетора">
      <ScrollView className="flex-1 mb-5" showsVerticalScrollIndicator={false}>
        <RestOf/>
        <СatheterСonsumption/>
        <CathetersForRoad/>
        <CathetorNotice/>
      </ScrollView>
    </MainLayout>
  );
};

export default ControlСatheter;
