import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { View, Text, Alert } from "react-native";

import { dateFormat } from "../../../utils/const";

const СatheterСonsumption = ({filteredRecords, selectedCalendareDate}:{filteredRecords:number, selectedCalendareDate:string}) => {
  const {t} = useTranslation();
  return (
    <View className="my-5 flex-1">
        <View className="flex-row flex-1 justify-between">
          <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px] mb-[10px]">
            {t("catheterStockScreen.averageCatheterUsageComponent.title")}
          </Text>
          <Text onPress={() => Alert.alert('Вы можете изменить дату на станице Журнала')} style={{ fontFamily: "geometria-bold" }} className="text-black text-xs leading-[15px] mb-[10px]">
            {t("for")} - {selectedCalendareDate === format(new Date(), dateFormat).slice(0,10) ? 'today' : selectedCalendareDate}
          </Text>
        </View>
        <View className="flex-row gap-2">
            <View className="border border-border-color p-4 flex-1 rounded-xl items-center">
              {filteredRecords > 0 ?
                <>
                  <Text style={{ fontFamily: "geometria-bold" }} className="text-lg text-black">
                    {filteredRecords}
                  </Text>
                  <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                    {t('catheterStockScreen.averageCatheterUsageComponent.catheter_per_day')}
                  </Text>
                </>
                : 
                <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-center text-black">
                  {t("catheterStockScreen.perform_catheterization")}
                </Text>
              }
            </View>
            <View className="border border-border-color p-4 flex-1 rounded-xl items-center">
                <Text style={{ fontFamily: "geometria-bold" }} className="text-lg text-black">{filteredRecords * 31}</Text>
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                {t('catheterStockScreen.averageCatheterUsageComponent.catheter_per_month')}
                </Text>
            </View>
        </View>
    </View>
  );
};

export default СatheterСonsumption;
