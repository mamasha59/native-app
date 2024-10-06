import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import NoticesOfCannulation from "../../components/NoticesOfCannulation/NoticesOfCannulation";
import NoticesOfWaterConsumption from "../../components/NoticesOfWaterConsumption/NoticesOfWaterConsumption";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import CatheterizationReminder from "../../components/CatheterizationReminder/CatheterizationReminder";

const NoticeNavigationScreen = () => {
  const {t} = useTranslation();
  return (
    <MainLayout title={t("fifthDataScreen.title")}>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <CatheterizationReminder/>
        <NoticesOfCannulation/>
        <NoticesOfWaterConsumption/>
      </ScrollView>
    </MainLayout>
  );
};

export default NoticeNavigationScreen;
