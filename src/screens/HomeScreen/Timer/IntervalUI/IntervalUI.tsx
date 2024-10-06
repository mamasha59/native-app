import { ActivityIndicator, Text, View } from "react-native";

interface iIntervalUI {
    startFromCountdown: boolean;
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

    const {startFromCountdown, timerHours,timerMinutes,timerSeconds,stopwatchHours,stopwatchMinutes,stopwatchSeconds, loader, days} = props;

    const hours = startFromCountdown ? timerHours : stopwatchHours;
    const minutes = startFromCountdown ? timerMinutes : stopwatchMinutes;
    const seconds = startFromCountdown ? timerSeconds : stopwatchSeconds;
    
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
  return (
    <View className="items-center my-1">
      {days > 0 && <Text style={{fontFamily:'geometria-bold'}} className="text-xl leading-5 underline text-error">{days} день</Text>}
      <Text adjustsFontSizeToFit style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px]">
        {loader ? <ActivityIndicator/> : formattedTime}
      </Text>
    </View>
  );
};

export default IntervalUI;
