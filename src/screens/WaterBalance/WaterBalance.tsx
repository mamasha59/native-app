import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import { useAppSelector } from "../../store/hooks";
import ChartReleasedUrine from "../ControlCatheter/ChartReleasedUrine/ChartReleasedUrine";
import ChartDrankWater from "../ControlCatheter/ChartDrankWater/ChartDrankWater";
import FluidIntakeChart from "./FluidIntakeChart/FluidIntakeChart";
import ToggleIsCountUrine from "../../components/ToggleIsCountUrine/ToggleIsCountUrine";

const WaterBalance = () => {
    const {t} = useTranslation();
    const countUrine = useAppSelector((state) => state.appStateSlice.urineMeasure);

  return (
    <MainLayout>
        <ScrollView className="flex-1 mb-4">
            <FluidIntakeChart/>
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">
                {t("waterBalanceScreen.charts.fluid_intake_chart")}
            </Text>
            <ChartDrankWater/>
            {countUrine && 
            <>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">
                    {t("waterBalanceScreen.charts.urine_output_chart")}
                </Text>
                <ChartReleasedUrine/>
            </>
            }
            <View className="my-2">
                <Text className="text-start" style={{fontFamily:'geometria-regular'}}>
                    {t("waterBalanceScreen.waterBalanceInfo")}
                </Text>
            </View>
            <ToggleIsCountUrine/>
        </ScrollView>
    </MainLayout>
  );
};

export default WaterBalance;
