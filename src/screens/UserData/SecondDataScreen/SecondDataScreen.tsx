import { Text } from "react-native";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import FluidIntakeChart from "../../WaterBalance/FluidIntakeChart/FluidIntakeChart";
import ClueAtTheBottom from "../../../components/ClueAtTheBottom/ClueAtTheBottom";
import ToggleIsCountUrine from "../../../components/ToggleIsCountUrine/ToggleIsCountUrine";

interface iSecondDataScreen extends NavigationPropsWelcome<'SecondDataScreen'>{}

const SecondDataScreen = ({navigation}:iSecondDataScreen) => {

    const proceedNextScreen = () => {
        navigation.navigate('ThirdDataScreen');
    }

  return (
    <WelcomeLayout currentScreen={2} buttonTitle="продолжить" handleProceed={proceedNextScreen}>
        <FluidIntakeChart/>
        <Text className="text-base my-3" style={{fontFamily:'geometria-regular'}}>
            Измерение потребляемой жидкости и выделенной мочи поможет поддерживать оптимальный уровень воды в организме.
        </Text>
        <ToggleIsCountUrine/>
        <ClueAtTheBottom/>
    </WelcomeLayout>
  );
};

export default SecondDataScreen;
