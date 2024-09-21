import { useTranslation } from "react-i18next";
import { View, Text, ScrollView } from "react-native";
import * as Notifications from 'expo-notifications';

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import AskActivateAfterTime from "./AskActivateAfterTime/AskActivateAfterTime";
import MorningCathNotice from "./MorningCathNotice/MorningCathNotice";
import TimeOfNotice from "./TimeOfNotice/TimeOfNotice";
import ReducingFluidIntake from "./ReducingFluidIntake/ReducingFluidIntake";
import NotificationsAtNight from "./NotificationsAtNight/NotificationsAtNight";
import SleepTimeStartEnd from "./SleepTimeStartEnd/SleepTimeStartEnd";
import { NavigationPropsRoot } from "../../components/RootNavigations/RootNavigations";
import ClueAtTheBottom from "../../components/ClueAtTheBottom/ClueAtTheBottom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setWhetherDoCannulationAtNight } from "../../store/slices/nightStateSlice";
import useBackHandler from "../../hooks/useBackHandler";

const NightMode = ({navigation}:NavigationPropsRoot<'NightMode'>) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {identifierOfMorningReminderToDoCatheterization, identifierOfReducingFluidIntakeBeforeSleep} = useAppSelector(state => state.notificationsSettingsSlice)

    useBackHandler();

    const handleExitNightModeScreen = async () => {
        try {
          // Выполняем действие в Redux
          dispatch(setWhetherDoCannulationAtNight(true));
          // Отменяем запланированные уведомления
          await Notifications.cancelScheduledNotificationAsync(identifierOfMorningReminderToDoCatheterization);
          await Notifications.cancelScheduledNotificationAsync(identifierOfReducingFluidIntakeBeforeSleep);
        } catch (error) {
          console.error("Ошибка при отмене уведомлений:", error);
        } finally {
          // Переходим назад вне зависимости от результата
          navigation.goBack();
        }
    };
      

    const handleSafeSettings = () => {
        dispatch(setWhetherDoCannulationAtNight(false));
        navigation.goBack()
    }

  return (
    <MainLayout title={t("nightModeScreen.title")}>
        <ScrollView className="flex-1 h-full">
            <SleepTimeStartEnd/>
            <AskActivateAfterTime/>
            <NotificationsAtNight/>
            <MorningCathNotice/>
            <TimeOfNotice/>
            <ReducingFluidIntake/>
            <View className="mb-3 justify-center items-center flex-1">
                <Text className="text-sm text-center" style={{fontFamily:'geometria-regular'}}>
                    {t("nightModeScreen.notice")}
                </Text>
            </View>
            <DoubleButton
                marginBottom={false}
                showIcon={false}
                textOfLeftButton={t("exit")}
                textOfRightButton={t("save")}
                handlePressLeftButton={handleExitNightModeScreen}
                handlePressRightButton={handleSafeSettings}
            />
            <ClueAtTheBottom/>
        </ScrollView>
    </MainLayout>
  );
};

export default NightMode;
