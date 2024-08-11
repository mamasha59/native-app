import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { changeIsExist } from "../../../store/slices/appStateSlicer";
import NoticesOfRemainCaths from "../../../components/NoticesOfRemainCaths/NoticesOfRemainCaths";
import NoticesOfCannulation from "../../../components/NoticesOfCannulation/NoticesOfCannulation";
import NoticesOfWaterConsumption from "../../../components/NoticesOfWaterConsumption/NoticesOfWaterConsumption";
import CatheterizationReminder from "../../../components/CatheterizationReminder/CatheterizationReminder";
import NotificationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";

interface iFourthDataScreen extends NavigationPropsWelcome<'FourthDataScreen'>{}

const FourthDataScreen = ({navigation}:iFourthDataScreen) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const proceedNextScreen = () => {
        navigation.navigate('MainScreen');
        dispatch(changeIsExist(true));
    }

  return (
    <WelcomeLayout currentScreen={4} showRobotIconOnTop={false} buttonTitle={t("continue")} titleCenter handleProceed={proceedNextScreen}>
        <View className="max-w-[60px] my-5 w-full mx-auto bg-main-blue rounded-full p-4 items-center justify-center">
            <NotificationIcon width={28} color={'#fff'}/>
        </View>
        <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-center text-lg leading-5">
            {t("fourthDataScreen.title")}
        </Text>
        <CatheterizationReminder/>
        <NoticesOfCannulation/>
        <NoticesOfWaterConsumption/>
        <NoticesOfRemainCaths/>
    </WelcomeLayout>
  );
};

export default FourthDataScreen;
