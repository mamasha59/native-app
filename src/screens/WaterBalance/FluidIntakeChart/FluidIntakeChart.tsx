import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Modal from "react-native-modal";

import { useAppSelector } from "../../../store/hooks";
import WaterBalanceInterval from "../WaterBalanceInterval/WaterBalanceInterval";
import { ClosePopup } from "../../../assets/images/icons";

const windowWidth = Dimensions.get('window').width;

const FluidIntakeChart = () => {
    const data = useAppSelector(state => state.journal);
    const [result, setResult] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [showResult, setShowResult] = useState<{showNegative:boolean,showLow:boolean,showNormal:boolean,showPositive:boolean}>({
        showNegative: false,
        showLow: false,
        showNormal: false,
        showPositive: false,
    });
    const [textAlert, setTextAlert] = useState<{interval: string, alert: string}>({
        interval:'',
        alert: ''
    });

    const [textColor, setTextColor] = useState<string>('');

    const colorNegative = '#EA3737';
    const colorLow = '#f1c40f';
    const colorNormal = '#4BAAC5';
    const colorPositive = '#27ae60';

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
        setShowResult({showLow: false, showNegative: true, showNormal: false, showPositive: false});
        setTextColor(colorNegative);
    } else if (calculatedResult >= 75 && calculatedResult < 80) {
        setTextAlert ({
            alert: "Выделение мочи немного ниже нормы. Возможно, стоит немного уменьшить количество выпиваемой жидкости.",
            interval: 'Низкий'
        });
        setShowResult({showLow: true, showNegative: false, showNormal: false, showPositive: false});
        setTextColor(colorLow);
    } else if (calculatedResult >= 80 && calculatedResult <= 100) {
        setTextAlert ({alert: "Баланс воды в норме! Продолжайте в том же духе.", interval: 'Нормальный'});
        setShowResult({showLow: false, showNegative: false, showNormal: true, showPositive: false});
        setTextColor(colorNormal);
    } else if (calculatedResult > 100) {
        setTextAlert ({
            alert: "Выделение мочи превышает введенную жидкость. Это может означать потерю воды. Возможно, необходимо пить больше воды и проконсультироваться с врачом.",
            interval: 'Положительный'
        });
        setShowResult({showLow: false, showNegative: false, showNormal: false, showPositive: true});
        setTextColor(colorPositive);
    }
}, [data]);


  return (
    <View className="mb-4">
        <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">Водный баланс</Text>
            </TouchableOpacity>
            <Text style={{fontFamily:'geometria-regular', color: textColor}} className="text-sm underline">{textAlert.interval}</Text>
        </View>
        <View className="mb-3 flex-1 flex-row pt-14">
            <WaterBalanceInterval result={result} showResult={showResult.showNegative} key={'negative'} bgColor={colorNegative}/>
            <WaterBalanceInterval result={result} showResult={showResult.showLow} key={'low'} bgColor={colorLow}/>
            <WaterBalanceInterval result={result} showResult={showResult.showNormal} key={'normal'} bgColor={colorNormal}/>
            <WaterBalanceInterval result={result} showResult={showResult.showPositive} key={'positive'} bgColor={colorPositive}/>
        </View>
        <View className="flex-1">
            <Text style={{fontFamily:'geometria-regular'}}>{textAlert.alert}</Text>
        </View>

        <Modal
            isVisible={showModal}
            animationIn={'slideInUp'}
            animationOut={'zoomOut'}
            useNativeDriverForBackdrop
            onBackButtonPress={() => setShowModal(false)}>
            <View style={{width: windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-[#ffff] px-5 py-16 items-start">
                <TouchableOpacity onPress={() => setShowModal(false)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <Text style={{fontFamily:'geometria-bold'}}>
                    Норма диуреза составляет 75-80% от количества введенной жидкости.
                </Text>
                <View className="mt-2 mx-auto">
                   <Text style={{fontFamily:'geometria-bold'}}>Формула расчета водного баланса:</Text>
                   <View className="flex-row items-center justify-center py-6">
                        <Text style={{fontFamily:'geometria-regular'}} className="mr-1">ВБ =</Text>
                        <View className="">
                            <Text className="border-b text-center" style={{fontFamily:'geometria-regular'}}>Выделенная моча</Text>
                            <Text className="text-center" style={{fontFamily:'geometria-regular'}}>Введенная жидкость</Text>
                        </View>
                        <Text className="ml-1" style={{fontFamily:'geometria-regular'}}>× 100%</Text> 
                   </View>
                </View>
                <Text style={{fontFamily:'geometria-bold', color:colorNegative}} className="my-2">
                    Отрицательный баланс: менее 75%
                </Text>
                <Text style={{fontFamily:'geometria-bold', color:colorLow}} className="mb-2">
                    Низкий баланс: 75-80% 
                </Text>
                <Text style={{fontFamily:'geometria-bold', color:colorNormal}} className="mb-2">
                    Нормальный баланс: 80-100%
                </Text>
                <Text style={{fontFamily:'geometria-bold', color:colorPositive}}>
                    Положительный баланс: более 100%
                </Text>
            </View>
        </Modal>
    </View>
  );
};

export default FluidIntakeChart;
