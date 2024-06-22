import { format } from "date-fns";
import { View, Text, Alert } from "react-native";

const СatheterСonsumption = ({filteredRecords, selectedCalendareDate}:{filteredRecords:number, selectedCalendareDate:string}) => {
  
  return (
    <View className="my-5">
        <View className="flex-row flex-1 justify-between">
          <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px] mb-[10px]">Средний расход катетеров Нелатон</Text>
          <Text onPress={() => Alert.alert('Вы можете изменить дату на станице Журнала')} style={{ fontFamily: "geometria-bold" }} className="text-black text-xs leading-[15px] mb-[10px]">
            на - {selectedCalendareDate === format(new Date(), 'MM/dd/yyyy HH:mm:ss').slice(0,10) ? 'today' : selectedCalendareDate}
          </Text>
        </View>
        <View className="flex-row gap-2">
            <View className="border border-border-color p-4 flex-1 rounded-xl items-center">
                <Text style={{ fontFamily: "geometria-bold" }} className="text-lg text-black">{filteredRecords}</Text>
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">катететоров в день</Text>
            </View>
            <View className="border border-border-color p-4 flex-1 rounded-xl items-center">
                <Text style={{ fontFamily: "geometria-bold" }} className="text-lg text-black">{filteredRecords * 31}</Text>
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">катететоров в месяц</Text>
            </View>
        </View>
    </View>
  );
};

export default СatheterСonsumption;
