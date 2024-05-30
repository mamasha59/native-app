import { useState, useEffect } from "react";
import { View } from "react-native";

import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { setInterval } from "../../../store/slices/timerStatesSlice";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import SetTimeInterval from "../../../components/SetTimeInterval/SetTimeInterval";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);        // состояние попапа выбора интервала

    const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 4,
        selectedIndexMinutes: 0,
    })
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        let convert;
        convert = (newInterval.selectedIndexHour) + '.' + newInterval.selectedIndexMinutes;
        const minutesHours = convert.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
        const hours = +minutesHours[0];   // часы
        const minutes = +minutesHours[1] || 0; // минуты
        const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
        dispatch(setInterval(initialTime));     
    }, [newInterval.selectedIndexHour, newInterval.selectedIndexMinutes]);
    
    const onSubmit = () => {
        navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
    }

  return (
    <WelcomeLayout title="Введите свои данные" buttonTitle="Продолжить" handleProceed={onSubmit} scrollable={false}>
        <ButtonSelect
            inputValue={`${newInterval.selectedIndexHour} ч. ${newInterval.selectedIndexMinutes} мин.`}
            openModal={isDatePickerVisible}
            placeholder={'Интервалы'}
            setOpenModal={() => setDatePickerVisibility(!isDatePickerVisible)}
            key={'Интервалы'}
        />
        <View className={`-mt-10 flex-row justify-center ${!isDatePickerVisible && 'hidden'}`} key={'ThirDataScreen'}>
            <SetTimeInterval interval={newInterval} setInterval={setNewInterval}/>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;