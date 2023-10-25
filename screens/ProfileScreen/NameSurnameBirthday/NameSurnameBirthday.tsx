import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

import InputData from "../../../components/InputData/InputData";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import DateTimePicker from "react-native-modal-datetime-picker";
import { useAppDispatch } from "../../../store/hooks";
import { setNameSurnameBirthday } from "../../../store/slices/createUserSlice";
import { Keyboard } from "../../../utils/enums";

const NameSurnameBirthday = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false); // состояние попапа выбора интервала
    const [timeText, setTimeText] = useState<string>('');
    const [save, setSave] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    
    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            nameSurname: '',
            birthday: '',
        },
    })
    const inputValue = watch();
    
    useEffect(() => {
        setSave(false);
    },[inputValue.nameSurname])

    const hideDatePicker = () => { // заркытие попапа выбора даты
        setDatePickerVisibility(false);
    };

    const handleSetDateOfBirth = (date: Date) => { // выбор даты рождения
        let tempDate = new Date(date);
        const dateOfBirthday = tempDate.getDate() + '.' + (tempDate.getMonth() + 1) + '.'  + tempDate.getFullYear();
        setValue('birthday',dateOfBirthday);
        setTimeText(dateOfBirthday);
        hideDatePicker();
    };

    const handleConfirmData = () => {
        if(!inputValue.birthday){
            Alert.alert('Пожалуйста, укажите дату рождения');
            return;
        }
        setSave(true);
        dispatch(setNameSurnameBirthday({birthday:timeText, nameSurname: inputValue.nameSurname})); // записываем в сторе редакс
    }

  return (
    <View className="flex-1 border border-border-color rounded-lg py-7 px-2">
        <InputData
            control={control}
            inputMode={Keyboard.String}
            inputsValue={inputValue.nameSurname}
            maxLength={50}
            placeholder="Введите имя и фамилию"
            errors={errors.nameSurname}
            showPrompt
            textPrompt="Для правильной работы pdf файла (который можно скачать\поделиться на экране 'Дневник мочеиспускания') заполните эти данные"
            key={'nameSurname'}
            name="nameSurname"
        />

        <ButtonSelect inputValue={timeText} openModal={isDatePickerVisible} setOpenModal={setDatePickerVisibility} placeholder="Дата рождения" key={timeText}/>
        <DateTimePicker
            isVisible={isDatePickerVisible}
            mode={'date'}
            onConfirm={handleSetDateOfBirth}
            onCancel={hideDatePicker}
            is24Hour={true}
        />

        <TouchableOpacity onPress={handleSubmit(handleConfirmData)} activeOpacity={.7} className="max-w-[200px] bg-main-blue px-10 py-[10px] rounded-[89px] mx-auto">
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#FFFFFF] text-center text-base leading-5">
              {save ? 'Сохранено' : 'Сохранить'}
            </Text>
        </TouchableOpacity>
    </View>
  );
};

export default NameSurnameBirthday;
