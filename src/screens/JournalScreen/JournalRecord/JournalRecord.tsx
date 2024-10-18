import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

import { iDairyRecord } from "../../../types";
import { partTimeColors } from "../../../utils/const";

const JournalRecord = (props:iDairyRecord) => {
    const {t} = useTranslation();
    const {whenWasCatheterization, amountOfDrankFluids, catheterType, amountOfReleasedUrine, leakageReason, urineColor, partTime} = props;

    const getBorderColor = () => {
        if (partTime?.firstPartTime) {
            return partTimeColors.blue;
        } else if (partTime?.secondPartTime) {
            return partTimeColors.yellow;
        } else if (partTime?.thirdPartTime) {
            return partTimeColors.red;
        } else {
            return '#4babc563';
        }
    };
    
  return (
    <View className={`flex-row justify-between items-center border px-3 py-3 mb-3 rounded-md`} style={{borderColor: getBorderColor()}}>

        <View className="flex-0 mr-2">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                {t("journalScreen.recordTitles.time")}
            </Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-black">{whenWasCatheterization}</Text>
        </View>
        {leakageReason &&
        <View className="flex-1 flex-row justify-center">
            {leakageReason?.reason &&      
                <View className="flex-1 w-full items-center">
                    <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                        {t("journalScreen.recordTitles.leakage")}:
                    </Text>
                    <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-purple-button lowercase">{leakageReason.reason}</Text>
                </View>
            }
            {leakageReason?.value &&      
                <View className="flex-1 w-full items-center">
                    <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                        {t("quantity")}:
                    </Text>
                    <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-error">{leakageReason.value}</Text>
                </View>
            }
        </View>}
        {catheterType &&    
            <View className="flex-1 items-center">
                <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-black">
                    {t("journalScreen.recordTitles.catheterization")}
                </Text>
            </View>
        } 
        {amountOfDrankFluids && amountOfDrankFluids.value &&
            <View className="items-center flex-1">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                    {t("journalScreen.recordTitles.drank_fluids")}:
                </Text>
                <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-black">
                    {amountOfDrankFluids.value}
                </Text>
            </View> 
        }
        {amountOfReleasedUrine &&
            <View className="items-center flex-1">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                    {t("journalScreen.recordTitles.excreted_urine")}:
                </Text>
                <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-black">
                    {amountOfReleasedUrine}
                </Text>
            </View> 
        }
        {amountOfDrankFluids && amountOfDrankFluids.drinkName &&
            <View className="items-center flex-1">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                    {t("journalScreen.recordTitles.type_of_drink")}:
                </Text>
                <Text style={{ fontFamily: "geometria-bold" }} className="text-sm text-[#3498db]">
                    {amountOfDrankFluids.drinkName}
                </Text>
            </View> 
        }

        {catheterType && urineColor &&
            <View className="items-center">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black mb-1">
                    {t("journalScreen.recordTitles.urine_color")}:
                </Text>
                <View style={{backgroundColor: urineColor.color}} className="w-4 h-4 rounded-full border border-main-blue"></View>
            </View>
        }
    </View>
  );
};

export default JournalRecord;
