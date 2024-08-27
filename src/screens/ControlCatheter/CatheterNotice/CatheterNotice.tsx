import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

const CatheterNotice = () => {
  const {t} = useTranslation();
  let days = 7;
  return (
    <View>
        <View>
          <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px] mb-[10px]">
            {t("notification")}
          </Text>
        </View>
        <View className="border border-border-color p-4 flex-1 rounded-xl">
          <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
            {t("catheterNoticeComponent.when_the_stock_is_less_than")} {days} {t("day")}
          </Text>
        </View>      
    </View>
  );
};

export default CatheterNotice;
