import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setMorningNotice } from "../../../store/slices/nightStateSlice";

const MorningCathNotice = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const nightModeTimeSettings = useAppSelector(state => state.nightOnBoarding);

    const morningNotice = ({value}:{value: boolean}) => {
        if(value) {
            dispatch(setMorningNotice(value));
        } else {
            dispatch(setMorningNotice(value));
        }
    }

  return (
    <View className="mb-3">
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
            {t("nightModeScreen.morningCathNoticeDescription")}
        </Text>
        <View className="flex-row px-2 justify-between">
            <TouchableOpacity
                onPress={() => morningNotice({value: true})}
                activeOpacity={.6}
                className={`${nightModeTimeSettings.morningNotice && 'bg-[#b2bec3]'} border border-main-blue rounded-xl min-w-[150px] min-h-[44px] flex-1 justify-center items-center mr-2`}>
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center capitalize">
                    {t("yes")}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => morningNotice({value: false})}
                activeOpacity={.6}
                className={`${!nightModeTimeSettings.morningNotice && 'bg-[#b2bec3]'} border border-main-blue rounded-xl min-w-[150px] min-h-[44px] flex-1 justify-center items-center mr-2`}>
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center capitalize">
                    {t("no")}
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default MorningCathNotice;
