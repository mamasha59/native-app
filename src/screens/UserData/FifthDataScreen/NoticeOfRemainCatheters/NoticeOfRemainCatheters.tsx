import { TextInput, TouchableOpacity, View, Text, Dimensions } from "react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import NotificationIcon from "../../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setDaysInAdvanceWhenShowNoticeOfRemainCaths } from "../../../../store/slices/noticeSettingsSlice";
import { focusInput } from "../../../../utils/const";

const {width} = Dimensions.get('screen');

const NoticeOfRemainCatheters = () => {

  const {t} = useTranslation();

  const settingsOfNotice = useAppSelector(state => state.noticeSettingsSlice);
  const dispatch = useAppDispatch();

  const inputRefNoticeOfCathsRemain = useRef<TextInput>(null);
  const [whenShowNoticeOfCathsRemain, setWhenShowNoticeOfCathsRemain] = useState<string>(''+settingsOfNotice.daysInAdvanceWhenShowNoticeOfRemainCaths);

  const handleInputNoticeOfCathsRemain = (value:string) => {
    +value <= 0 ? setWhenShowNoticeOfCathsRemain('') : setWhenShowNoticeOfCathsRemain(value);
  }
  
  const submitDaysWhenShowNoticeOfCathsRemain = () => {
    dispatch(setDaysInAdvanceWhenShowNoticeOfRemainCaths(+whenShowNoticeOfCathsRemain))
  }

  const focusInputNoticeOfCathsRemain = () => focusInput(inputRefNoticeOfCathsRemain);

  return (
    <View className="mt-4 flex-1">
      <Text className="text-base leading-5 w-full flex-1 mb-4" style={{fontFamily:'geometria-regular'}}>
        Я напомню вам о необходимости пополнить запас катетеров, когда их останется менее чем:
      </Text>
      <TouchableOpacity onPress={focusInputNoticeOfCathsRemain} className="flex-row justify-center items-center">
          <View className="pt-3 w-7 h-7 items-center justify-center">
            <NotificationIcon width={28} color={'#061def'}/>
          </View>
          <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
            на
          </Text>
          <View className="flex-row items-center">
            <TextInput
              ref={inputRefNoticeOfCathsRemain}
              value={whenShowNoticeOfCathsRemain}
              onEndEditing={submitDaysWhenShowNoticeOfCathsRemain}
              onChangeText={(e) => handleInputNoticeOfCathsRemain(e)}
              style={{fontFamily:'geometria-bold', width: width / 6}}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              className="text-xl border-b text-center mx-2"/>
            <Text className="text-lg" style={{fontFamily:'geometria-bold'}}>{t("day")}</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
};

export default NoticeOfRemainCatheters;