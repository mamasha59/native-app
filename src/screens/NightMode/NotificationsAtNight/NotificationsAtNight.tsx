import { View, Text } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";

const NotificationsAtNight = () => {
  const {t} = useTranslation();
  return (
    <View className="mb-3">
      <Text className="text-lg" style={{fontFamily:'geometria-bold'}}>
        {t("nightModeScreen.notificationsAtNightComponent.night_time_notifications")}
      </Text>
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
          {t("nightModeScreen.notificationsAtNightComponent.description_first_part")}
          <Text> <FontAwesome6 key={'night-mode'} name="cloud-moon" size={24}  color="#2d3436"/> </Text>  
          {t("nightModeScreen.notificationsAtNightComponent.description_second_part")}
        </Text>
    </View>
  );
};

export default NotificationsAtNight;
