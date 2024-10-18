import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Modal, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { BlurView } from "expo-blur";

import { useAppSelector } from "../../../store/hooks";
import WaterBalanceInterval from "../WaterBalanceInterval/WaterBalanceInterval";
import { ClosePopup } from "../../../assets/images/icons";
import { isAfter, isBefore, sub } from "date-fns";
import { iDairyRecord } from "../../../types";
import HoursInterval from "./HoursInterval/HoursInterval";

const screen = Dimensions.get('window');

type FieldName = 'amountOfDrankFluids' | 'amountOfReleasedUrine';

const FluidIntakeChart = () => {
    const {t, i18n} = useTranslation();
    const {urineDiary} = useAppSelector(state => state.journal);

    const [result, setResult] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [timeIntervalToShowResult, setTimeIntervalToShowResult] = useState<number>(12);
    const [loading, setLoading] = useState<boolean>(false);
    
    const [showResult, setShowResult] = useState<{showNegative:boolean,showNormal:boolean,showPositive:boolean}>({
        showNegative: false,
        showNormal: false,
        showPositive: false,
    });
    const [textAlert, setTextAlert] = useState<{interval: string}>({
        interval:'',
    });

    const [textColor, setTextColor] = useState<string>('#000');

    const colorNegative = '#EA3737';
    const colorNormal = '#4BAAC5';
    const colorPositive = '#f1c40f';
    // convert fl oz into ml
    const convertFlOzToMl = (amount:number) => {
        return String(amount * 29.5735);
    };
    // Функция для фильтрации и конвертации записей
    const processRecords = (records:iDairyRecord[], subtractHours:Date, currentDate:Date, fieldName:FieldName) => {
        return records
        .filter(record => isAfter(record.timeStamp, subtractHours) && isBefore(record.timeStamp, currentDate))
        .map(record => {
            const modifyRecord = { ...record };
            if(fieldName === 'amountOfDrankFluids'){
                const [amount, unit] = record[fieldName]!.value.split(' ');
                if (unit === 'fl') {
                    modifyRecord[fieldName]!.value = `${convertFlOzToMl(+amount)} ml`;
                }
            }else {
                const [amount, unit] = record[fieldName]!.split(' ');
                if (unit === 'fl') {
                    modifyRecord[fieldName] = `${convertFlOzToMl(+amount)} ml`;
                }
            }
            return modifyRecord;
        });
    };
  
    const calculateTotal = (records:iDairyRecord[], fieldName:FieldName) => {
        if(fieldName === 'amountOfDrankFluids'){
            return records.reduce((acc, record) => acc + Number(record[fieldName]!.value.split(' ')[0]), 0);
        }else {
            return records.reduce((acc, record) => acc + Number(record[fieldName]!.split(' ')[0]), 0);
        }
    };

   //ВБ=Выделеннаямоча/Введеннаяжидкость×100%.
   useEffect(() => {
        const subtractHours = sub(new Date(), {hours: timeIntervalToShowResult});
        try {
            setLoading(true);

            const recordsOfDrunkFluid = urineDiary.filter(e => e.amountOfDrankFluids && e.amountOfDrankFluids.value);
            const recordsOfReleasedUrine = urineDiary.filter(e => e.amountOfReleasedUrine);
            
            const arrayOfRecordsDrunkFluidPerInterval = processRecords(recordsOfDrunkFluid, subtractHours, new Date(), 'amountOfDrankFluids');
            const arrayOfRecordsReleasedUrinePerInterval = processRecords(recordsOfReleasedUrine, subtractHours, new Date(), 'amountOfReleasedUrine');

            const totalDrunkFluid = calculateTotal(arrayOfRecordsDrunkFluidPerInterval, 'amountOfDrankFluids');
            const totalReleasedUrine = calculateTotal(arrayOfRecordsReleasedUrinePerInterval, 'amountOfReleasedUrine');

            if (totalReleasedUrine && totalDrunkFluid) {
                const calculatedResult = (totalReleasedUrine / totalDrunkFluid) * 100;
                setResult(calculatedResult);
                
                if (calculatedResult < 75) {
                  setTextAlert({ interval: t("waterBalanceComponent.intervals.negative") });
                  setShowResult({ showNegative: true, showNormal: false, showPositive: false });
                  setTextColor(colorNegative);
                } else if (calculatedResult >= 75 && calculatedResult < 80) {
                  setTextAlert({ interval: t("waterBalanceComponent.intervals.normal") });
                  setShowResult({ showNegative: false, showNormal: true, showPositive: false });
                  setTextColor(colorNormal);
                } else if (calculatedResult >= 80) {
                  setTextAlert({ interval: t("waterBalanceComponent.intervals.positive") });
                  setShowResult({ showNegative: false, showNormal: false, showPositive: true });
                  setTextColor(colorPositive);
                } else {
                  setShowResult({ showNegative: false, showNormal: true, showPositive: false });
                }
              }
              setLoading(false); // Снимаем после завершения работы
        } catch (error) {
            console.error('Error processing records:', error);
        }
  
    }, [urineDiary, i18n.language, timeIntervalToShowResult]);

    const showDescription = () => setShowModal(true);
    
  return (
    <View className="relative">
        {loading && 
        <BlurView style={{zIndex: 999}} intensity={100} tint="systemUltraThinMaterialLight" className="absolute rounded-md left-0 right-0 justify-center h-full">
            <ActivityIndicator style={{zIndex:1000}} size={'large'}/>
        </BlurView>}
        <HoursInterval
            setTimeIntervalToShowResult={(hour) => setTimeIntervalToShowResult(hour)}
            textAlert={textAlert}
            textColor={textColor}
            showDescription={showDescription}
        />
        <TouchableOpacity activeOpacity={.7} className="mb-2 flex-1" onPress={showDescription}>
            <View className="flex-1 flex-row pt-14">
                <WaterBalanceInterval result={result} showResult={showResult.showNegative} key={'negative'} bgColor={colorNegative}/>
                <WaterBalanceInterval result={result} showResult={showResult.showNormal} key={'normal'} bgColor={colorNormal}/>
                <WaterBalanceInterval result={result} showResult={showResult.showPositive} key={'positive'} bgColor={colorPositive}/>
            </View>
        </TouchableOpacity>

        <Modal
            visible={showModal}
            transparent
            animationType="fade"
            onRequestClose={() => setShowModal(false)}>
            <View className="flex-1 w-full h-full bg-[#00000037]">
                <View style={{width: screen.width / 1.3, height: screen.height / 1.7}} className="justify-center my-auto rounded-md mx-auto bg-white px-5 items-start">
                    <TouchableOpacity onPress={() => setShowModal(false)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                        <ClosePopup width={15} height={15}/>
                    </TouchableOpacity>
                    <View className="mt-2 mx-auto">
                        <Text className="text-center" style={{fontFamily:'geometria-bold'}}>
                                {t("waterBalanceComponent.water_balance_formula")}
                        </Text>
                        <View className="flex-row items-center justify-center py-5">
                                <Text style={{fontFamily:'geometria-regular'}} className="mr-1">
                                    {t("waterBalanceComponent.title_short")} =
                                </Text>
                                <View className="">
                                    <Text className="border-b text-center" style={{fontFamily:'geometria-regular'}}>
                                        {t("waterBalanceComponent.urine_output")}
                                    </Text>
                                    <Text className="text-center" style={{fontFamily:'geometria-regular'}}>
                                        {t("waterBalanceComponent.fluid_intake")}
                                    </Text>
                                </View>
                                <Text className="ml-1" style={{fontFamily:'geometria-regular'}}>× 100%</Text> 
                        </View>
                    </View>
                    <Text style={{fontFamily:'geometria-regular'}} className="mb-2">
                        {t("waterBalanceComponent.description")}
                    </Text>
                    <View className="my-2 border-l-4 pl-2" style={{borderColor:colorNegative}}>
                        <Text style={{fontFamily:'geometria-bold'}}>
                        {t("waterBalanceComponent.intervals.negative")} {t("waterBalanceComponent.intervals.negative_text")}
                        </Text>
                    </View>
                    <View className="my-2 border-l-4 pl-2" style={{borderColor:colorNormal}}>
                        <Text style={{fontFamily:'geometria-bold'}}>
                        {t("waterBalanceComponent.intervals.normal")} {t("waterBalanceComponent.intervals.normal_text")}
                        </Text>
                    </View>
                    <View className="my-2 border-l-4 pl-2" style={{borderColor:colorPositive}}>
                        <Text style={{fontFamily:'geometria-bold'}}>
                        {t("waterBalanceComponent.intervals.positive")} {t("waterBalanceComponent.intervals.positive_text")}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  );
};

export default FluidIntakeChart;
