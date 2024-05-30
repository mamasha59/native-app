import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { day } from "../../../utils/date";
import { useAppSelector } from "../../../store/hooks";
import { useSevenPreviousDays } from "../../../hooks/useSevenPreviousDays";
import { addChartValueToCurrentDay } from "../../../store/slices/journalDataSlice";
import { useUpdateChart } from "../../../hooks/useCalculateAmount";

const {width} = Dimensions.get("window");

const ChartReleasedUrine = () => {
    const dataUrine = useAppSelector((state) => state.journal);
    const weekDays = useSevenPreviousDays(day); // хук создание массива предыдущих дней недели
    useUpdateChart({category:'amountOfReleasedUrine', dispatchAction: addChartValueToCurrentDay}); // кастомный хук для подсчета выпитой ждикости за день и отображение на графике

    const valueArray = dataUrine.urineChart.map(item => typeof item === 'object' ? item.value : item); // делаем масив из чисел

  return (
    <LineChart
        withOuterLines={true}
        data={{
            labels: weekDays,
            datasets: [
                {
                    data: valueArray,
                    withScrollableDot: false
                }
            ]
        }}
        width={width / 1.060}
        height={138}
        withDots={false}
        segments={0}
        transparent={true}
        yAxisInterval={1} // optional, defaults to 1
        yAxisSuffix=" мл"
        onDataPointClick={(value) => console.log(value.value)}
        withVerticalLines={false}
        chartConfig={
        {
            backgroundGradientFrom: "#ffffff",
            backgroundGradientFromOpacity: 0.4,
            backgroundGradientTo: "#7076B0",
            backgroundGradientToOpacity: 0.5,
            propsForBackgroundLines: {
              strokeDasharray: "",
              stroke:'#DADADA',
              strokeWidth:"1",
            },
            color: () => `#4BAAC5`,
            labelColor: () => `#ff5500`,
            strokeWidth: 1,
            barPercentage: 1,
            useShadowColorFromDataset: false, // optional
            decimalPlaces: 0,
        }}
        bezier
        style={{
          paddingRight:60,
          paddingBottom:20,
          flex:1
        }}
    />
  );
};

export default ChartReleasedUrine;
