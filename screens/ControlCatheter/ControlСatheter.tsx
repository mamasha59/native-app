import { View, Text, ScrollView } from "react-native";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import Chart from "./Chart/Chart";
import RestOf from "./RestOf/RestOf";
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import CathetorNotice from "./CathetorNotice/CathetorNotice";

const ControlСatheter = () => {

  return (
    <MainLayout title="Контроль учета катетеров">
      <ScrollView className="flex-1 mb-5">
        <View className="overflow-hidden">
          <View className="mb-8">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-grey">График расхода за последние 7 дней</Text>
          </View>
          {/* график */}
          <Chart/>
        </View>
        <RestOf/>
        <СatheterСonsumption/>
        <CathetersForRoad/>
        <CathetorNotice/>
      </ScrollView>
    </MainLayout>
  );
};

export default ControlСatheter;
