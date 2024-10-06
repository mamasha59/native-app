import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import AddCatheters from "../FifthDataScreen/AddCatheters/AddCatheters";
import NoticeOfRemainCatheters from "../FifthDataScreen/NoticeOfRemainCatheters/NoticeOfRemainCatheters";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const {t} = useTranslation();

    const proceedNextScreen = () => navigation.navigate('FourthDataScreen');

  return (
    <WelcomeLayout
      buttonTitle={t("continue")}
      handleProceed={proceedNextScreen}
      title={t("thirdDataScreen.how_many_catheters_do_you_have")}
      currentScreen={3}
    >
      <AddCatheters/>
      <NoticeOfRemainCatheters/>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;