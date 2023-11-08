import { Text, ScrollView, TouchableOpacity, View } from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";

import MainLayout from "../../../Layouts/MainLayout/MainLayout";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import InputChangeProfile from "./InputChangeProfile/InputChangeProfile";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import { catheters, generateEvenNumbersOfSize } from "../../../utils/const";
import { NavigationPropsProfileStack } from "..";
import { setUserData } from "../../../store/slices/createUserSlice";

interface iChangeProfileScreen extends NavigationPropsProfileStack<'ChangeProfileScreen'>{}

const ChangeProfileScreen = ({navigation}:iChangeProfileScreen) => {
    const userData = useAppSelector(user => user.user);
    const  dispatch = useAppDispatch();
    
    const [openModalSelectCatheter, setOpenModalSelectCatheter] = useState<boolean>(false); // состояние попапа Тип катетора
    const [openModalSelectSize, setOpenModalSelectSize] = useState<boolean>(false); // состояние попапа Размер катетора

    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            weight: userData.weight,
            height: userData.height,
            age: userData.age,
            volume: userData.volume,
            catheterType: userData.catheterType,
            catheterSize: userData.catheterSize,
        }
    })
    const values = getValues();

    const onSubmitSave = (data:any) => {
        console.log(data);
        dispatch(setUserData(data))
        navigation.push('ProfileScreen');
    }

    const onSelectCathetor = (catheterType:string) => { // функция при выборе Катетора
        setValue('catheterType', catheterType); // записываем значение пола из попапа
        setOpenModalSelectCatheter(!openModalSelectCatheter);
    }

    const onSelectCathetorSize = (catheterSize:string) => { // функция при выборе Размера катетора
        setValue('catheterSize', catheterSize); // записываем значение пола из попапа
        setOpenModalSelectSize(!openModalSelectSize);
    }
    
  return (
    <MainLayout title="Основные данные" buttonBottomTitle="Сохранить изменения" buttonAction={handleSubmit(onSubmitSave)}>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <View className="pb-24">
                <InputChangeProfile control={control} inputData={userData.weight} name={"weight"} placeholder="Ваш вес" prefix={"кг"} key={"weight"}/>

                <InputChangeProfile control={control} inputData={userData.height} name={"height"} placeholder="Ваш рост" prefix={"см"} key={"height"}/>

                <InputChangeProfile control={control} inputData={userData.age} name={"age"} placeholder="Возраст" prefix={"год"} key={"age"}/>

                <InputChangeProfile control={control} inputData={userData.volume} name={"volume"} placeholder="Обьем мочевого музыря" prefix={"мл"} key={"volume"}/>
                
                <View className="border border-main-blue rounded-[10px]">
                    <TouchableOpacity onPress={() => setOpenModalSelectCatheter(!openModalSelectCatheter)} activeOpacity={.6} className="py-[15px] px-5 mb-[10px] w-full items-center">
                        <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-main-blue">{values.catheterType}</Text>
                        <Text style={{fontFamily:'geometria-regular'}} className="text-[10px] leading-3 mt-[5px] text-grey">
                            Тип катетера
                        </Text>
                        <ModalSelect
                            onItemPress={onSelectCathetor}
                            openModal={openModalSelectCatheter}
                            options={catheters}
                            setOpenModal={() => setOpenModalSelectCatheter(!openModalSelectCatheter)}
                            title={'Тип катететора*'}/>
                    </TouchableOpacity>
                    <View className="border border-purple-button w-1/2 items-center mx-auto"></View>
                    <TouchableOpacity onPress={() => setOpenModalSelectSize(!openModalSelectSize)} activeOpacity={.6} className="py-[15px] px-5 mb-[10px] w-full items-center">
                        <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-main-blue">{values.catheterSize} Ch/Fr</Text>
                        <Text style={{fontFamily:'geometria-regular'}} className="text-[10px] leading-3 mt-[5px] text-grey">
                            Размер катетора
                        </Text>
                        <ModalSelect
                            onItemPress={onSelectCathetorSize}
                            openModal={openModalSelectSize}
                            options={generateEvenNumbersOfSize()}
                            setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                            title={'Размер катетера Ch/Fr'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </MainLayout>
  );
};

export default ChangeProfileScreen;
