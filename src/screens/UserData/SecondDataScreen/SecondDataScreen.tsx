import { View, Alert } from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";

import { useAppDispatch } from "../../../store/hooks";
import { changeField, setUserData } from "../../../store/slices/createUserSlice";

import InputData from "../../../components/InputData/InputData";
import { generateEvenNumbersOfSize } from "../../../utils/const";
import { Keyboard } from "../../../utils/enums";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";

interface iSecondDataScreen extends NavigationPropsWelcome<'SecondDataScreen'> {} // типизация navigation

const SecondDataScreen = ({navigation,route}:iSecondDataScreen) => {
    const [openModalSelectCatheter, setOpenModalSelectCatheter] = useState<boolean>(false); // состояние попапа Тип катетора
    const [openModalSelectSize, setOpenModalSelectSize] = useState<boolean>(false); // состояние попапа Размер катетора

    const fromLastScreenCatheterType = route.params && route.params.cameFrom === 'ThirdOptionalScreen-catheterType';
    const fromLastScreenCatheterSize = route.params && route.params.cameFrom === 'ThirdOptionalScreen-catheterSize';

    const { control, handleSubmit, formState: { errors}, setValue, watch} = useForm({
        defaultValues: {
            volume: '',
            catheterType: 'Нелатон',
            catheterSize: '',
        },
    })
    const dispatch = useAppDispatch();
    const inputsValue = watch(); // состояние инпута при его изменении
    
    const onSelectCathetorSize = (catheterSize:string) => { // функция при выборе Размера катетора
        setValue('catheterSize', catheterSize); // записываем значение пола из попапа
        if(fromLastScreenCatheterSize){
            dispatch(changeField({field: 'catheterSize', value: catheterSize})) // меняем размер катетора
            navigation.navigate('ThirdOptionalScreen');
        }
        setOpenModalSelectSize(!openModalSelectSize);
    }
    
    const onSubmit = (data:any) => { // при нажатии кнопки продолжить
        if(!inputsValue.catheterType){
            Alert.alert('Выберите тип катетора!');
            return;
        }
       dispatch(setUserData(data));
       navigation.navigate('ThirdDataScreen'); // перенаправляем юзера на 3й скрин (интервалы, колво мочи, колво катетеризвций)
    }

  return (
    <WelcomeLayout index={2} title="Введите свои данные" showButton={fromLastScreenCatheterType || fromLastScreenCatheterSize} buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center relative">
            <View className={`flex-1 w-full ${(fromLastScreenCatheterType || fromLastScreenCatheterSize) && 'opacity-50'}`}>
                <InputData
                    canEdite={!fromLastScreenCatheterType && !fromLastScreenCatheterSize}
                    control={control}
                    errors={errors.volume}
                    inputsValue={inputsValue.volume}
                    name="volume"
                    placeholder="Обьем мочевого музыря"
                    key={'volume'}
                    inputMode={Keyboard.Numeric}
                    maxLength={3}
                    showPrompt
                    textPrompt="«общие» нормы : У женщин – 250-500 мл, У мужчин – 350-700 мл, У детей – 35-400 мл (в зависимости от возраста)"
                />
            </View>
            {/* попап выбор тип катететора */}
            <View pointerEvents={fromLastScreenCatheterSize ? 'none' : 'auto'} className={`flex-1 w-full ${fromLastScreenCatheterSize && 'opacity-50'}`}>
                <ButtonSelect
                    inputValue={inputsValue.catheterType}
                    openModal={openModalSelectCatheter}
                    placeholder={'Тип катететора*'}
                    setOpenModal={() => setOpenModalSelectCatheter(!openModalSelectCatheter)}
                    key={'Тип катететора*'}/>
            </View>
             {/* попап размер катетора */}
            <View pointerEvents={fromLastScreenCatheterType ? 'none' : 'auto'} className={`flex-1 w-full ${fromLastScreenCatheterType && 'opacity-50'}`}>
                <ButtonSelect
                    inputValue={inputsValue.catheterSize}
                    openModal={openModalSelectSize}
                    placeholder={'Размер катетера Ch/Fr'}
                    setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                    key={'Размер катетера Ch/Fr'}/>
                <ModalSelect
                    onItemPress={onSelectCathetorSize}
                    openModal={openModalSelectSize}
                    options={generateEvenNumbersOfSize()}
                    setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                    title={'Размер катетера Ch/Fr'}/>
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default SecondDataScreen;
