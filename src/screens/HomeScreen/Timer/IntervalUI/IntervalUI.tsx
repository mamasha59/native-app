import { ActivityIndicator, Text } from "react-native";

interface iIntervalUI {
    startFromСountdown: boolean;
    timerHours: number;
    timerMinutes: number;
    timerSeconds: number; 
    stopwatchHours: number;
    stopwatchMinutes: number;
    stopwatchSeconds: number;
    loader?: boolean,
}

const IntervalUI = (props:iIntervalUI) => {

    const {startFromСountdown,timerHours,timerMinutes,timerSeconds,stopwatchHours,stopwatchMinutes,stopwatchSeconds, loader} = props;

    const hours = startFromСountdown ? timerHours : stopwatchHours;
    const minutes = startFromСountdown ? timerMinutes : stopwatchMinutes;
    const seconds = startFromСountdown ? timerSeconds : stopwatchSeconds;
    
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
  return (
    <Text style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px] my-[15px]">
        {loader ? <ActivityIndicator/> : formattedTime}
    </Text> 
  );
};

export default IntervalUI;
