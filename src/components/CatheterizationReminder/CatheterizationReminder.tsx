import { View, Text } from "react-native"
import { useTranslation } from "react-i18next";

import NelatonIcon from "../../assets/images/iconsComponent/NelatonIcon";
import { useAppSelector } from "../../store/hooks";

const CatheterizationReminder = () => {
  const {t} = useTranslation();
  const setting = useAppSelector(state => state.timerStates.yellowInterval);

  return (
    <View className="flex-row flex-1 mt-3 bg-[#ecf0f1] p-2 px-5 items-start rounded-md">
        {/* <View className="border-main-blue border max-w-[47px] max-h-[47px] w-full rounded-full p-2 mr-3">
          <NelatonIcon/>
        </View> */}
        <View className="flex-1">
          <Text style={{fontFamily:'geometria-regular'}} className="text-xs">
            {t("catheterizationReminder.firstPartTitle")} {setting} {t("catheterizationReminder.secondPartTitle")}
          </Text>
        </View>
    </View>
  );
};

export default CatheterizationReminder;
