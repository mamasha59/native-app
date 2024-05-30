import { View, Text } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';

const NotificationsAtNight = () => {
  return (
    <View className="mb-3">
      <Text className="text-lg" style={{fontFamily:'geometria-bold'}}>Уведомления в ночное время: </Text>
        <Text className="text-lg" style={{fontFamily:'geometria-regular'}}>
            С момента катетеризации перед сном и активации
            <Text> <FontAwesome6 key={'night-mode'} name="cloud-moon" size={24}  color="#2d3436"/> </Text>  
            до утра уведомления не будут отправляться.
        </Text>
    </View>
  );
};

export default NotificationsAtNight;
