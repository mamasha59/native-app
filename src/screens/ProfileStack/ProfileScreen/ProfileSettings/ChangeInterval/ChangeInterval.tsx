import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAppSelector } from "../../../../../store/hooks";
import { useFormatInterval } from "../../../../../hooks/useFormatInterval";

interface iChangeInterval {
  handleChangeInterval: () => void,
}

const ChangeInterval = ({handleChangeInterval}:iChangeInterval) => {
  const newInterval = useAppSelector((state) => state.user.interval!);
  const newIntervalText = useFormatInterval({newInterval: newInterval});

  return (
    <View className="flex-row mb-5">
        <View className="border border-main-blue rounded-xl min-w-[185px] items-center flex-1 justify-center py-[16px] mr-[10px]">
            <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-center">Изменить интервал</Text>
        </View>
        <TouchableOpacity onPress={handleChangeInterval} activeOpacity={.6} className="border border-main-blue rounded-xl min-w-[150px] flex-1 justify-center items-center">
            <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{newIntervalText}</Text>
        </TouchableOpacity>
    </View>
  );
};

export default ChangeInterval;