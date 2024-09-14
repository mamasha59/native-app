import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";

import { useAppSelector } from "../../../store/hooks";
import WaterBalanceInterval from "../WaterBalanceInterval/WaterBalanceInterval";
import { ClosePopup } from "../../../assets/images/icons";

const windowWidth = Dimensions.get('window').width;

const FluidIntakeChart = () => {
    const {t, i18n} = useTranslation();
    const data = useAppSelector(state => state.journal);
    const [result, setResult] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

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

   //ВБ=Выделеннаямоча/Введеннаяжидкость×100%.
   useEffect(() => {
    const water = data.drankWaterChart[data.drankWaterChart.length - 1].value;
    const urine = data.urineChart[data.urineChart.length - 1].value;

    const calculatedResult = (urine / water) * 100;
    setResult(calculatedResult);
        if(result !==0){
            if (calculatedResult < 75) {
                setTextAlert ({ interval: t("waterBalanceComponent.intervals.negative") });
                setShowResult({showNegative: true, showNormal: false, showPositive: false});
                setTextColor(colorNegative);

            } else if (calculatedResult >= 75 && calculatedResult < 80) {
                setTextAlert ({ interval: t("waterBalanceComponent.intervals.normal") });
                setShowResult({showNegative: false, showNormal: true, showPositive: false});
                setTextColor(colorNormal);

            } else if (calculatedResult >= 80 ) {
                setTextAlert ({ interval: t("waterBalanceComponent.intervals.positive") });
                setShowResult({showNegative: false, showNormal: false, showPositive: true});
                setTextColor(colorPositive);
            }else {
                setShowResult({showNegative: false, showNormal: true, showPositive: false});
            }
        }
    }, [data, i18n.language]);

  return (
    <TouchableOpacity activeOpacity={.7} className="mb-4 flex-1" onPress={() => setShowModal(true)}>
        <View className="flex-row flex-wrap justify-between items-center">
            <View className="flex-row items-center">
                <View className="w-[20x] h-[20px]">
                    <LottieView
                        source={require("../../../assets/question-mark.json")}
                        style={{width: 20, height: 20}}
                        autoPlay
                    />
                </View>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">{t("waterBalanceComponent.title")}</Text>
            </View>
            <Text style={{fontFamily:'geometria-regular', color: textColor}} className="text-sm">{textAlert.interval}</Text>
        </View>
        <View className="mb-3 flex-1 flex-row pt-14">
            <WaterBalanceInterval result={result} showResult={showResult.showNegative} key={'negative'} bgColor={colorNegative}/>
            <WaterBalanceInterval result={result} showResult={showResult.showNormal} key={'normal'} bgColor={colorNormal}/>
            <WaterBalanceInterval result={result} showResult={showResult.showPositive} key={'positive'} bgColor={colorPositive}/>
        </View>
        <Modal
            isVisible={showModal}
            animationIn={'slideInUp'}
            animationOut={'zoomOut'}
            useNativeDriverForBackdrop
            onBackButtonPress={() => setShowModal(false)}>
            <View style={{width: windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-white px-5 py-11 items-start">
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
        </Modal>
    </TouchableOpacity>
  );
};

export default FluidIntakeChart;
