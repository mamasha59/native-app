import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";

import { iDairyRecord } from "../../../types";

const JournalRecord = (props:iDairyRecord) => {
    const {t} = useTranslation();
    const {whenWasCanulisation, amountOfDrankFluids, catheterType, amountOfReleasedUrine, leakageReason, urineColor} = props;
    
  return (
    <View
        className={`flex-row justify-between items-center border px-3 py-3 mb-3 rounded-md border-border-color
        ${amountOfReleasedUrine && 'border-purple-button' || catheterType && 'border-[#FDD835]'}`}>

        <View className={ "flex-0 mr-2"}>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                {t("journalScreen.recordTitles.time")}
            </Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-black">{whenWasCanulisation}</Text>
        </View>
        {leakageReason &&
        <View className="flex-1 flex-row justify-center">
            {leakageReason?.reason &&      
                <View className="flex-1 w-full items-center">
                    <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                        {leakageReason.reason && t("journalScreen.recordTitles.leakage")}:
                    </Text>
                    <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-purple-button lowercase">{leakageReason.reason}</Text>
                </View>
            }
            {leakageReason?.value &&      
                <View className="flex-1 w-full items-center">
                    <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                        {leakageReason.value && 'Количество'}:
                    </Text>
                    <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-error">{leakageReason.value}</Text>
                </View>
            }
        </View>}
        {catheterType &&    
            <View className="items-start flex-1">
                <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-black">
                    {catheterType && t("journalScreen.recordTitles.catheterization")}
                </Text>
            </View>
        } 
        {amountOfDrankFluids.value || amountOfReleasedUrine
            ?   <View className="items-center flex-1">
                    <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                        {amountOfDrankFluids ? t("journalScreen.recordTitles.drank_fluids") : amountOfReleasedUrine ? t("journalScreen.recordTitles.excreted_urine") : ''}:
                    </Text>
                    <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-black">
                        {(amountOfDrankFluids.value || amountOfReleasedUrine) && (amountOfDrankFluids.value || amountOfReleasedUrine)}
                    </Text>
                </View> 
            : ''
        }
        {amountOfDrankFluids.drinkName &&
               <View className="items-center flex-1">
                    <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                        Тип напитка:
                    </Text>
                    <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-[#3498db]">
                        {amountOfDrankFluids.drinkName}
                    </Text>
                </View> 
        }

        {catheterType && urineColor &&
            <TouchableOpacity onPress={()=> console.log(urineColor.title)} className="items-center">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black mb-1">
                    Цвет мочи:
                </Text>
                <View style={{backgroundColor: urineColor.color}} className="w-4 h-4 rounded-full border border-main-blue"></View>
            </TouchableOpacity>
        }
    </View>
  );
};

export default JournalRecord;
