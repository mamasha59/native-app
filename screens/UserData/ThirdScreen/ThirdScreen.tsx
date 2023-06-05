import { View, Text, TextInput } from "react-native";
import React from "react";
import WelcomeLayout from "../../../components/WelcomeLayout/WelcomeLayout";
import { Controller, useForm } from "react-hook-form";

const ThirdDataScreen = ({navigation}) => {
    const { control, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            amount: '',
            interval: '',
            useAtNight: '',
            urineMeasure: ''
        }
    })

    const onSubmit = (data) => {
       console.log(data);
       navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
    }

  return (
    <WelcomeLayout index={3} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">
            <View className="mb-10 w-full border-b border-[#4BAAC5] pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
            {errors.amount && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>

            <View className="mb-10 w-full border-b border-[#4BAAC5] pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
            {errors.interval && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="mb-10 w-full border-b border-[#4BAAC5] pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
            {errors.useAtNight && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="mb-10 w-full border-b border-[#4BAAC5] pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        inputMode="numeric"
                        placeholder="Измерение кол-ва мочи"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="urineMeasure"
            />
            {errors.urineMeasure && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;
