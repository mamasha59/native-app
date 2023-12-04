import { View, Text, Pressable, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";

import WelcomeLayout from "../../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../../UserData";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { changeField } from "../../../../store/slices/createUserSlice";
import { changeIsExist } from "../../../../store/slices/appStateSlicer";

interface iThirdOptionalScreen extends NavigationPropsWelcome<'ThirdOptionalScreen'>{}

const ThirdOptionalScreen = ({navigation}:iThirdOptionalScreen) => {
    const userData = useAppSelector(state => state.user);
    const [ageNew, setAgeNew] = useState(userData.age?.toString());
    const [volumeNew, setVolumeNew] = useState(userData.volume?.toString());
    const dispatch = useAppDispatch();

    const cnahgeInformation = (where:string) => {
        if (where === 'sex'){} navigation.navigate('FirstDataScreen', { cameFrom: 'ThirdOptionalScreen-sex' });
        if (where === 'catheterType') navigation.navigate('SecondDataScreen', { cameFrom: 'ThirdOptionalScreen-catheterType' });
        if (where === 'catheterSize') navigation.navigate('SecondDataScreen', { cameFrom: 'ThirdOptionalScreen-catheterSize' });
    }

    const inputAgeNewChange = (value:string) => { // инпут изменение возраста
        dispatch(changeField({field:'age', value: value}))
        setAgeNew(value);
    }
    const inputVolumeNewChange = (volume:string) => { // инпут изменение обьема мочевого пузыря
        dispatch(changeField({field:'volume', value:volume}))
        setVolumeNew(volume);
    }

    const onSubmit = async () => {
        dispatch(changeIsExist(true));
        navigation.replace('MainScreen');
    }
    
  return (
    <WelcomeLayout title="Настройки профиля" buttonTitle="Сохранить изменения" handleProceed={onSubmit}>
        <View className="items-center">

            <TouchableOpacity onPress={() => cnahgeInformation('sex')} className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
                <Text style={{fontFamily:'geometria-regular',}} className="text-xs absolute left-0 -top-5 opacity-60">
                    Ваш пол*
                </Text>
                <Text style={{fontFamily:'geometria-bold',}} className="text-lg w-full text-center">
                    {userData.sex}
                </Text>
            </TouchableOpacity>

            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
                <TextInput
                        style={{fontFamily:'geometria-bold'}}
                        inputMode="numeric"
                        placeholder={'Ваш возраст'}
                        className="text-lg w-full text-center text-black leading-[22px]"
                        maxLength={3}
                        onChangeText={inputAgeNewChange}
                        value={ageNew}
                    />
                <Text style={{fontFamily:'geometria-regular',}} className="text-xs absolute left-0 -top-5 opacity-60">
                    Ваш возраст
                </Text>
            </View>
            <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
                <TextInput
                        style={{fontFamily:'geometria-bold'}}
                        inputMode="numeric"
                        placeholder={'Обьем мочевого пузыря'}
                        className="text-lg w-full text-center text-black leading-[22px]"
                        maxLength={3}
                        onChangeText={inputVolumeNewChange}
                        value={volumeNew}
                    />
                <Text style={{fontFamily:'geometria-regular',}} className="text-xs absolute left-0 -top-5 opacity-60">
                    Обьем мочевого пузыря
                </Text>
            </View>

            <TouchableOpacity onPress={() => cnahgeInformation('catheterType')} className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
                <Text style={{fontFamily:'geometria-regular',}} className="text-xs absolute left-0 -top-5 opacity-60">
                Тип катетера
                </Text>
                <Text style={{fontFamily:'geometria-bold',}} className="text-lg w-full text-center">
                    {userData.catheterType}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => cnahgeInformation('catheterSize')} className="w-full border-b border-main-blue pb-[10px] items-center relative mb-10">
                <Text style={{fontFamily:'geometria-regular',}} className="text-xs absolute left-0 -top-5 opacity-60">
                Размер катетера
                </Text>
                <Text style={{fontFamily:'geometria-bold',}} className="text-lg w-full text-center">
                    {userData.catheterSize} Ch/Fr
                </Text>
            </TouchableOpacity>

            <Pressable>
                <Text className="text-main-blue opacity-50 text-xs font-normal">Добавить катетер</Text>
            </Pressable>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdOptionalScreen;
