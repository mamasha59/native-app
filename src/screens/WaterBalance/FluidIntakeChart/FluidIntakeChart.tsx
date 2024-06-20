import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppSelector } from "../../../store/hooks";
import WaterBalanceInterval from "../WaterBalanceInterval/WaterBalanceInterval";
import { ClosePopup } from "../../../assets/images/icons";
import LottieView from "lottie-react-native";

const windowWidth = Dimensions.get('window').width;

const FluidIntakeChart = () => {
    const data = useAppSelector(state => state.journal);
    const [result, setResult] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [showResult, setShowResult] = useState<{showNegative:boolean,showNormal:boolean,showPositive:boolean}>({
        showNegative: false,
        showNormal: false,
        showPositive: false,
    });
    const [textAlert, setTextAlert] = useState<{interval: string, alert: string}>({
        interval:'',
        alert: ''
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

        if (calculatedResult < 75) {
            setTextAlert ({
                alert: "Задержка жидкости в организме. Пониженное выделение мочи. Возможно, стоит уменьшить потребление жидкости и проконсультироваться с врачом.",
                interval: 'Отрицательный'
            });
            setShowResult({showNegative: true, showNormal: false, showPositive: false});
            setTextColor(colorNegative);

        } else if (calculatedResult >= 75 && calculatedResult < 80) {
            setTextAlert ({
                alert: "Баланс воды в норме! Продолжайте в том же духе.",
                interval: 'Нормальный'
            });
            setShowResult({showNegative: false, showNormal: true, showPositive: false});
            setTextColor(colorNormal);

        } else if (calculatedResult >= 80 ) {
            setTextAlert ({
                alert: "Выделение мочи превышает введенную жидкость. Это может означать потерю воды. Возможно, необходимо пить больше воды и проконсультироваться с врачом.",
                interval: 'Положительный'
            });
            setShowResult({showNegative: false, showNormal: false, showPositive: true});
            setTextColor(colorPositive);
        }else {
            setShowResult({showNegative: false, showNormal: true, showPositive: false});
        }
    }, [data]);

  return (
    <TouchableOpacity activeOpacity={.7} className="mb-4 flex-1" onPress={() => setShowModal(true)}>
        <View className="flex-row flex-wrap justify-between items-center">
            <View className="flex-row items-center">
                {/* <MaterialCommunityIcons name="chat-question-outline" size={11} color="black" /> */}
                <View className="w-[20x] h-[20px]">
                    <LottieView
                        // ref={animationRef}
                        source={require("../../../assets/question-mark.json")}
                        style={{width: 20, height: 20}}
                        autoPlay
                        />
                </View>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">Водный баланс</Text>
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
            <View style={{width: windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-[#ffff] px-5 py-11 items-start">
                <TouchableOpacity onPress={() => setShowModal(false)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <View className="mt-2 mx-auto">
                   <Text style={{fontFamily:'geometria-bold'}}>Формула расчета водного баланса:</Text>
                   <View className="flex-row items-center justify-center py-5">
                        <Text style={{fontFamily:'geometria-regular'}} className="mr-1">ВБ =</Text>
                        <View className="">
                            <Text className="border-b text-center" style={{fontFamily:'geometria-regular'}}>Выделенная моча</Text>
                            <Text className="text-center" style={{fontFamily:'geometria-regular'}}>Введенная жидкость</Text>
                        </View>
                        <Text className="ml-1" style={{fontFamily:'geometria-regular'}}>× 100%</Text> 
                   </View>
                </View>
                <Text style={{fontFamily:'geometria-regular'}} className="mb-2">
                    Норма диуреза составляет 75-80% от количества введенной жидкости.
                </Text>
                <View className="my-2 border-l-4 pl-2" style={{borderColor:colorNegative}}>
                    <Text style={{fontFamily:'geometria-bold'}}>
                        Отрицательный (&lt;75%): Диапазон показывает, что объем мочеиспускания составляет менее 75% от объема выпитой жидкости. 
                    </Text>
                </View>
                <View className="my-2 border-l-4 pl-2" style={{borderColor:colorNormal}}>
                    <Text style={{fontFamily:'geometria-bold'}}>
                        Нормальный (75-80%): Это оптимальное соотношение, при котором объем мочи составляет 75-80% от объема выпитой жидкости. Это состояние указывает на здоровый водный баланс. 
                    </Text>
                </View>
                <View className="my-2 border-l-4 pl-2" style={{borderColor:colorPositive}}>
                    <Text style={{fontFamily:'geometria-bold'}}>
                        Положительный (80-100%): Этот диапазон показывает, что объем мочи составляет 80-100% от объема выпитой жидкости. Повышенный диурез, организм выделяет больше жидкости, чем обычно.
                    </Text>
                </View>
            </View>
        </Modal>
    </TouchableOpacity>
  );
};

export default FluidIntakeChart;
