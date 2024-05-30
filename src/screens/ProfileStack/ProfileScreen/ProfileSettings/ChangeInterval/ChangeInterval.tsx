import { View, Text, TouchableOpacity } from "react-native";

import { useAppSelector } from "../../../../../store/hooks";
import { useFormatInterval } from "../../../../../hooks/useFormatInterval";

interface iChangeInterval {
  handleChangeOptimalInterval: () => void,
}

const ChangeInterval = ({handleChangeOptimalInterval}:iChangeInterval) => {
  const newInterval = useAppSelector((state) => state.timerStates.interval);
  const newIntervalText = useFormatInterval({intervalInSeconds: newInterval});

  return (
    <>
    <View className="mb-2">
      <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-start">Изменить интервал</Text>
    </View>
    
    <View className="flex-row mb-5 items-center">
      <View className="bg-[#048eff] rounded-2xl min-w-[185px] items-center flex-1 justify-center mr-[10px]">
        <Text style={{fontFamily:'geometria-regular'}} className="py-2 text-[#fff] w-full text-lg text-center">Оптимальный</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleChangeOptimalInterval()}
        activeOpacity={.6}
        className="border border-main-blue rounded-2xl min-w-[150px] max-h-11 h-full flex-1 justify-center items-center">
          <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{newIntervalText}</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

export default ChangeInterval;