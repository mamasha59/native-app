import { View, Text, ScrollView } from "react-native";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import Chart from "./Chart/Chart";
import RestOf from "./RestOf/RestOf";
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import CathetorNotice from "./CathetorNotice/CathetorNotice";
import { useAppSelector } from "../../store/hooks";
import ChartReleasedUrine from "./ChartReleasedUrine/ChartReleasedUrine";

const ControlСatheter = () => {
  const countUrine = useAppSelector((state) => state.user.urineMeasure);
  console.log(countUrine);
  
  return (
    <MainLayout title="График выпитой жидкости">
      <ScrollView className="flex-1 mb-5" showsVerticalScrollIndicator={false}>
        <View className="overflow-hidden flex-1">
          <View className="mb-4">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-grey">График расхода за последние 7 дней</Text>
          </View>
          <Chart/>
        </View>
        {countUrine === 'Да' && 
          <View className="overflow-hidden flex-1">
            <View className="mb-4">
              <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-grey">График выделенной мочи</Text>
            </View>
            <ChartReleasedUrine/>
          </View>
        }
        <RestOf/>
        <СatheterСonsumption/>
        <CathetersForRoad/>
        <CathetorNotice/>
      </ScrollView>
    </MainLayout>
  );
};

export default ControlСatheter;
