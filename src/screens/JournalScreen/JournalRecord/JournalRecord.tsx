import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity } from "react-native";

import { iDairyRecord } from "../../../types";

const JournalRecord = (props:iDairyRecord) => {
    const {t} = useTranslation();
    const {whenWasCanulisation, amountOfDrankFluids, catheterType, amountOfReleasedUrine, leakageReason, urineColor} = props;
    
  return (
    <View
        className={`flex-row justify-between items-center border px-[15px] py-3 mb-3 rounded-md border-border-color
        ${amountOfReleasedUrine && 'border-purple-button' || catheterType && 'border-[#FDD835]'}`}>

        <View className={ "flex-0 mr-4"}>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs color-black">
                {t("journalScreen.recordTitles.time")}
            </Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-sm color-black">{whenWasCanulisation}</Text>
        </View>
        
    {  leakageReason &&      
        <View className="flex-1 w-full">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs color-black">
                {leakageReason && t("journalScreen.recordTitles.leakage")}:
            </Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-sm color-black">{leakageReason}</Text>
        </View>
    }
    {    catheterType &&    
        <View className="items-start flex-1">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs color-black">
                {catheterType && t("journalScreen.recordTitles.catheterization")}:
            </Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-sm color-black">{catheterType}</Text>
        </View>
    } 
    {   amountOfDrankFluids || amountOfReleasedUrine
        ?   <View className="items-start flex-1">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs color-black">
                    {amountOfDrankFluids ? t("journalScreen.recordTitles.drank_fluids") : amountOfReleasedUrine ? t("journalScreen.recordTitles.excreted_urine") : ''}:
                </Text>
                <Text style={{ fontFamily: "geometria-bold" }} className="text-sm color-black">
                    {(amountOfDrankFluids || amountOfReleasedUrine) && (amountOfDrankFluids || amountOfReleasedUrine)}
                </Text>
            </View> 
        : ''
    }

    {catheterType && urineColor &&
        <TouchableOpacity onPress={()=> console.log(urineColor.title)} className="items-center">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs color-black mb-1">
                Цвет мочи:
            </Text>
            <View style={{backgroundColor: urineColor.color}} className="w-4 h-4 rounded-full border border-main-blue"></View>
        </TouchableOpacity>
    }
    </View>
  );
};

export default JournalRecord;
