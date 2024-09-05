import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import NoticeOfRemainCatheters from "./NoticeOfRemainCatheters/NoticeOfRemainCatheters";
import AddCatheters from "./AddCatheters/AddCatheters";

interface iCatheterScreen extends NavigationPropsWelcome<'CathetersScreen'>{}

const CathetersScreen = ({navigation}:iCatheterScreen) => {
    const {t} = useTranslation();

    const proceedNextScreen = () => navigation.navigate('ThirdDataScreen');

  return (
    <WelcomeLayout
      buttonTitle={t("continue")}
      handleProceed={proceedNextScreen}
      title="Сколько катетеров у вас есть?"
      currentScreen={3}
    >
      <AddCatheters/>
      <NoticeOfRemainCatheters/>
    </WelcomeLayout>
  );
};

export default CathetersScreen;
