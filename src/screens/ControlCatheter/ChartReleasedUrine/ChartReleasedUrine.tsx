import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {useEffect, useState} from 'react';

import { day } from "../../../utils/date";

const {width} = Dimensions.get("window");

const ChartReleasedUrine = () => {

  const [urineMl, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    const sevenDays = () => {
      const days = [];
      for (let index = 0; index <= 6; index++) {
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + index);

        const dayOfWeek = nextDay.toLocaleDateString('ru-RU', { month:'short', day:'numeric' });
        days.push(dayOfWeek);
      }
      return days;
    }
    const calculatedWeekDays = sevenDays();
    setWeekDays(calculatedWeekDays);
  },[])

  return (
    <LineChart
        fromNumber={0}
        withOuterLines={false}
        data={{
        labels: urineMl,
        datasets: [{data: [100,160,160,160,170,180,180,180,180]}]
        }}
        width={width / 1.1}
        height={90}
        withDots={true}
        segments={3}
        transparent={true}
        yAxisInterval={3} // optional, defaults to 1
        withVerticalLines={false}
        chartConfig={
        {
            backgroundGradientFrom: "#ffffff",
            backgroundGradientFromOpacity: 0.4,
            backgroundGradientTo: "#7076B0",
            backgroundGradientToOpacity: 0.5,
            color: () => `#4BAAC5`,
            strokeWidth: 1, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false, // optional
            decimalPlaces: 0,
        }}
        bezier
        style={{
          paddingRight:32,
          paddingBottom:20,
        }}
    />
  );
};

export default ChartReleasedUrine;
