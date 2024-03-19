import { View, Text, ScrollView } from "react-native";

import MainLayout from '../../Layouts/MainLayout/MainLayout';
import ChartDrankWater from "./ChartDrankWater/ChartDrankWater";
import RestOf from "./RestOf/RestOf";
import СatheterСonsumption from './СatheterСonsumption/СatheterСonsumption';
import CathetersForRoad from "./CathetersForRoad/CathetersForRoad";
import CathetorNotice from "./CathetorNotice/CathetorNotice";
import { useAppSelector } from "../../store/hooks";
import ChartReleasedUrine from "./ChartReleasedUrine/ChartReleasedUrine";

const ControlСatheter = () => {
  const countUrine = useAppSelector((state) => state.user.urineMeasure);
  return (
    <MainLayout title="График выпитой жидкости">
      <ScrollView className="flex-1 mb-5" showsVerticalScrollIndicator={false}>
        <ChartDrankWater/>
        {countUrine === 'Да' && 
          <>
            <View className="mb-4">
              <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">График выделенной мочи</Text>
            </View>
            <ChartReleasedUrine/>
          </>
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
