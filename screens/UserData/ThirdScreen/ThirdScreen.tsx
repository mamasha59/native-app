import { View, Text, TextInput } from "react-native";
import WelcomeLayout from "../../../components/WelcomeLayout/WelcomeLayout";
import { Controller, useForm } from "react-hook-form";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { thirdDataScreen } from "../../../store/slices/createUserSlice";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const { control, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            amount: '',
            interval: '',
            useAtNight: '',
            urineMeasure: ''
        }
    })

    const dispatch = useAppDispatch();

    const onSubmit = (data:any) => {
    //    console.log(data);
       dispatch(thirdDataScreen(data))
       navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
    }

  return (
    <WelcomeLayout index={3} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">
            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
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
            </View>

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
            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
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
            {errors.urineMeasure && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>}
            </View>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;
