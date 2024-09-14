import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import NoticesOfCannulation from "../../../components/NoticesOfCannulation/NoticesOfCannulation";
import NoticesOfWaterConsumption from "../../../components/NoticesOfWaterConsumption/NoticesOfWaterConsumption";
import CatheterizationReminder from "../../../components/CatheterizationReminder/CatheterizationReminder";
import NotificationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";

interface iFifthDataScreen extends NavigationPropsWelcome<'FifthDataScreen'>{}

const FifthDataScreen = ({navigation}:iFifthDataScreen) => {
    const {t} = useTranslation();

    const proceedNextScreen = () => navigation.navigate('PayWall');

  return (
    <WelcomeLayout currentScreen={5} showRobotIconOnTop={false} buttonTitle={t("continue")} titleCenter handleProceed={proceedNextScreen}>
        <View className="max-w-[60px] my-5 w-full mx-auto bg-main-blue rounded-full p-4 items-center justify-center">
            <NotificationIcon width={28} color={'#fff'}/>
        </View>
        <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-center text-lg leading-5">
            {t("fourthDataScreen.title")}
        </Text>
        <CatheterizationReminder/>
        <NoticesOfCannulation/>
        <NoticesOfWaterConsumption/>
    </WelcomeLayout>
  );
};

export default FifthDataScreen;