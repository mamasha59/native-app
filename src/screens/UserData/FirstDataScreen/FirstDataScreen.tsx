import { Animated, Text, TouchableOpacity, Vibration, View } from "react-native";
import { useRef, useState } from "react";

import { NavigationPropsWelcome } from "../UserData";
import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setInterval } from "../../../store/slices/timerStatesSlice";
import SleepTimeStartEnd from "../../NightMode/SleepTimeStartEnd/SleepTimeStartEnd";
import Pencil from "../../../assets/images/iconsComponent/Pencil";
import ModalSetInterval from "../../../components/ModalSetInterval/ModalSetInterval";
import ToggleCannulationAtNight from "../../../components/ToggleCannulationAtNight/ToggleCannulationAtNight";

interface iFirstDataScreen extends NavigationPropsWelcome<'FirstDataScreen'>{}

const FirstDataScreen = ({navigation}:iFirstDataScreen) => {
    const dispatch = useAppDispatch();
    const {timeSleepStart, timeSleepEnd} = useAppSelector(state => state.nightOnDoarding);

    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);        // состояние попапа выбора интервала
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 4,
        selectedIndexMinutes: 0,
    })

    const handleModalSetInterval = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    }

    const safeNewInterval = () => {
        const hours = newInterval.selectedIndexHour;   // часы
        const minutes = newInterval.selectedIndexMinutes; // минуты
        const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах

        dispatch(setInterval(initialTime)); // safe new interval in store  
        handleModalSetInterval();
    }

    const startShakeAnimation = () => {
        Animated.sequence([
          Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver:true }),
          Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver:true }),
          Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver:true }),
          Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver:true }),
        ]).start();
    };

    const proceedNextScreen = () => {
        if(timeSleepStart && timeSleepEnd){
            navigation.navigate('SecondDataScreen');
            Vibration.cancel();
        }else {
            Vibration.vibrate(50, true);
            startShakeAnimation();
        }
    }

  return (
    <WelcomeLayout currentScreen={1} handleProceed={proceedNextScreen} buttonTitle="продолжить">
        <Text className="text-[#000] text-xl text-center leading-5" style={{fontFamily:'geometria-bold'}}>Вас приветствует умный помошник Nelaton.</Text>
        <View className="my-4 flex-1">
            <Text className="text-[#000] text-base leading-5" style={{fontFamily:'geometria-regular'}}>
                Я буду напоминать вам о катетеризации. Пожалуйста, ответьте на несколько простых вопросов, что бы я мог настроить план катетеризаций.
            </Text>
        </View>
        <Animated.View className='flex-1' style={{ transform: [{ translateX: shakeAnimation }] }}>
            <SleepTimeStartEnd showInfo={false}/>
        </Animated.View>
        <ToggleCannulationAtNight/>
        <Text className="text-base mr-3" style={{fontFamily:'geometria-bold'}}>Укажите интервал катетеризации:</Text>
        <View className="flex-row items-center justify-center my-3">
            <Text style={{fontFamily:'geometria-regular'}}>каждые</Text>
            <TouchableOpacity onPress={handleModalSetInterval} className="border rounded-md ml-2 px-2">
                <Text className="text-lg" style={{fontFamily:'geometria-bold'}}>{newInterval.selectedIndexHour} ч. {newInterval.selectedIndexMinutes} мин.</Text>
            </TouchableOpacity>
            <View className="w-[40px] h-[40px] items-center justify-center">
                <Pencil/>
            </View>
        </View>
        <ModalSetInterval
            handleOpenModalChangeInterval={handleModalSetInterval}
            newInterval={newInterval}
            setNewInterval={setNewInterval}
            showModalSetInterval={isDatePickerVisible}
            pressSaveButoon={safeNewInterval}
            title="Выберите новый интервал"
            is24Hours={false}
            key={'firstdatascreen'}
        />
    </WelcomeLayout>
  );
};

export default FirstDataScreen;
