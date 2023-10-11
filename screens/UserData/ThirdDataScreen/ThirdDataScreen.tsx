import { View, Text, TextInput, TouchableOpacity } from "react-native";
import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { Controller, useForm } from "react-hook-form";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { thirdDataScreen } from "../../../store/slices/createUserSlice";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import { useState } from "react";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isCounUrine, setIsCountUrine] = useState<string>('');
    const dispatch = useAppDispatch();

    const { control, handleSubmit, formState: { errors}, setValue, watch} = useForm({
        defaultValues: {
            amount: '',
            interval: '',
            useAtNight: '',
            urineMeasure: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении
    console.log(inputsValue);
    
    const onSubmit = (data:any) => {
    //    console.log(data);
       dispatch(thirdDataScreen(data))
       navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
    }

    const onSelectSexPress = (isCount:string) => {
        setIsCountUrine(isCount);
        setValue('urineMeasure', isCount); // записываем значение пола из попапа
        setOpenModal(!openModal);
    }

  return (
    <WelcomeLayout index={3} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">
            {/* <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        inputMode="numeric"
                        placeholder="Количество катетеризаций"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="amount"
            />
            {errors.amount && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View> */}

            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        inputMode="numeric"
                        placeholder="Интервалы"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="interval"
            />
            {errors.interval && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        inputMode="text"
                        placeholder="Использование на ночь"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="useAtNight"
            />
            {errors.useAtNight && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            {/* попап выбор ИЗМЕРЕНИ МОЧИ */}
            <>
            <TouchableOpacity onPress={() => setOpenModal(!openModal)} className="w-full text-center mb-10 border-b border-main-blue pb-[10px] items-center">
                <Text style={{fontFamily:'geometria-regular'}} className={`${inputsValue.urineMeasure ? 'text-xs absolute left-0 -top-5' : 'text-lg leading-[22px]'} opacity-60`}>Измерение кол-ва мочи*</Text>
                {inputsValue.urineMeasure && <Text style={{fontFamily:'geometria-regular'}} className="text-lg leading-[22px]">{isCounUrine}</Text>}
            </TouchableOpacity>
                <ModalSelect
                    title="Измерение кол-ва мочи"
                    options={['Да', 'Нет']}
                    key={'CountUrine'}
                    onItemPress={onSelectSexPress}
                    openModal={openModal}
                    setOpenModal={() => setOpenModal(!openModal)}
                />
            </>
            {/* ================ */}
        </View>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;
