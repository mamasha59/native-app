import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";
import { useRef, RefObject, useState } from "react";
import Modal from "react-native-modal";

import { ClosePopup } from "../../../../assets/images/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import SetTimeInterval from "../../../../components/SetTimeInterval/SetTimeInterval";
import ChangeInterval from "./ChangeInterval/ChangeInterval";
import { LinearGradient } from "expo-linear-gradient";
import ProfileSelect from "./ProfileSelect/ProfileSelect";
import { setInterval } from "../../../../store/slices/timerStatesSlice";
import { useFormatInterval } from "../../../../hooks/useFormatInterval";
import { Option } from "../../../../types";
import { setWhetherCountUrine } from "../../../../store/slices/appStateSlicer";
import NightModeSelect from "./NightModeSelect/NightModeSelect";

const windowWidth = Dimensions.get('window').width;

const ProfileSettings = () => { // TODO clean the code
    const [showModalSetInterval, setShowModalSetInterval] = useState(false);
    const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 3,
        selectedIndexMinutes: 0,
    })
    const dropDownCountUrine:RefObject<IDropdownRef> = useRef(null);

    const settings = useAppSelector((state) => state.appStateSlice); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const interval = useAppSelector((state) => state.timerStates.interval); // берем интервал из стейта (начального экрана)
    const newIntervalText = useFormatInterval({intervalInSeconds: interval}); // хук форматриования интервала, из миллисекунд в строку типа - 4 часа 30 минут
    
    const dispatch = useAppDispatch();

    const handleIsCountUrine = (value:Option) => { // функция при выборе селекта Измерение кол-ва мочи
        dispatch(setWhetherCountUrine({value: value.value, title: value.title}));
        dropDownCountUrine.current && dropDownCountUrine.current.close();
    }

    const handleOpenModalChangeInterval = () => { // при клике на Выбрать новый интервал - открываем попап для выбора нового интервала
        setShowModalSetInterval(!showModalSetInterval);
    }
    //TODO очистить функцию ниже
    const handleChangeOptimalInterval = () => { // при подтверждении нового интервала
        let convert;
            convert = (newInterval.selectedIndexHour) + '.' + newInterval.selectedIndexMinutes; // так как числа выбираются по индексу, надо прибавить +1 к часам
            const minutesHours = convert.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
            const hours = +minutesHours[0];   // часы
            const minutes = +minutesHours[1] || 0; // минуты
            const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
            dispatch(setInterval(initialTime));

        setShowModalSetInterval(!showModalSetInterval);
    }

    const createThreeButtonAlert = () => {
        Alert.alert('Давайте уточним.', `Был интервал: ${newIntervalText}, меняем на: ${newInterval.selectedIndexHour} ч. ${newInterval.selectedIndexMinutes} мин. При следующей катетеризации интервал станет ${newInterval.selectedIndexHour} ч. ${newInterval.selectedIndexMinutes} мин. Вы уверены?`, [
            {
                text: 'Я передумал :(',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'Да, меняем!', onPress: handleChangeOptimalInterval()!},
        ]);
    }

  return (
    <>
    <Text style={{fontFamily:'geometria-regular'}} className="text-black text-xs leading-[14px] mb-[10px]">Режим катетеризации</Text>
    {/*  изменить интервал катетеризации - Оптимальный */}
    <ChangeInterval handleChangeOptimalInterval={handleOpenModalChangeInterval}/>
    <NightModeSelect/>
    {/* измерять мочю селект */} 
    <ProfileSelect 
        selectRef={dropDownCountUrine}
        confirmation={true}
        handleClickOption={handleIsCountUrine}
        title="Измерение кол-ва выделяемой мочи"
        value={settings.urineMeasure.title}
        key={"Измерение кол-ва выделяемой мочи"}
        />
    <Modal isVisible={showModalSetInterval} animationIn={'slideInUp'} animationOut={'zoomOut'} useNativeDriverForBackdrop onBackButtonPress={() => setShowModalSetInterval(false)}>
        <View style={{width:windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-[#ffff] p-10">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center">Выберите новый интервал</Text>
                <View className="flex-row justify-center items-center mb-3">
                    <SetTimeInterval visibleRest={1} interval={newInterval} setInterval={setNewInterval}/>
                </View>
                <TouchableOpacity onPress={handleOpenModalChangeInterval} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={createThreeButtonAlert} className="flex-grow-0 min-w-[141px]" activeOpacity={0.6}>
                    <LinearGradient
                        colors={['#83B759', '#609B25']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        locations={[0.0553, 0.9925]}
                        className="rounded-[43px]">
                        <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF] text-center px-6 py-3">Подтвердить новый интервал</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
    </Modal>
  </>
  );
};
export default ProfileSettings;