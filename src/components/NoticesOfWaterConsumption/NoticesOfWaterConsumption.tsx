import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import EveningNoticeOfFluidIntake from "./EveningNoticeOfFluidIntake/EveningNoticeOfFluidIntake";
import SetWaterGoalDay from "./SetWaterGoalDay/SetWaterGoalDay";
import WaterGoalReminderDuringDay from "./WaterGoalReminderDuringDay/WaterGoalReminderDuringDay";

const NoticesOfWaterConsumption = () => {
    const {t} = useTranslation();

  return (
    <View className="mt-4">
        <Text style={{fontFamily:'geometria-bold'}}>
            {t("noticeOfWaterConsumptionComponents.title")}
        </Text>
        <EveningNoticeOfFluidIntake/>
        <SetWaterGoalDay/>
        <WaterGoalReminderDuringDay/>
    </View>
  );
};

export default NoticesOfWaterConsumption;