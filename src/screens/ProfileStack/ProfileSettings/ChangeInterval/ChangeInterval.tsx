import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { useFormatInterval } from "../../../../hooks/useFormatInterval";
import { useAppSelector } from "../../../../store/hooks";

interface iChangeInterval {
  handleChangeOptimalInterval: () => void,
}

const ChangeInterval = ({handleChangeOptimalInterval}:iChangeInterval) => {
  const {t} = useTranslation();
  const newInterval = useAppSelector((state) => state.timerStates.interval);
  const newIntervalText = useFormatInterval({intervalInSeconds: newInterval});
  
  return (
    <>
      <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-start mb-1">
        {t("profileScreen.profileSettingsComponent.change_interval")}
      </Text>
    
      <View className="flex-row items-center">
        <View className="bg-[#048eff] rounded-2xl min-w-[185px] items-center flex-1 justify-center mr-[10px]">
          <Text style={{fontFamily:'geometria-regular'}} className="py-2 text-[#fff] w-full text-lg text-center">
            {t("profileScreen.profileSettingsComponent.normal_interval")}
          </Text>
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