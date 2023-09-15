import { View, Text, TextInput } from "react-native";
import WelcomeLayout from "../../../components/WelcomeLayout/WelcomeLayout";
import { Controller, useForm } from "react-hook-form";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { secondDataScreen } from "../../../store/slices/createUserSlice";

interface iSecondDataScreen extends NavigationPropsWelcome<'SecondDataScreen'> {} // типизация navigation

const SecondDataScreen = ({navigation}:iSecondDataScreen) => {

    const { control, handleSubmit, formState: { errors}} = useForm({
        defaultValues: {
            volume: '',
            catetorType: '',
            catetorSize: '',
        }
    })
    const dispatch = useAppDispatch();

    const onSubmit = (data:any) => {
       dispatch(secondDataScreen(data));
       navigation.navigate('ThirdDataScreen'); // перенаправляем юзера на 3й скрин (интервалы, колво мочи, колво катетеризвций)
    }

  return (
    <WelcomeLayout index={2} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>

        <View className="items-center">
            <View className="mb-10 w-full border-b border-[#4babc5a4] pb-[10px] items-center relative">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{fontFamily:'geometria-regular'}}
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
                {/* {errors.volume && <Text style={{fontFamily:'geometria-regular'}} className="text-red-600 absolute -bottom-5">Заполните поле</Text>} */}
            </View>

            <View className="mb-10 w-full border-b border-[#4BAAC5] pb-[10px] items-center relative">
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={{fontFamily:'geometria-regular'}}
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
            <View className="mb-10 w-full border-b border-[#4BAAC5] pb-[10px] items-center relative">
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
