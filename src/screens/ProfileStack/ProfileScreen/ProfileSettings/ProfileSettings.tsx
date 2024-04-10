import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";
import { useRef, RefObject, useState } from "react";
import Modal from "react-native-modal";

import { ClosePopup } from "../../../../assets/images/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setUserData } from "../../../../store/slices/createUserSlice";
import SetTimeInterval from "../../../../components/SetTimeInterval/SetTimeInterval";
import ChangeInterval from "./ChangeInterval/ChangeInterval";
import { LinearGradient } from "expo-linear-gradient";
import ProfileSelect from "./ProfileSelect/ProfileSelect";

const windowWidth = Dimensions.get('window').width;

const ProfileSettings = () => {
    const [showModalSetInterval, setShowModalSetInterval] = useState(false);
    const [interval, setInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 3,
        selectedIndexMinutes: 0,
    })
    const dropDownCountUrine:RefObject<IDropdownRef> = useRef(null);

    const urineMesure = useAppSelector((state) => state.user.urineMeasure); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    
    const dispatch = useAppDispatch();

    const handleIsCountUrine = (value:string) => { // функция при выборе селекта Измерение кол-ва мочи
        dispatch(setUserData({urineMeasure:value}));
        dropDownCountUrine.current && dropDownCountUrine.current.close();
    }
    const handleUseAtNight = (value:string) => { // функция при выборе селекта Катетеризация в ночное время
        console.log(value);
    }

    const handleChangeInterval = () => { // при клике на Выбрать новый интервал - открываем попап для выбора нового интервала
        setShowModalSetInterval(!showModalSetInterval);
    }
    const handleConfirmNewInterval = () => { // при подтверждении нового интервала
        let convert;
        convert = (interval.selectedIndexHour + 1) + '.' + interval.selectedIndexMinutes; // так как числа выбираются по индексу, надо прибавить +1 к часам
        const minutesHours = convert.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
        const hours = +minutesHours[0];   // часы
        const minutes = +minutesHours[1] || 0; // минуты
        const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах

        dispatch(setUserData({interval:initialTime.toString()}));
        setShowModalSetInterval(!showModalSetInterval);
    }
  return (
    <>
    <Text style={{fontFamily:'geometria-regular'}} className="text-black text-xs leading-[14px] mb-[10px]">Режим катетеризации</Text>
    {/*  изменить время катетеризации   */}
    <ChangeInterval handleChangeInterval={handleChangeInterval}/>
    {/*  катетеризация в ночное время  */}
    <ProfileSelect
        confirmation={false}
        handleClickOption={handleUseAtNight}
        title="Катетеризация в ночное время"
        value={'-'}
        key={"Катетеризация в ночное время"}
        />
    {/* измерять мочю селект */} 
    <ProfileSelect 
        selectRef={dropDownCountUrine}
        confirmation={true}
        handleClickOption={handleIsCountUrine}
        title="Измерение кол-ва выделяемой мочи"
        value={urineMesure}
        key={"Измерение кол-ва выделяемой мочи"}
        />
    <Modal isVisible={showModalSetInterval} animationIn={'slideInUp'} animationOut={'zoomOut'} useNativeDriverForBackdrop onBackButtonPress={() => setShowModalSetInterval(false)}>
        <View style={{width:windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-[#ffff] p-10">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center">Выберите новый интервал</Text>
                <View className="flex-row justify-center items-center mb-3">
                    <SetTimeInterval visibleRest={1} interval={interval} setInterval={setInterval}/>
                </View>
                <TouchableOpacity onPress={handleChangeInterval} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmNewInterval} className="flex-grow-0 min-w-[141px]" activeOpacity={0.6}>
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