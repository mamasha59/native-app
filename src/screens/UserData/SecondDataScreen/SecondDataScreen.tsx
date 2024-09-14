import { Text } from "react-native";
import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import FluidIntakeChart from "../../WaterBalance/FluidIntakeChart/FluidIntakeChart";
import ClueAtTheBottom from "../../../components/ClueAtTheBottom/ClueAtTheBottom";
import ToggleIsCountUrine from "../../../components/ToggleIsCountUrine/ToggleIsCountUrine";
import SwitchUnits from "../../ProfileStack/SwitchUnits/SwitchUnits";

interface iSecondDataScreen extends NavigationPropsWelcome<'SecondDataScreen'>{}

const SecondDataScreen = ({navigation}:iSecondDataScreen) => {
    const {t} = useTranslation();
    
    const proceedNextScreen = () => {
      navigation.navigate('ThirdDataScreen');
    }

  return (
    <WelcomeLayout currentScreen={2} buttonTitle={t("continue")} handleProceed={proceedNextScreen}>
        <FluidIntakeChart/>
        <Text className="text-base my-3" style={{fontFamily:'geometria-regular'}}>
            {t("secondDataScreen_description")}
        </Text>
        <ToggleIsCountUrine/>
        <SwitchUnits/>
        <ClueAtTheBottom/>
    </WelcomeLayout>
  );
};

export default SecondDataScreen;
