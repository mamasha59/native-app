import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import WheelPicker from 'react-native-wheely';

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { setUserData } from "../../../store/slices/createUserSlice";

import { catheters } from "../../../utils/const";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
//TODO сделать для катетора фолея
    const [openModalUseAtNight, setOpenModalUseAtNight] = useState<boolean>(false);         // состояние попапа использование на ночь
    const [openModalSelectCatheter, setOpenModalSelectCatheter] = useState<boolean>(false); // состояние попапа Тип катетора
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);        // состояние попапа выбора интервала

    const [selectedIndexHour, setSelectedIndexHour] = useState<number>(3); 
    const [selectedIndexMinutes, setSelectedIndexMinutes] = useState<number>(0);
    
    const dispatch = useAppDispatch();

    const { handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            interval: '',
            useAtNight: '',
            urineMeasure: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении

    useEffect(() => {
        const convert = (selectedIndexHour + 1) + '.' + selectedIndexMinutes;              
        setValue('interval', convert);        
    }, [selectedIndexHour,selectedIndexMinutes]);
    
    const onSelectUrineMeasure = (isCount:string) => { // при выбора из попапа Измерение мочи на ночь
        setValue('urineMeasure', isCount); // записываем значение пола из попапа
        setOpenModalUseAtNight((prevValue) => !prevValue);
    }

    const onSelectCathetor = (catheterType:string) => { // функция при выборе Катетора Использование на ночь
        setValue('useAtNight', catheterType); // записываем значение пола из попапа
        setOpenModalSelectCatheter((prevValue) => !prevValue);
    }
    
    const generateNumbersArray = ():string[] => { // массив строковых чисел секунд
        let numbersArray:string[] = [];
        for (let i = 0; i <= 59; i++) {
          numbersArray.push(i.toString());
        }
        return numbersArray;
      }
    const numbers = generateNumbersArray();

    const onSubmit = (data:any) => { // при нажатии кнопки Продолжить
        dispatch(setUserData(data));
        navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
     }

  return (
    <WelcomeLayout index={3} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)} scrollable={false}>
        <>{/* попап выбор Интервалы */}
        <ButtonSelect
            inputValue={'каждые '+ (selectedIndexHour + 1) + ' ч. ' + selectedIndexMinutes + ' мин.'}
            openModal={isDatePickerVisible}
            placeholder={'Интервалы'}
            setOpenModal={() => setDatePickerVisibility(!isDatePickerVisible)}
            key={'Интервалы'}
        />
        <View className={`-mt-10 flex-row justify-center ${!isDatePickerVisible && 'hidden'}`}>
            <View className="flex-row items-center">
                <WheelPicker
                    itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
                    selectedIndex={selectedIndexHour}
                    options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
                    onChange={(index) => setSelectedIndexHour(index)}
                    containerStyle={{width:55}}
                    selectedIndicatorStyle={{backgroundColor:'#4babc573'}}
                />
                <View>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-lg mx-1 text-black">ч.</Text>
                </View>
            </View>
            <View className="flex-row items-center">
                <WheelPicker
                    itemTextStyle={{fontFamily:'geometria-bold', fontSize:20}}
                    selectedIndex={selectedIndexMinutes}
                    options={numbers}
                    onChange={(index) => setSelectedIndexMinutes(index)}
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