import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { useAppSelector } from "../../../store/hooks";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import BackgroundGradientConsumableItems from "../../../Layouts/BackgroundGradientConsumableItems/BackgroundGradientConsumableItems";

const ConsumableItemsWidget = () => {
  const {t} = useTranslation();
  const {consumablesItem} = useAppSelector(state => state.consumablesSlice);
  const {showWidgetConsumableItems} = useAppSelector(state => state.appStateSlice);
  
  const navigation = useNavigation<StackNavigationRoot>();
  const navigate = () => navigation.navigate('ControlCatheter');

  const filteredData = consumablesItem.filter(item => item.active);

  return (
    <>
      <View className="flex-row justify-between items-center">
        <Text style={{ fontFamily: "geometria-bold"}} className="text-black text-base">
          {t("catheterStockScreen.stocks")}:
        </Text>
        <TouchableOpacity onPress={navigate} className="p-2">
          <Text className="text-black underline" style={{ fontFamily: "geometria-regular" }}>
            {t("catheterStockScreen.stock_management")}
          </Text>
        </TouchableOpacity>
      </View>
      {showWidgetConsumableItems && 
      <View className="w-full relative">
        <BackgroundGradientConsumableItems>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            horizontal
            className="mt-1"
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
              <View className="items-center mr-2">
                <View className={`bg-[#cccfcf] flex-row border-white border-[.2px] rounded-full p-2`}>
                  <Text 
                    style={{ fontFamily: "geometria-regular"}}
                    className="mr-2 text-base text-black whitespace-pre-wrap">
                    {item.name}:
                  </Text>
                  <View className="flex-row items-center flex-wrap">
                    <Text
                      style={{ fontFamily: "geometria-bold"}}
                      className="text-base text-black">
                        {item.quantity+''}
                      </Text>
                    <Text
                      style={{fontFamily:"geometria-bold"}}
                      className="ml-2 text-base text-black">
                        {t("units")}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{fontFamily:"geometria-regular"}}
                  className="text-center text-xs text-black">
                  хватит на: {item.usagePerProcedure} {t("day")}
                </Text>
              </View>
            }
          />
        </BackgroundGradientConsumableItems>
      </View>}
    </>
  );
};

export default ConsumableItemsWidget;