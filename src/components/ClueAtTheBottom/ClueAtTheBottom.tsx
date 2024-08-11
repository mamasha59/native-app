import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

const ClueAtTheBottom = ({where}:{where?:string}) => {
  const {t} = useTranslation();
  return (
    <View className="py-5">
      <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">
        {t("clueAtTheBottom.title")} «{where || t("clueAtTheBottom.where")}»
      </Text>
    </View>
  );
};

export default ClueAtTheBottom;
