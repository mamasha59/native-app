import { Text } from "react-native";

interface iIntervalUI {
    startFromСountdown: boolean;
    timerHours: number;
    timerMinutes: number;
    timerSeconds: number; 
    stopwatchHours: number;
    stopwatchMinutes: number;
    stopwatchSeconds: number;
}

const IntervalUI = (props:iIntervalUI) => {

    const {startFromСountdown,timerHours,timerMinutes,timerSeconds,stopwatchHours,stopwatchMinutes,stopwatchSeconds} = props;

    const hours = startFromСountdown ? timerHours : stopwatchHours;
    const minutes = startFromСountdown ? timerMinutes : stopwatchMinutes;
    const seconds = startFromСountdown ? timerSeconds : stopwatchSeconds;
    
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
  return (
    <Text style={{fontFamily:'geometria-bold'}} className="text-[40px] leading-[48px] my-[15px]">
        {formattedTime}
    </Text> 
  );
};

export default IntervalUI;
