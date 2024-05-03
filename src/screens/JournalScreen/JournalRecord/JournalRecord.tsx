import { View, Text } from "react-native";
import { iDairyRecord } from "../../../types";

const JournalRecord = (props:iDairyRecord) => {
    const {whenWasCanulisation,amountOfDrankFluids,catheterType,amountOfReleasedUrine,leakageReason} = props;
    
  return (
    <View  className={`flex-row justify-between items-center border px-[15px] py-[10px] mb-3 rounded-md border-border-color ${amountOfReleasedUrine && 'border-purple-button' || catheterType && 'border-[#FDD835]'}`}>
        <View className={leakageReason ? "flex-0 mr-4" : "items-start flex-1"}>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-black">Время</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-black">{whenWasCanulisation}</Text>
        </View>
    {  leakageReason &&      
        <View className="flex-1 w-full">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-black">{leakageReason && 'Подтекание:'}</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-black">{leakageReason}</Text>
        </View>
    }
    {    catheterType &&    
        <View className="items-start flex-1">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-black">{catheterType && 'Катетеризация:'}</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-black">{catheterType}</Text>
        </View>
    }
    {   amountOfDrankFluids || amountOfReleasedUrine ?
        <View className="items-start flex-1">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs opacity-40 color-black">{amountOfDrankFluids ? 'Выпито жид.:' : amountOfReleasedUrine ? 'Слито мочи:' : ''}</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-sm color-black">
                {(amountOfDrankFluids || amountOfReleasedUrine) && (amountOfDrankFluids || amountOfReleasedUrine) + ' мл.'}
            </Text>
        </View> : ''
    }

    <View className="gap-1 p-2">
        <View className="bg-main-blue w-[4px] h-[4px] rounded-full"></View>
        <View className="bg-main-blue w-[4px] h-[4px] rounded-full"></View>
    </View>
    </View>
  );
};

export default JournalRecord;
