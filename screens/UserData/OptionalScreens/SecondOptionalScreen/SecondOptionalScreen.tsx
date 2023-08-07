import { View, Text, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";

import WelcomeLayout from "../../../../components/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../../UserData";
import { useAppDispatch } from "../../../../store/hooks";

interface iSecondOptionalScreen extends NavigationPropsWelcome<'SecondOptionalScreen'>{}

const SecondOptionalScreen = ({navigation}:iSecondOptionalScreen) => {

    const { control, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            nameSurname: '',
            email: '',
            phoneNumber: '',
            urineMeasure: ''
        }
    })
    
    const onSubmit = (data:any) => {
        // console.log(data);
        navigation.navigate('ThirdOptionalScreen'); // перенаправляем юзера на 3й скрин (интервалы, колво мочи, колво катетеризвций)
     }

     const skipScreen = () => { // функция при клике на кнопку 'Изменить позже'
        navigation.navigate('ThirdOptionalScreen');
    }

  return (
    <WelcomeLayout title="Доступ к журналу мочеиспускания" buttonTitle="Сохранить изменения" handleProceed={handleSubmit(onSubmit)} skip={true} skipNextScreen={skipScreen}>
        <View className="mb-[60px]">
            <View className="w-full border-b border-[#4BAAC5] pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regullar'}}
                        inputMode="numeric"
                        placeholder="Введите имя и фамилию"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="nameSurname"
            />
            {errors.email && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>

            <View className="w-full border-b border-[#4BAAC5] pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regullar'}}
                        inputMode="email"
                        placeholder="Эл. почта"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="w-full border-b border-[#4BAAC5] pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regullar'}}
                        inputMode="tel"
                        placeholder="Номер телефона"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="phoneNumber"
            />
            {errors.phoneNumber && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>

            <Text className="text-[#4BAAC5] text-center text-lg leading-5 font-bold mb-10">Пропуск катетеризации</Text>

            <View className="w-full border-b border-[#4BAAC5] pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regullar'}}
                        inputMode="numeric"
                        placeholder="Введите имя и фамилию"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="nameSurname"
            />
            {errors.nameSurname && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="w-full border-b border-[#4BAAC5] pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regullar'}}
                        inputMode="email"
                        placeholder="Эл. почта"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="email"
            />
            {errors.email && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="w-full border-b border-[#4BAAC5] pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regullar'}}
                        inputMode="numeric"
                        placeholder="Когда уведомлять"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="nameSurname"
            />
            {errors.nameSurname && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default SecondOptionalScreen;
