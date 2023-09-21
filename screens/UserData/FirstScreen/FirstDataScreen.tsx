import { View, Text, TextInput } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";

import WelcomeLayout from "../../../components/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { firstDataScreen } from "../../../store/slices/createUserSlice";

interface iUserData extends NavigationPropsWelcome<'FirstDataScreen'> {}

const FirstDataScreen = ({navigation}:iUserData) => {
    const { control, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            weight: '',
            height: '',
            sex: '',
            age: ''
        }
    })
    const dispatch = useAppDispatch();

    const onSubmit = (data:any) => {
       //console.log(data);
       dispatch(firstDataScreen(data)) // сетим данные в сторе редакса, формируем пользователя
       navigation.navigate('SecondDataScreen'); // перенаправляем юзера на 2й скрин (инфа про катеторы и моч. пузырь)
    }

  return (
    <WelcomeLayout index={1} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">

            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{fontFamily:'geometria-regular'}}
                            inputMode="numeric"
                            placeholder="Ваш вес"
                            className="text-lg w-full text-center leading-[22px]"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="weight"
                />
                {errors.weight && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
             </View>

            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{fontFamily:'geometria-regular'}}
                            inputMode="numeric"
                            placeholder="Ваш рост"
                            className="text-lg w-full text-center leading-[22px]"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="height"
                />
                {errors.height && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
             </View>
            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{fontFamily:'geometria-regular'}}
                            inputMode="text"
                            placeholder="Ваш пол"
                            className="text-lg w-full text-center leading-[22px]"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="sex"
                />
                {errors.sex && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
             </View>
            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{fontFamily:'geometria-regular'}}
                            inputMode="numeric"
                            placeholder="Ваш возраст"
                            className="text-lg w-full text-center leading-[22px]"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="age"
                />
                {errors.age && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
             </View>
        </View>
    </WelcomeLayout>
  );
};

export default FirstDataScreen;
