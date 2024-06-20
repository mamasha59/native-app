import { View, Text } from "react-native";

const ClueAtTheBottom = ({where}:{where?:string}) => {
  return (
    <View className="py-5">
        <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">
            *Вы всегда можете изменить эти данные на вкладке «{where || 'Профиль'}»
        </Text>
    </View>
  );
};

export default ClueAtTheBottom;
