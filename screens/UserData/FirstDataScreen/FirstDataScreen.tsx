import { View, Alert } from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { setUserData, changeField } from "../../../store/slices/createUserSlice";
import InputData from "../../../components/InputData/InputData";
import { Keyboard } from "../../../utils/enums";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";

interface iUserData extends NavigationPropsWelcome<'FirstDataScreen'> {}

const FirstDataScreen = ({navigation, route}:iUserData) => {
    const dispatch = useAppDispatch();
    const [openModalSelectSex, setOpenModalSelectSex] = useState<boolean>(false);

    const fromLastScreenSex = route.params && route.params.cameFrom === 'ThirdOptionalScreen-sex';

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            weight: '',
            height: '',
            sex: '',
            age: ''
        }
    })
    const inputsValue = watch();        // состояние инпута при его изменении

    const onSubmit = (data:any) => {
        if(!inputsValue.sex){
            Alert.alert('Выберите пол!');
            return;
        }        
       dispatch(setUserData(data))                              // сетим данные в сторе редакса, формируем пользователя
       navigation.navigate('SecondDataScreen', {cameFrom:''}); // перенаправляем юзера на 2й скрин (инфа про катеторы и моч. пузырь)
    }

    const onSelectSexPress = (sex:string) => {
        setValue('sex', sex);                               // записываем значение пола из попапа
        if(fromLastScreenSex){
            dispatch(changeField({field:"sex",value:sex}))
            navigation.navigate('ThirdOptionalScreen');
        }
        setOpenModalSelectSex(!openModalSelectSex);
    }
    
  return (
    <WelcomeLayout index={1} title="Введите свои данные" showButton={fromLastScreenSex} buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">
            <View className={`flex-1 w-full ${fromLastScreenSex && 'opacity-50'}`}>
                <InputData
                    canEdite={!fromLastScreenSex}
                    key={"weight"}
                    control={control}
                    errors={errors.weight}
                    inputsValue={inputsValue.weight}
                    placeholder="Ваш вес"
                    name={"weight"}
                    inputMode={Keyboard.Numeric}
                    maxLength={3}
                    />
            </View>
           <View className={`flex-1 w-full ${fromLastScreenSex && 'opacity-50'}`}>
                <InputData
                    canEdite={!fromLastScreenSex}
                    key={"height"}
                    control={control}
                    errors={errors.height}
                    inputsValue={inputsValue.height}
                    placeholder="Ваш рост"
                    name={"height"}
                    inputMode={Keyboard.Numeric}
                    maxLength={3}
                    />
           </View>
            <>
            <ButtonSelect inputValue={inputsValue.sex} openModal={openModalSelectSex} placeholder={'Ваш пол*'} setOpenModal={setOpenModalSelectSex} key={'Ваш пол*'}/>
            <ModalSelect onItemPress={onSelectSexPress} openModal={openModalSelectSex} options={['Женский', 'Мужской', 'Мальчик', 'Девочка']} setOpenModal={setOpenModalSelectSex} title={'Ваш пол*'}/>
            </>
            <View className={`flex-1 w-full ${fromLastScreenSex && 'opacity-50'}`}>
                <InputData
                    canEdite={!fromLastScreenSex}
                    control={control}
                    errors={errors.age}
                    inputsValue={inputsValue.age}
                    placeholder="Ваш возраст"
                    name={"age"}
                    inputMode={Keyboard.Numeric}
                    maxLength={3}
                    key={"age"}
                    />
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default FirstDataScreen;
