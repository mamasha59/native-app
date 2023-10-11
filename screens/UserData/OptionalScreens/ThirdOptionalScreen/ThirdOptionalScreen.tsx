import { View, Text, TextInput, Pressable } from "react-native";
import WelcomeLayout from "../../../../Layouts/WelcomeLayout/WelcomeLayout";
import { Controller, useForm } from "react-hook-form";
import { NavigationPropsWelcome } from "../../UserData";

interface iThirdOptionalScreen extends NavigationPropsWelcome<'ThirdOptionalScreen'>{}

const ThirdOptionalScreen = ({navigation}:iThirdOptionalScreen) => {

    const { control, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            sex: '',
            age: '',
            volume: '',
            catetorType: '',
            catetorSize: '',
        }
    })

    const onSubmit = (data:any) => {
        console.log(data);
        navigation.navigate('MainScreen'); // перенаправляем юзера на слайдер
     }

  return (
    <WelcomeLayout title="Настройки профиля" buttonTitle="Сохранить изменения" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">
            <View className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
            {errors.sex && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>

            <View className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
            {errors.age && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        inputMode="numeric"
                        placeholder="Обьем мочевого музыря"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="volume"
            />
            {errors.volume && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>

            <View className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        inputMode="text"
                        placeholder="Тип катетера"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="catetorType"
            />
                {errors.catetorType && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <View className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        inputMode="numeric"
                        placeholder="Размер катетера"
                        className="text-lg w-full text-center leading-[22px]"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="catetorSize"
            />
            {errors.catetorSize && <Text className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
            <Pressable>
                <Text className="text-main-blue opacity-50 text-xs font-normal">Добавить катетер</Text>
            </Pressable>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdOptionalScreen;
