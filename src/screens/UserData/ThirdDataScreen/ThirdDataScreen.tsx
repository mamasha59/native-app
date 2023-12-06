import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import WheelPicker from 'react-native-wheely';

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUserData } from "../../../store/slices/createUserSlice";

import { catheters } from "../../../utils/const";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
// TODO разбить по компонентам
// TODO сделать модалку для интервалов
    const [openModalUseAtNight, setOpenModalUseAtNight] = useState<boolean>(false);         // состояние попапа использование на ночь
    const [openModalSelectCatheter, setOpenModalSelectCatheter] = useState<boolean>(false); // состояние попапа Тип катетора
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);        // состояние попапа выбора интервала

    const [interval, setInterval] = useState<{selectedIndexDays:number,selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexDays: 0,
        selectedIndexHour: 3,
        selectedIndexMinutes: 0,
    })

    const dispatch = useAppDispatch();
    const wichСatheter = useAppSelector(state => state.user.catheterType);
    
    const isFolley = wichСatheter === 'Фоллея';
    const textDaysFolley = isFolley ? `каждые ${interval.selectedIndexDays + 1} д.` : '';

    const { handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            interval: '',
            useAtNight: '',
            urineMeasure: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении

    useEffect(() => {
        let convert;
        if(isFolley) {
            convert = (interval.selectedIndexDays + 1) + '.' + (isFolley ? interval.selectedIndexHour : interval.selectedIndexHour + 1) + '.' + interval.selectedIndexMinutes;
        } else {
            convert = (interval.selectedIndexHour + 1) + '.' + interval.selectedIndexMinutes;
        }
        setValue('interval', convert);        
    }, [interval.selectedIndexHour, interval.selectedIndexMinutes, interval.selectedIndexDays]);

    const onSelectUrineMeasure = (isCount:string) => { // при выбора из попапа Измерение мочи на ночь
        setValue('urineMeasure', isCount); // записываем значение пола из попапа
        setOpenModalUseAtNight((prevValue) => !prevValue);
    }

    const onSelectCathetor = (catheterType:string) => { // функция при выборе Катетора Использование на ночь
        setValue('useAtNight', catheterType); // записываем значение пола из попапа
        setOpenModalSelectCatheter((prevValue) => !prevValue);
    }
    
    const generateSecondsArray = ():string[] => {
        let numbersArray:string[] = [];
        for (let i = 0; i <= 59; i++) {
          numbersArray.push(i.toString());
        }
        return numbersArray;
    }
    const numbers = generateSecondsArray(); // массив строковых чисел секунд ['1','2'...]

    const generateDaysArray = ():string[] => { 
        let numbersArray:string[] = [];
        for (let i = 1; i <= 31; i++) {
          numbersArray.push(i.toString());
        }
        return numbersArray;
    }
    const days = generateDaysArray();// массив строковых чисел дней ['1','2'...]

    const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] // массив часов
    if (isFolley) hours.unshift('0');

    const onSubmit = (data:any) => {
        dispatch(setUserData(data));
        navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
    }

  return (
    <WelcomeLayout index={3} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)} scrollable={false}>
        <>
        <ButtonSelect
            inputValue={`${textDaysFolley} ${isFolley ? interval.selectedIndexHour : interval.selectedIndexHour + 1} ч. ${interval.selectedIndexMinutes} мин.`}
            openModal={isDatePickerVisible}
            placeholder={'Интервалы'}
            setOpenModal={() => setDatePickerVisibility(!isDatePickerVisible)}
            key={'Интервалы'}
        />
        <View className={`-mt-10 flex-row justify-center ${!isDatePickerVisible && 'hidden'}`}>
            {/* ДНИ */}
            {textDaysFolley && 
            <View className="flex-row items-center"> 
                <WheelPicker
                    itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
                    selectedIndex={interval.selectedIndexDays!}
                    options={days}
                    onChange={(index) => 
                        setInterval({
                            selectedIndexDays: index,
                            selectedIndexHour: interval.selectedIndexHour,
                            selectedIndexMinutes:interval.selectedIndexMinutes})
                        }
                    containerStyle={{width:60}}
                    selectedIndicatorStyle={{backgroundColor:'#4babc573'}}
                />
                <View>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">д.</Text>
                </View>
            </View>
            }
            {/* ЧАСЫ */}
            <View className="flex-row items-center">
                <WheelPicker
                    itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
                    selectedIndex={interval.selectedIndexHour!}
                    options={hours}
                    onChange={(index) =>
                        setInterval({
                            selectedIndexHour: index,
                            selectedIndexDays:interval.selectedIndexDays,
                            selectedIndexMinutes:interval.selectedIndexMinutes})
                        }
                    containerStyle={{width:55}}
                    selectedIndicatorStyle={{backgroundColor:'#4babc573'}}
                />
                <View>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">ч.</Text>
                </View>
            </View>
            {/* МИНУТЫ */}
            <View className="flex-row items-center">
                <WheelPicker
                    itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
                    selectedIndex={interval.selectedIndexMinutes!}
                    options={numbers}
                    onChange={(index) =>
                        setInterval({
                            selectedIndexMinutes: index,
                            selectedIndexDays:interval.selectedIndexDays,
                            selectedIndexHour:interval.selectedIndexHour})
                        }
                    containerStyle={{width:65}}
                    selectedIndicatorStyle={{backgroundColor:'#4babc573'}} decelerationRate={"normal"}
                />
                <View>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">мин.</Text>
                </View>
            </View>
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
            options={catheters}
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