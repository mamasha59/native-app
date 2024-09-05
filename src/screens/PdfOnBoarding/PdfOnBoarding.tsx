import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import {useState } from "react";
import { BlurView } from 'expo-blur';
import { useTranslation } from "react-i18next";

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

const PdfOnBoarding = ({navigation, route}:NavigationPropsRoot<'PdfOnBoarding'>) => {
    const {t} = useTranslation();
    const { cameFrom } = route.params;
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

    const onSelectCatheterSize = (catheterSize:Option) => { // функция при выборе Размера катетора
        setValue('catheterSize', catheterSize.title);
        setOpenModalSelectSize(!openModalSelectSize);
    }

    const goBackAndOpenModalCustomizePdf = () => {
        navigation.goBack();
        if(cameFrom === 'JournalScreen'){
            dispatch(handleModalCustomizePdfDocument(true));
        }
    }

    const onSubmit = (data:any) => { // при нажатии кнопки Сохранить
        dispatch(setUserData(data));
        goBackAndOpenModalCustomizePdf()
    }
  
  return (
    <MainLayout title={t("personalizationScreen.title")}>
        <ScrollView className="flex-1">
            <Text style={{fontFamily:'geometria-regular'}} className="mb-6">
                {t("personalizationScreen.description")}
            </Text>
            <>
            <ButtonSelect
                inputValue={inputsValue.sex}
                openModal={openModalSelectSex}
                placeholder={t("personalizationScreen.your_gender")}
                setOpenModal={setOpenModalSelectSex}
                key={'your_gender'}/>
            <ModalSelect
                height={3}
                row
                logo={false}
                showIcon={false}
                onItemPress={(item) => onSelectSexPress(item)}
                openModal={openModalSelectSex}
                options={[
                    {title: t("personalizationScreen.female"), value: 'female'},
                    {title: t("personalizationScreen.male"), value: 'male'},
                    {title: t("personalizationScreen.boy"), value: 'boy'},
                    {title: t("personalizationScreen.girl"), value: 'girl'}]}
                setOpenModal={closeModal}
                title={'Ваш пол*'}/>
            </>
            <View className="w-full">
                <InputData
                    key={"name"}
                    control={control}
                    errors={errors.name}
                    inputsValue={inputsValue.name || userData.name}
                    placeholder={t("personalizationScreen.your_first_name")}
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
                    placeholder={t("personalizationScreen.your_last_name")}
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
                    placeholder={t("personalizationScreen.your_age")}
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
                    placeholder={t("personalizationScreen.bladder_volume")}
                    name={"volume"}
                    inputMode={Keyboard.Numeric}
                    maxLength={4}
                    showPrompt
                    textPrompt={t("personalizationScreen.volume_info")}
                    />
            </View>
            <>
                <ButtonSelect
                    inputValue={inputsValue.catheterSize}
                    openModal={openModalSelectSize}
                    placeholder={t("personalizationScreen.catheter_size")}
                    setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                    key={'catheter_size'}/>
                <ModalSelect
                    row
                    showIcon={false}
                    onItemPress={(item) => onSelectCatheterSize(item)}
                    openModal={openModalSelectSize}
                    options={generateEvenNumbersOfSize()}
                    setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                    title={t("personalizationScreen.catheter_size")}/>
            </>
            <View className="w-full">
                <InputData
                    key={"catheterInfo"}
                    control={control}
                    errors={errors.catheterInfo}
                    inputsValue={inputsValue.catheterInfo}
                    placeholder={t("personalizationScreen.which_catheter_do_you_use")}
                    name={"catheterInfo"}
                    inputMode={Keyboard.String}
                    maxLength={40}
                    isRequired={false}
                    multiline
                    showPrompt
                    textPrompt={t("personalizationScreen.which_catheter_do_you_use_hint")}
                    />
            </View>
            <View className="w-full">
                <InputData
                    key={"additionalInfo"}
                    control={control}
                    errors={errors.additionalInfo}
                    inputsValue={inputsValue.additionalInfo}
                    placeholder={t("personalizationScreen.additional_information")}
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
            textOfLeftButton={t("back")}
            textOfRightButton={t("save")}
            handlePressLeftButton={goBackAndOpenModalCustomizePdf}
            handlePressRightButton={handleSubmit(onSubmit)}
            />
            <ClueAtTheBottom/>
        </ScrollView>
    </MainLayout>
  );
};

export default PdfOnBoarding;
