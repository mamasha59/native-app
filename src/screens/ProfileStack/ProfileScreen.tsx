import { Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { StackNavigationRoot } from "../../components/RootNavigations/RootNavigations";
import MainLayout from "../../Layouts/MainLayout/MainLayout";
import ToggleCannulationAtNight from "../../components/ToggleCannulationAtNight/ToggleCannulationAtNight";
import ToggleIsCountUrine from "../../components/ToggleIsCountUrine/ToggleIsCountUrine";
import ChangeInterval from "./ChangeInterval/ChangeInterval";
import SwitchUnits from "./SwitchUnits/SwitchUnits";
import SwitchLanguage from "./SwitchLanguage/SwitchLanguage";
import ProfileUtils from "./ProfileUtils/ProfileUtils";
import SwitchWidgetConsumableItems from "./SwitchWidgetConsumableItems/SwitchWidgetConsumableItems";

const ProfileScreen = () => { //TODO clear the chaos with folders
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationRoot>();

  return (
    <MainLayout title={t("profileScreen.title")}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
        <ChangeInterval/>
        <ToggleCannulationAtNight/>
        <ToggleIsCountUrine/>
        <SwitchUnits/>
        <SwitchLanguage/>
        <SwitchWidgetConsumableItems/>
        <TouchableOpacity
          onPress={() => navigation.navigate('PdfOnBoarding', {})}
          className="py-4 mt-2 border-b border-main-blue">
          <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-sm uppercase">
            {t("profileScreen.personal_data_for_PDF")}
          </Text>
        </TouchableOpacity>
        <ProfileUtils/>
      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
