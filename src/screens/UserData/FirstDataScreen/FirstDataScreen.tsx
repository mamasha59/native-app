import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { NavigationPropsWelcome } from "../UserData";
import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setInterval } from "../../../store/slices/timerStatesSlice";
import ModalSetTime from "../../../components/ModalSetTime/ModalSetTime";
import { switchNightMode } from "../../../store/slices/appStateSlicer";
import { Option } from "../../../types";
import SleepTimeStartEnd from "../../NightMode/SleepTimeStartEnd/SleepTimeStartEnd";
import Pencil from "../../../assets/images/iconsComponent/Pencil";

interface iFirstDataScreen extends NavigationPropsWelcome<'FirstDataScreen'>{}

const FirstDataScreen = ({navigation}:iFirstDataScreen) => {
    const settings = useAppSelector(state => state.appStateSlice.nighMode.value);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);        // состояние попапа выбора интервала

    const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 4,
        selectedIndexMinutes: 0,
    })
    const dispatch = useAppDispatch();

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

    const handlePressItem = (value: Option) => {                
        dispatch(switchNightMode(
            {   
                title: value.title,
                timeStamp: new Date().toString(),
                value: !!value.value
            }
        ));
    }

    const proceedNextScreen = () => {
        navigation.navigate('SecondDataScreen');
    }

    const choose = [{title: 'Да', value: true}, {title: 'Нет', value: false}]

  return (
    <WelcomeLayout currentScreen={1} handleProceed={proceedNextScreen} buttonTitle="продолжить">
        <View className="mb-4">
            <Text className="text-[#000] text-xl text-center leading-5" style={{fontFamily:'geometria-bold'}}>Вас приветствует умный помошник Nelaton.</Text>
        </View>
        <View className="mb-4">
            <Text className="text-[#000] text-lg leading-5" style={{fontFamily:'geometria-regular'}}>
                Я буду напоминать вам о катетеризации. Пожалуйста, ответьте на несколько простых вопросов, что бы я мог настроить план катетеризаций.
            </Text>
        </View>
        <SleepTimeStartEnd showInfo={false}/>
        <View className="mb-4 flex-1">
            <Text className="text-lg mr-3" style={{fontFamily:'geometria-bold'}}>Вы катетеризируетесь ночью?</Text>
            <View className="flex-row pl-2 mt-3 mx-auto justify-between">
                {choose.map((item, index) =>
                    <TouchableOpacity key={index} className={`border border-main-blue max-w-[100px] w-full rounded-md mr-4 ${item.value === settings ? 'bg-[#bdc3c7]' : 'bg-[#fff]'}`}activeOpacity={0.6} onPress={() => handlePressItem(item)}>
                        <Text className="text-lg mr-3 text-center" style={{fontFamily:'geometria-bold'}}>{item.title}</Text>
                    </TouchableOpacity>)
                }
            </View>
        </View>
        <View className="">
            <Text className="text-lg mr-3" style={{fontFamily:'geometria-bold'}}>Укажите интервал катетеризации:</Text>
            <View className="flex-row items-center justify-center my-3">
                <Text style={{fontFamily:'geometria-regular'}}>каждые</Text>
                <TouchableOpacity onPress={handleModalSetInterval} className="border rounded-md ml-2 px-2">
                    <Text className="text-lg" style={{fontFamily:'geometria-bold'}}>{newInterval.selectedIndexHour} ч. {newInterval.selectedIndexMinutes} мин.</Text>
                </TouchableOpacity>
                <View className="w-[40px] h-[40px] items-center justify-center">
                    <Pencil/>
                </View>
            </View>
            <ModalSetTime
                newInterval={newInterval}
                setNewInterval={setNewInterval}
                close={handleModalSetInterval}
                handlePressSafe={safeNewInterval}
                setShowModalSetInterval={handleModalSetInterval}
                showModalSetInterval={isDatePickerVisible}
                key={'firstdatascreen'}
            />     
        </View>
    </WelcomeLayout>
  );
};

export default FirstDataScreen;
