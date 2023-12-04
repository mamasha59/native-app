import { View, Text, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";

import WelcomeLayout from "../../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../../UserData";
import InputData from "../../../../components/InputData/InputData";
import { Keyboard } from "../../../../utils/enums";

interface iSecondOptionalScreen extends NavigationPropsWelcome<'SecondOptionalScreen'>{}
// TODO сделать инпуты для Пропуск катетеризации
const SecondOptionalScreen = ({navigation}:iSecondOptionalScreen) => {

    const { control, handleSubmit, formState: { errors}, watch} = useForm({
        defaultValues: {
            nameSurname: '',
            email: '',
            phoneNumber: '',
            urineMeasure: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении

    const onSubmit = (data:any) => {
        // console.log(data);
        navigation.navigate('ThirdOptionalScreen'); // перенаправляем юзера на 3й скрин (интервалы, колво мочи, колво катетеризвций)
     }

     const skipScreen = () => { // функция при клике на кнопку 'Изменить позже'
        navigation.navigate('ThirdOptionalScreen');
    }

  return (
    <WelcomeLayout title="Доступ к журналу мочеиспускания" buttonTitle="Сохранить изменения" handleProceed={handleSubmit(onSubmit)} skip={true} skipNextScreen={skipScreen}>
        <>
            <InputData
                isRequired={false}
                control={control}
                errors={errors.nameSurname}
                inputsValue={inputsValue.nameSurname}
                placeholder="Введите имя и фамилию"
                name={"nameSurname"}
                inputMode={Keyboard.String}
                maxLength={30}
                showPrompt
                textPrompt="Этот человек будет иметь доступ к вашему журналу"
                />
            <InputData
                isRequired={false}
                control={control}
                errors={errors.email}
                inputsValue={inputsValue.email}
                placeholder="Эл. почта"
                name={"email"}
                inputMode={Keyboard.String}
                maxLength={30}
                />
            <InputData
                isRequired={false}
                control={control}
                errors={errors.phoneNumber}
                inputsValue={inputsValue.phoneNumber}
                placeholder="Номер телефона"
                name={"phoneNumber"}
                inputMode={Keyboard.Numeric}
                maxLength={11}
                />

            <Text className="text-main-blue text-center text-lg leading-5 font-bold mb-10">Пропуск катетеризации</Text>
            <InputData
                isRequired={false}
                control={control}
                errors={errors.nameSurname}
                inputsValue={inputsValue.nameSurname}
                placeholder="Введите имя и фамилию"
                name={"nameSurname"}
                inputMode={Keyboard.Numeric}
                maxLength={11}
                />
            <InputData
                isRequired={false}
                control={control}
                errors={errors.email}
                inputsValue={inputsValue.email}
                placeholder="Эл. почта"
                name={"email"}
                inputMode={Keyboard.String}
                maxLength={30}
                />
            <InputData
                isRequired={false}
                control={control}
                errors={errors.email}
                inputsValue={inputsValue.email}
                placeholder="Когда уведомлять"
                name={"email"}
                inputMode={Keyboard.String}
                maxLength={30}
                />
        </>
    </WelcomeLayout>
  );
};

export default SecondOptionalScreen;
