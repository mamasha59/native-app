import { View, Text, ScrollView } from "react-native";

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

const NightMode = ({navigation}:NavigationPropsRoot<'NightMode'>) => {

  return (
    <MainLayout title="Без катетеризации ночью:">
        <ScrollView className="flex-1 h-full">
            <SleepTimeStartEnd/>
            <AskActivateAfterTime/>
            <NotificationsAtNight/>
            <MorningCathNotice/>
            <TimeOfNotice/>
            <ReducingFluidIntake/>
            <View className="mb-3 justify-center items-center flex-1">
                <Text className="text-sm text-center" style={{fontFamily:'geometria-regular'}}>
                    Обсудите периодичность катетеризации и возможность её исключения ночью с вашим врачом.
                </Text>
            </View>
            <DoubleButton
                showIcon={false}
                textOfLeftButton="Выйти"
                textOfRightButton="Сохранить"
                handlePressLeftButton={() => navigation.goBack()}
                handlePressRightButton={() => navigation.goBack()}
            />
            <ClueAtTheBottom/>
        </ScrollView>
    </MainLayout>
  );
};

export default NightMode;
