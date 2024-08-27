import { Text, TouchableOpacity, Alert, View } from "react-native";
import * as Notifications from 'expo-notifications';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import MainLayout from '../../../Layouts/MainLayout/MainLayout';
import { persistor } from "../../../store/store";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import SwitchLanguage from "./ProfileSettings/SwitchLanguage/SwitchLanguage";
import SwitchUnits from "./ProfileSettings/SwitchUnits/SwitchUnits";

const ProfileScreen = () => { //TODO clear the chaos with folders
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationRoot>();

  const removeProfile = async () => {
    Alert.alert('Закройте приложение, и откройте снова')
    persistor.purge();
    Notifications.dismissAllNotificationsAsync();
  }

  return (
    <MainLayout title={t("profileScreen.title")}>
      <ProfileSettings/>
      <View className="justify-end w-full flex-1">
        <SwitchUnits/>
        <SwitchLanguage/>

        <TouchableOpacity
          onPress={() => navigation.navigate('PdfOnBoarding', {})}
          className="py-4 mt-2 border-b border-main-blue">
          <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-sm uppercase">
            {t("profileScreen.personal_data_for_PDF")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onLongPress={removeProfile} className="py-4 mt-1">
          <Text style={{fontFamily:'geometria-bold'}} className="text-error">Сбросить профиль - temporarily (long press)</Text>
        </TouchableOpacity>

      </View>
    </MainLayout>
  );
};

export default ProfileScreen;
