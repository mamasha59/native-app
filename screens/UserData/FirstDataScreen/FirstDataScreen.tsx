import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { firstDataScreen } from "../../../store/slices/createUserSlice";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import InputData from "../../../components/InputData/InputData";

interface iUserData extends NavigationPropsWelcome<'FirstDataScreen'> {}

const FirstDataScreen = ({navigation}:iUserData) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectSex, setSelectSex] = useState<string>('');

    const { control, handleSubmit, formState: { errors }, setValue, watch, } = useForm({
        defaultValues: {
            weight: '',
            height: '',
            sex: '',
            age: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении

    const onSubmit = (data:any) => {
        if(!inputsValue.sex){
            Alert.alert('Выберите пол!');
            return;
        }
       dispatch(firstDataScreen(data)) // сетим данные в сторе редакса, формируем пользователя
       navigation.navigate('SecondDataScreen'); // перенаправляем юзера на 2й скрин (инфа про катеторы и моч. пузырь)
    }

    const onSelectSexPress = (sex:string) => {
        setSelectSex(sex);
        setValue('sex', sex); // записываем значение пола из попапа
        setOpenModal(!openModal);
    }
    
  return (
    <WelcomeLayout index={1} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">
            <InputData control={control} errors={errors.weight} inputsValue={inputsValue.weight} placeholder="Ваш вес" name={"weight"}/>
            <InputData control={control} errors={errors.height} inputsValue={inputsValue.height} placeholder="Ваш рост" name={"height"}/>
            {/* попап выбора пола */}
            <>
                <TouchableOpacity onPress={() => setOpenModal(!openModal)} className="w-full text-center mb-10 border-b border-main-blue pb-[10px] items-center">
                    <Text style={{fontFamily:'geometria-regular'}} className={`${inputsValue.sex ? 'text-xs absolute left-0 -top-5' : 'text-lg leading-[22px]'} opacity-60`}>Ваш пол*</Text>
                    {inputsValue.sex && <Text style={{fontFamily:'geometria-regular'}} className="text-lg leading-[22px]">{selectSex}</Text>}
                </TouchableOpacity>
                <ModalSelect
                    title="Выберите ваш пол"
                    options={['Женский', 'Мужской', 'Мальчик', 'Девочка']}
                    key={'SelectSex'}
                    onItemPress={onSelectSexPress}
                    openModal={openModal}
                    setOpenModal={() => setOpenModal(!openModal)}
                />
            </>
            {/* ================ */}
            <InputData control={control} errors={errors.age} inputsValue={inputsValue.age} placeholder="Ваш возраст" name={"age"}/>
        </View>
    </WelcomeLayout>
  );
};

export default FirstDataScreen;
