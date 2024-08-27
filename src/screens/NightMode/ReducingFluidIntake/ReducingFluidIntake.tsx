import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setReducingFluidIntake, setTimeReducingFluidIntakeNotice } from "../../../store/slices/nightStateSlice";

const ReducingFluidIntake = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const nightModeTimeSettings = useAppSelector(state => state.nightOnBoarding);

  const [time, setTime] = useState(nightModeTimeSettings.reducingFluidIntakeTimeOfNotice.toString());

  const handleReducingFluidIntake = ({value}:{value: boolean}) => {
    if(value) dispatch(setReducingFluidIntake(value));
    else dispatch(setReducingFluidIntake(value));
  }

  const handleFluidIntakeTimeOfNotice = () => {
    dispatch(setTimeReducingFluidIntakeNotice(+time));
  }

  return (
    <View className="mb-3">
      <View className={`justify-center my-2 ${!nightModeTimeSettings.reducingFluidIntake && 'bg-[#b2bec3]'} rounded-xl pt-1 px-1`}>
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
          {t("nightModeScreen.reducingFluidIntakeComponent.receive_notifications_to_reduce_fluid_intake")}
        </Text>

        <View className="mt-3 max-w-[250px] flex-row mx-auto">
          <TextInput
            editable={nightModeTimeSettings.reducingFluidIntake}
            placeholder="max 5 hours"
            maxLength={1}
            keyboardType="numeric"
            onChangeText={setTime}
            onEndEditing={handleFluidIntakeTimeOfNotice}
            value={time}
            style={{fontFamily:'geometria-bold'}}
            className="text-base flex-1 px-2 text-center leading-[22px] min-h-[44px] border-b border-main-blue"
            />
          <View className="w-auto h-auto px-3 py-2">
            <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>{t("hour")} {t("before")} {t("sleep")}</Text>
          </View>
        </View>

      </View>
      <View className="flex-row px-2 justify-between">
        <TouchableOpacity
                onPress={() => handleReducingFluidIntake({value: true})}
                activeOpacity={.6}
                className={`${nightModeTimeSettings.reducingFluidIntake && 'bg-[#b2bec3]'} border border-main-blue rounded-xl min-w-[150px] min-h-[44px] flex-1 justify-center items-center mr-2`}>
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{t("yes")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleReducingFluidIntake({value: false})}
                activeOpacity={.6}
                className={`${!nightModeTimeSettings.reducingFluidIntake && 'bg-[#b2bec3]'} border border-main-blue rounded-xl min-w-[150px] min-h-[44px] flex-1 justify-center items-center mr-2`}>
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{t("no")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReducingFluidIntake;
