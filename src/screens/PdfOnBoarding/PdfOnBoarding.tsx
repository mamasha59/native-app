import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import {useState } from "react";
import { BlurView } from 'expo-blur';

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import InputData from "../../components/InputData/InputData";
import { Keyboard } from "../../utils/enums";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import ModalSelect from "../../components/ModalSelect/ModalSelect";
import ButtonSelect from "../../components/ButtonSelect/ButtonSelect";
import { generateEvenNumbersOfSize } from "../../utils/const";
import { setUserData } from "../../store/slices/createUserSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Option } from "../../types";
import ClueAtTheBottom from "../../components/ClueAtTheBottom/ClueAtTheBottom";
import { NavigationPropsRoot } from "../../components/RootNavigations/RootNavigations";
import { handleModalCustomizePdfDocument } from "../../store/slices/journalDataSlice";

const PdfOnBoarding = ({navigation}:NavigationPropsRoot<'PdfOnBoarding'>) => {

    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user);
    
    const [openModalSelectSex, setOpenModalSelectSex] = useState<boolean>(false);
    const [openModalSelectSize, setOpenModalSelectSize] = useState<boolean>(false); // состояние попапа Размер катетора\

    const [loading, setIsLoading] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            sex: '' || userData.sex,
            name: '' || userData.name,
            surname: '' || userData.surname,
            age: '' || userData.age,
            volume: '' || userData.volume,
            catheterSize: '' || userData.catheterSize,
            catheterInfo: '' || userData.catheterInfo,
            additionalInfo: '' || userData.additionalInfo,
        }
    });

    const inputsValue = watch();        // состояние инпута при его изменении

    const closeModal = () => setOpenModalSelectSex(!openModalSelectSex);
    
    const onSelectSexPress = (sex:Option) => {
        setValue('sex', sex.title);
        closeModal();
    }

    const onSelectCathetorSize = (catheterSize:Option) => { // функция при выборе Размера катетора
        setValue('catheterSize', catheterSize.title);
        setOpenModalSelectSize(!openModalSelectSize);
    }

    const goBackAndOpenModalCustomizePdf = () => {
        navigation.goBack();
        dispatch(handleModalCustomizePdfDocument(true));
    }

    const onSubmit = (data:any) => { // при нажатии кнопки Сохранить
        dispatch(setUserData(data));
        goBackAndOpenModalCustomizePdf()
    }
  
  return (
    <MainLayout title="Персонализируйте ваш Дневник мочеиспускания">
        <ScrollView className="flex-1">
            <Text style={{fontFamily:'geometria-regular'}} className="mb-6">
                Эти данные будут отображены в PDF-версии вашего дневника.Заполненные
                сведения помогут вашему врачу легко распознать ваш документ и
                использовать его для наблюдения за вашим здоровьем и, при необходимости,
                корректировки лечения.
            </Text>
            <>
            <ButtonSelect
                inputValue={inputsValue.sex}
                openModal={openModalSelectSex}
                placeholder={'Ваш пол*'}
                setOpenModal={setOpenModalSelectSex}
                key={'Ваш пол*'}/>
            <ModalSelect
                row
                logo={false}
                showIcon={false}
                onItemPress={(item) => onSelectSexPress(item)}
                openModal={openModalSelectSex}
                options={[{title: 'Женский', value: 'female'}, {title:'Мужской', value: 'male'}, {title: 'Мальчик', value: 'boy'}, {title: 'Девочка', value: 'girl'}]}
                setOpenModal={closeModal}
                title={'Ваш пол*'}/>
            </>
            <View className="w-full">
                <InputData
                    key={"name"}
                    control={control}
                    errors={errors.name}
                    inputsValue={inputsValue.name || userData.name}
                    placeholder="Ваше имя *"
                    name={"name"}
                    inputMode={Keyboard.String}
                    maxLength={40}
                    isRequired
                    />
            </View>
            <View className="w-full">
                <InputData
                    key={"surname"}
                    control={control}
                    errors={errors.surname}
                    inputsValue={inputsValue.surname}
                    placeholder="Ваша фамилия *"
                    name={"surname"}
                    inputMode={Keyboard.String}
                    maxLength={40}
                    isRequired
                    />
                </View>
            <View className="w-full">
                <InputData
                    key={"age"}
                    control={control}
                    errors={errors.age}
                    inputsValue={inputsValue.age}
                    placeholder="Ваш возраст *"
                    name={"age"}
                    inputMode={Keyboard.Numeric}
                    maxLength={3}
                    isRequired
                    />
            </View>
            <View className="w-full">
                <InputData
                    key={"volume"}
                    control={control}
                    errors={errors.volume}
                    inputsValue={inputsValue.volume}
                    placeholder="Объем мочевого пузыря"
                    name={"volume"}
                    inputMode={Keyboard.Numeric}
                    maxLength={4}
                    showPrompt
                    textPrompt="«общие» нормы : У женщин – 250-500 мл, У мужчин – 350-700 мл, У детей – 35-400 мл (в зависимости от возраста)"
                    />
            </View>
            <>
                <ButtonSelect
                    inputValue={inputsValue.catheterSize}
                    openModal={openModalSelectSize}
                    placeholder={'Размер катетера Ch/Fr'}
                    setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                    key={'Размер катетера Ch/Fr'}/>
                <ModalSelect
                    row
                    showIcon={false}
                    onItemPress={(item) => onSelectCathetorSize(item)}
                    openModal={openModalSelectSize}
                    options={generateEvenNumbersOfSize()}
                    setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                    title={'Размер катетера Ch/Fr'}/>
            </>
            <View className="w-full">
                <InputData
                    key={"catheterInfo"}
                    control={control}
                    errors={errors.catheterInfo}
                    inputsValue={inputsValue.catheterInfo}
                    placeholder="Каким катетером пользуетесь Название/производитель"
                    name={"catheterInfo"}
                    inputMode={Keyboard.String}
                    maxLength={40}
                    isRequired={false}
                    multiline
                    />
            </View>
            <View className="w-full">
                <InputData
                    key={"additionalInfo"}
                    control={control}
                    errors={errors.additionalInfo}
                    inputsValue={inputsValue.additionalInfo}
                    placeholder="Дополнительно для врача"
                    name={"additionalInfo"}
                    inputMode={Keyboard.String}
                    maxLength={140}
                    isRequired={false}
                    multiline
                    />
            </View>
            { loading &&
            <BlurView intensity={100} tint="prominent" className="absolute top-0 bottom-0 left-0 right-0 justify-center" style={{zIndex:10}}>
                <ActivityIndicator size={'large'} color={'blue'}/>
            </BlurView>}
            <DoubleButton
            showIcon= {false}
            textOfLeftButton="Назад"
            textOfRightButton="Сохранить"
            handlePressRightButton={handleSubmit(onSubmit)}
             handlePressLeftButton={goBackAndOpenModalCustomizePdf}
            />
            <ClueAtTheBottom/>
        </ScrollView>
    </MainLayout>
  );
};

export default PdfOnBoarding;
