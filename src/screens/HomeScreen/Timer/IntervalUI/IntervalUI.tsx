import { ActivityIndicator, Text, View } from "react-native";

interface iIntervalUI {
    startFromСountdown: boolean;
    timerHours: number;
    timerMinutes: number;
    timerSeconds: number; 
    stopwatchHours: number;
    stopwatchMinutes: number;
    stopwatchSeconds: number;
    loader?: boolean,
    days: number,
}

const IntervalUI = (props:iIntervalUI) => {

    const {startFromСountdown,timerHours,timerMinutes,timerSeconds,stopwatchHours,stopwatchMinutes,stopwatchSeconds, loader, days} = props;

    const hours = startFromСountdown ? timerHours : stopwatchHours;
    const minutes = startFromСountdown ? timerMinutes : stopwatchMinutes;
    const seconds = startFromСountdown ? timerSeconds : stopwatchSeconds;
    
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
  return (
    <View className="items-center my-[15px]">
      {days > 0 && <Text style={{fontFamily:'geometria-bold'}} className="text-3xl">{days} день</Text>}
      <Text style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px]">
        {loader ? <ActivityIndicator/> : formattedTime}
      </Text>
    </View>
  );
};

export default IntervalUI;
