import { View, Text, ScrollView } from "react-native";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import { useAppSelector } from "../../store/hooks";
import ChartReleasedUrine from "../ControlCatheter/ChartReleasedUrine/ChartReleasedUrine";
import ChartDrankWater from "../ControlCatheter/ChartDrankWater/ChartDrankWater";
import FluidIntakeChart from "./FluidIntakeChart/FluidIntakeChart";
import ToggleIsCountUrine from "../../components/ToggleIsCountUrine/ToggleIsCountUrine";

const WaterBalance = () => {
    const countUrine = useAppSelector((state) => state.appStateSlice.urineMeasure);

  return (
    <MainLayout>
        <ScrollView className="flex-1 mb-4">
            <FluidIntakeChart/>
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">График выпитой жидкости</Text>
            <ChartDrankWater/>
            {countUrine && 
            <>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">График выделенной мочи</Text>
                <ChartReleasedUrine/>
            </>
            }
            <View className="my-2">
                <Text className="text-start" style={{fontFamily:'geometria-regular'}}>
                    Водный баланс — это соотношение между количеством жидкости,
                    поступающей в организм, и количеством жидкости, выводимой из него за
                    определённый период времени. Измерение потребляемой жидкости и
                    выделенной мочи поможет вам поддерживать оптимальный уровень воды в
                    организме.
                </Text>
            </View>
            <ToggleIsCountUrine/>
        </ScrollView>
    </MainLayout>
  );
};

export default WaterBalance;
