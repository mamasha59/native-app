import { View, Text, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { secondDataScreen } from "../../../store/slices/createUserSlice";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import InputData from "../../../components/InputData/InputData";

interface iSecondDataScreen extends NavigationPropsWelcome<'SecondDataScreen'> {} // типизация navigation

const SecondDataScreen = ({navigation}:iSecondDataScreen) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selectCatetorType, setSelectCatheterType] = useState<string>('');

    const { control, handleSubmit, formState: { errors}, setValue, watch} = useForm({
        defaultValues: {
            volume: '',
            catetorType: '',
            catetorSize: '',
        }
    })
    const dispatch = useAppDispatch();
    const inputsValue = watch(); // состояние инпута при его изменении

    const onSubmit = (data:any) => {
        if(!inputsValue.catetorType){
            Alert.alert('Выберите тип катетора!');
            return;
        }
       dispatch(secondDataScreen(data));
       navigation.navigate('ThirdDataScreen'); // перенаправляем юзера на 3й скрин (интервалы, колво мочи, колво катетеризвций)
    }

    const onSelectCathetor = (catheterType:string) => { // функция при выборе Катетора
        setSelectCatheterType(catheterType);
        setValue('catetorType', catheterType); // записываем значение пола из попапа
        setOpenModal(!openModal);
    }

  return (
    <WelcomeLayout index={2} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center relative">
            <InputData
                control={control}
                errors={errors.volume}
                inputsValue={inputsValue.volume}
                name="volume"
                placeholder="Обьем мочевого музыря"
                key={'volume'}
                showPrompt
                textPrompt="«общие» нормы : У женщин – 250-500 мл, У мужчин – 350-700 мл, У детей – 35-400 мл (в зависимости от возраста)"
            />
            {/* попап выбор тип катететора */}
            <>
                <TouchableOpacity onPress={() => setOpenModal(!openModal)} className="w-full text-center mb-10 border-b border-main-blue pb-[10px] items-center">
                    <Text style={{fontFamily:'geometria-regular'}} className={`${inputsValue.catetorType ? 'text-xs absolute left-0 -top-5' : 'text-lg leading-[22px]'} opacity-60`}>Тип катететора*</Text>
                    {inputsValue.catetorType && <Text style={{fontFamily:'geometria-regular'}} className="text-lg leading-[22px]">{selectCatetorType}</Text>}
                </TouchableOpacity>
                <ModalSelect
                    title="Тип катетера"
                    options={['Нелатон', 'Фоллея']}
                    key={'CatetorType'}
                    onItemPress={onSelectCathetor}
                    openModal={openModal}
                    setOpenModal={() => setOpenModal(!openModal)}
                />
            </>
            {/* ================ */}
            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{fontFamily:'geometria-regular'}}
                            inputMode="text"
                            placeholder="Размер катетера"
                            className="text-lg w-full text-center leading-[22px]"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="catetorSize"
                />
                {errors.catetorSize && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default SecondDataScreen;
