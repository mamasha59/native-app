import { Text, TouchableOpacity, Alert } from "react-native";

import MainLayout from '../../../Layouts/MainLayout/MainLayout';
import { persistor } from "../../../store/store";
import ProfileSettings from "./ProfileSettings/ProfileSettings";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation<StackNavigationRoot>();

  const removeProfile = async () => { // удаление инфы из локал стореджа, временно для разработки
    Alert.alert('Закройте приложение, и откройте снова')
    persistor.purge();
  }

  return (
    <MainLayout title="Профиль">
        <ProfileSettings/>

        <TouchableOpacity onPress={() => navigation.navigate('PdfOnBoarding')} className="py-4 mt-2">
          <Text style={{fontFamily:'geometria-bold'}} className="opacity-70 text-main-blue">Редактировать Pdf</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={removeProfile} className="py-28 mt-1">
          <Text style={{fontFamily:'geometria-bold'}} className="opacity-70 text-error">Сбросить профиль - temporarily </Text>
        </TouchableOpacity>

    </MainLayout>
  );
};

export default ProfileScreen;
