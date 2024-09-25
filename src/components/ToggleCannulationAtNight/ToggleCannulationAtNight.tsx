import { View } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as Notifications from 'expo-notifications';

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setWhetherDoCannulationAtNight } from "../../store/slices/nightStateSlice";
import { StackNavigationRoot } from "../RootNavigations/RootNavigations";
import SwitchToggle from "../SwitchToggle/SwitchToggle";
import DoubleButtonOnceOrByInterval from "./DoubleButtonOnceOrByInterval/DoubleButtonOnceOrByInterval";

const ToggleCannulationAtNight = () => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const {identifierOfMorningReminderToDoCatheterization,identifierOfReducingFluidIntakeBeforeSleep} = useAppSelector(state => state.notificationsSettingsSlice);
    const {cannulationAtNight} = useAppSelector((state) => state.nightOnBoarding); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)

    const currentRoute = useNavigationState(state => state.routes[state.index].name);
    const navigation = useNavigation<StackNavigationRoot>();

    const [toggleNightMode, setToggleNightMode] = useState<boolean>(cannulationAtNight);

    const handleSwitchToggleUseAtNight = async() => {
        const newIsEnabled = !toggleNightMode;
        setToggleNightMode(newIsEnabled);

        if(newIsEnabled){
            await Notifications.cancelScheduledNotificationAsync(identifierOfMorningReminderToDoCatheterization);
            await Notifications.cancelScheduledNotificationAsync(identifierOfReducingFluidIntakeBeforeSleep);
        }
        dispatch(setWhetherDoCannulationAtNight(newIsEnabled));
        if (!newIsEnabled && currentRoute !== 'FirstDataScreen') {
            navigation.navigate('NightMode');
        }
    };

  return (
    <View className="items-center my-4 bg-[#ecf0f1] p-2 rounded-xl h-auto">
        <SwitchToggle
            key={'toggle-night-mode'}
            title={t('toggleCannulationAtNightComponent.title')}
            onValueChange={handleSwitchToggleUseAtNight}
            isEnabled={toggleNightMode}
        />
        <DoubleButtonOnceOrByInterval/>
    </View>
    
  );
};

export default ToggleCannulationAtNight;