import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { changeIsExist } from "../../../store/slices/appStateSlicer";
import { setInterval } from "../../../store/slices/timerStatesSlice";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import SetTimeInterval from "../../../components/SetTimeInterval/SetTimeInterval";


interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const [openModalUseAtNight, setOpenModalUseAtNight] = useState<boolean>(false);         // состояние попапа использование на ночь
    const [openModalSelectCatheter, setOpenModalSelectCatheter] = useState<boolean>(false); // состояние попапа Тип катетора
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);        // состояние попапа выбора интервала

    const [newInterval, setNewInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 3,
        selectedIndexMinutes: 0,
    })
    const dispatch = useAppDispatch();
    const { handleSubmit, setValue, watch, getValues} = useForm({
        defaultValues: {
            interval: 0,
            useAtNight: 'Нелатон',
            urineMeasure: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении
    const values = getValues();
    
    useEffect(() => {
        let convert;
        convert = (newInterval.selectedIndexHour + 1) + '.' + newInterval.selectedIndexMinutes;
        const minutesHours = convert.split('.');  // из 4.30 - в 4 часа 30 минут, разделяем по точке
        const hours = +minutesHours[0];   // часы
        const minutes = +minutesHours[1] || 0; // минуты
        const initialTime = hours * 3600 + minutes * 60; // складываем часы и минуты в полное время в миллисекундах
        setValue('interval', initialTime);        
    }, [newInterval.selectedIndexHour, newInterval.selectedIndexMinutes]);

    const onSelectUrineMeasure = (isCount:string) => { // при выбора из попапа Измерение мочи на ночь
        setValue('urineMeasure', isCount); // записываем значение пола из попапа
        setOpenModalUseAtNight((prevValue) => !prevValue);
    }

    const onSelectCathetor = (catheterType:string) => { // функция при выборе Катетора Использование на ночь
        setValue('useAtNight', catheterType); // записываем значение пола из попапа
        setOpenModalSelectCatheter((prevValue) => !prevValue);
    }
    
    const onSubmit = (data:any) => {
        dispatch(setInterval(values.interval));
        dispatch(changeIsExist(true));
        navigation.navigate('MainScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
    }

  return (
    <WelcomeLayout title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)} scrollable={false}>
        <>
        <ButtonSelect
            inputValue={`${newInterval.selectedIndexHour + 1} ч. ${newInterval.selectedIndexMinutes} мин.`}
            openModal={isDatePickerVisible}
            placeholder={'Интервалы'}
            setOpenModal={() => setDatePickerVisibility(!isDatePickerVisible)}
            key={'Интервалы'}
        />
        <View className={`-mt-10 flex-row justify-center ${!isDatePickerVisible && 'hidden'}`} key={'ThirDataScreen'}>
            <SetTimeInterval interval={newInterval} setInterval={setNewInterval}/>
        </View>
        </>
        <>{/* попап выбор ИСПОЛЬЗОВАНИЕ НА НОЧЬ */}
        <ButtonSelect
            inputValue={inputsValue.useAtNight}
            openModal={openModalSelectCatheter}
            placeholder={'Использование на ночь'}
            setOpenModal={() => setOpenModalSelectCatheter(!openModalSelectCatheter)}
            key={'Использование на ночь'}
            onPressIn={() => setDatePickerVisibility(false)}
            />
        <ModalSelect
            onItemPress={onSelectCathetor}
            openModal={openModalSelectCatheter}
            options={['Нелатон']}
            setOpenModal={() => setOpenModalSelectCatheter(!openModalSelectCatheter)}
            title={'Использование на ночь'}/>
        </>
        <>{/* попап выбор ИЗМЕРЕНИ МОЧИ */}
        <ButtonSelect
            inputValue={inputsValue.urineMeasure}
            openModal={openModalUseAtNight}
            placeholder={'Измерение кол-ва мочи*'}
            setOpenModal={() => setOpenModalUseAtNight(!openModalUseAtNight)}
            key={'Измерение кол-ва мочи*'}
            onPressIn={() => setDatePickerVisibility(false)}
            />
        <ModalSelect
            onItemPress={onSelectUrineMeasure}
            openModal={openModalUseAtNight}
            options={['Да', 'Нет']}
            setOpenModal={() => setOpenModalUseAtNight(!openModalUseAtNight)}
            title={'Измерение кол-ва мочи*'}/>
        </>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;