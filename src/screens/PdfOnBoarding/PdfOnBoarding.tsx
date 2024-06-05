import { View, Text, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';

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

const PdfOnBoarding = () => {//TODO скачивать pdf 
    const dispatch = useAppDispatch();
    const userData = useAppSelector(state => state.user);
    
    const [openModalSelectSex, setOpenModalSelectSex] = useState<boolean>(false);
    const [openModalSelectSize, setOpenModalSelectSize] = useState<boolean>(false); // состояние попапа Размер катетора
    
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
    
    const onSelectSexPress = (sex:Option) => {
        setValue('sex', sex.title);
        setOpenModalSelectSex(!openModalSelectSex);
    }

    const onSelectCathetorSize = (catheterSize:Option) => { // функция при выборе Размера катетора
        setValue('catheterSize', catheterSize.title);
        setOpenModalSelectSize(!openModalSelectSize);
    }

    const html = `
    <html lang="rus">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <meta http-equiv="Content-Disposition" content="attachment; filename="Мое.pdf">
        <title>Дневник мочеиспускания</title>
        </head>
        <body style="padding: 0; margin: 0; font-family: 'geometria-regular';max-width: 2480px; margin: 0 auto 0 auto">
        <div
            style="
            padding: 8.75rem;
            color: white;
            background: linear-gradient(90deg, #4baac5 0.16%, #7076b0 101.13%);
            position: relative;
            "
        >
            <div style="display: flex; align-items: center;">
            <div style="display: flex; flex-direction: column; gap: 30px;">
                <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
                Дата:
                <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                    >dг.</b
                >
                </p>
                <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
                Фамилия И.О.:
                <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                    >$d</b
                >
                </p>
                <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
                Дата рождения:
                <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
                    >$dг.</b
                >
                </p>
            </div>
            </div>
            <div
            style="
                position: absolute;
                right: 10%;
                top: 10%;
                display: flex;
                align-items: center;
                gap: 60px;
            "
            >
            <img
                src="https://github.com/mamasha59/native-app/assets/68348736/59860e0b-43b8-4d8b-b11e-970d62ec7911"
                style="width: 110px" 
            />
            <h1 style="font-size: 120px; line-height: 144px;">
                Uro <span style="font-style: italic;">Control</span>
            </h1>
            </div>
        </div>
        <div style="color: #101010; padding: 100px;">
            <h2 style="font-size: 80px; line-height: 96px; margin: 0;">
            Дневник мочеиспускания
            </h2>
            <table class="GeneratedTable">
            <thead style="font-size: 20px; line-height: 24px;">
                <tr>
                <th>Дата</th>
                <th>Время</th>
                <th>Тип катетера</th>
                <th>Скорость катетеризации, сек</th>
                <th>Объем выделенной мочи, мл</th>
                <th>Объем выпитой жидкости, мл</th>
                <th>Подтекание мочи (да/нет)</th>
                <th>Активность при подтекании (в покое, кашель, бег и.т.п.)</th>
                </tr>
            </thead>
            <tbody>
           
            </tbody>
            </table>
        </div>
        </body>
    </html>
    <style>
        *{
        margin: 0;
        padding: 0;
        }
        body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        }
        img {
        max-width: 100%;
        display: block;
        }
        table {
        border-collapse: collapse;
        border-spacing: 0;
        }
        table.GeneratedTable {
        width: 100%;
        margin: 80px 0 120px 0;
        background-color: #ffffff;
        border-width: 2px;
        border-color: #4baac5;
        border-style: solid;
        color: #101010;  
        }
        table.GeneratedTable td,
        table.GeneratedTable th {
        border-width: 2px;
        border-color: #4baac5;
        border-style: solid;
        padding: 3px;
        }
        table.GeneratedTable thead {
        background-color: #ffffff;
        }
    </style>
    </html>
    `;
    
  const downloadPdfOnPhone = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) return;
  
    try {
      await StorageAccessFramework.createFileAsync(permissions.directoryUri, 'Journal-catheterization', 'application/pdf')
        .then(async uri => {
          // Writing PDF contents to a file
          await FileSystem.writeAsStringAsync(uri, html, { encoding: FileSystem.EncodingType.UTF8 });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.error('Error:', error);
    }
  };


const onSubmit = (data:any) => { // при нажатии кнопки Сохранить
    dispatch(setUserData(data));
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
                onItemPress={(item) => onSelectSexPress(item)}
                openModal={openModalSelectSex}
                options={[{title: 'Женский', value: 'female'}, {title:'Мужской', value: 'male'}, {title: 'Мальчик', value: 'boy'}, {title: 'Девочка', value: 'girl'}]}
                setOpenModal={setOpenModalSelectSex}
                title={'Ваш пол*'}/>
        </>
        <View className={`w-full`}>
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
        <View className={`w-full`}>
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
        <View className={`w-full`}>
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
        <View className={`w-full`}>
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
                onItemPress={(item) => onSelectCathetorSize(item)}
                openModal={openModalSelectSize}
                options={generateEvenNumbersOfSize()}
                setOpenModal={() => setOpenModalSelectSize(!openModalSelectSize)}
                title={'Размер катетера Ch/Fr'}/>
        </>
        <View className={`w-full`}>
            <InputData
                key={"catheterInfo"}
                control={control}
                errors={errors.catheterInfo}
                inputsValue={inputsValue.catheterInfo}
                placeholder="Каким катетером пользуетесь Название/производитель"
                name={"catheterInfo"}
                inputMode={Keyboard.String}
                maxLength={40}
                isRequired
                multiline
                />
        </View>
        <View className={`w-full`}>
            <InputData
                key={"additionalInfo"}
                control={control}
                errors={errors.additionalInfo}
                inputsValue={inputsValue.additionalInfo}
                placeholder="Дополнительно для врача"
                name={"additionalInfo"}
                inputMode={Keyboard.String}
                maxLength={140}
                isRequired
                multiline
                />
        </View>
        <DoubleButton
         showIcon= {false}
         textOfLeftButton="Пропустить"
         textOfRightButton="Сохранить"
         handlePressRightButton={handleSubmit(onSubmit)}
         handlePressLeftButton={onSubmit}
        />
        <ClueAtTheBottom/>
        </ScrollView>
    </MainLayout>
  );
};

export default PdfOnBoarding;
