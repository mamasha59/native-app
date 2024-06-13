import { ScrollView } from "react-native";
import NoticesOfCannulation from "../../components/NoticesOfCannulation/NoticesOfCannulation";
import NoticesOfWaterConsumption from "../../components/NoticesOfWaterConsumption/NoticesOfWaterConsumption";
import NoticesOfRemainCaths from "../../components/NoticesOfRemainCaths/NoticesOfRemainCaths";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import CatheterizationReminder from "../../components/CatheterizationReminder/CatheterizationReminder";

const NoticeNavigationScreen = () => {
  return (
    <MainLayout title="Настройка уведомлений">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 my-5">
          <CatheterizationReminder/>
          <NoticesOfCannulation/>
          <NoticesOfWaterConsumption/>
          <NoticesOfRemainCaths/>
        </ScrollView>
    </MainLayout>
  );
};

export default NoticeNavigationScreen;
