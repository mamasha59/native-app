import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { day } from "../../../utils/date";
import { useSevenPreviousDays } from "../../../hooks/useSevenPreviousDays";
import { useAppSelector } from "../../../store/hooks";
import { addChartValueDrankWaterToCurrentDay } from "../../../store/slices/journalDataSlice";
import { useUpdateChart } from "../../../hooks/useCalculateAmount";

const {width} = Dimensions.get("window");

const ChartDrankWater = () => {
  const drankWater = useAppSelector((state) => state.journal.drankWaterChart); // массив всех записей где указанно Выпитая вода
  const units = useAppSelector((state) => state.appStateSlice.units); // массив всех записей где указанно Выпитая вода
  const weekDays = useSevenPreviousDays(day); // хук создание массива предыдущих дней недели
  useUpdateChart({category:'amountOfDrankFluids', dispatchAction: addChartValueDrankWaterToCurrentDay}); // кастомный хук для подсчета выпитой ждикости за день и отображение на графике

  const valueArray = drankWater.map(item => typeof item === 'object' ? item.value : item); // делаем масив из чисел
  
  return (
    <LineChart
        withOuterLines={false}
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
        yAxisSuffix={units.title}
        withVerticalLines={false}
        
        chartConfig={
        {
          fillShadowGradient:'#4BAAC5',
          fillShadowGradientFromOpacity:0.6,
          fillShadowGradientTo:'#7076B0',
          propsForBackgroundLines: {
            strokeDasharray: "",
            stroke:'#DADADA',
            strokeWidth:"1",
          },
          color: () => `#0059ffa8`,
          labelColor: () => '#4babc596',
          strokeWidth: 2,
          decimalPlaces: 0,
          linejoinType:'bevel'
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

export default ChartDrankWater;
