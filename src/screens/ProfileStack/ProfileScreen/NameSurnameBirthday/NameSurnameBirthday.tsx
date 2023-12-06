import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setNameSurnameBirthday } from "../../../../store/slices/createUserSlice";
import { Keyboard } from "../../../../utils/enums";
import InputData from "../../../../components/InputData/InputData";
import ButtonSelect from "../../../../components/ButtonSelect/ButtonSelect";

const NameSurnameBirthday = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false); // состояние попапа выбора интервала
    const [timeText, setTimeText] = useState<string>('');
    const [save, setSave] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());

    const dispatch = useAppDispatch();
    const userData = useAppSelector(user => user.user);

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

    const handleSetDateOfBirth = (e:DateTimePickerEvent, date?: Date | undefined):void => { // выбор даты рождения
        if (date) {
            const dateOfBirthday = date.getDate().toString().padStart(2,'0') + '.' + (date.getMonth() + 1).toString().padStart(2,'0') + '.'  + date.getFullYear();
            setDatePickerVisibility(false);
            setValue('birthday', dateOfBirthday);
            setTimeText(dateOfBirthday);
            setDate(date);
        }
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
            inputsValue={inputValue.nameSurname  || userData.nameSurname}
            maxLength={50}
            placeholder={"Введите имя и фамилию"}
            errors={errors.nameSurname}
            showPrompt
            textPrompt="Для правильной работы pdf файла (который можно скачать\поделиться на экране 'Дневник мочеиспускания') заполните эти данные"
            key={'nameSurname'}
            name="nameSurname"
        />
        <ButtonSelect inputValue={timeText || userData.birthday} openModal={isDatePickerVisible} setOpenModal={setDatePickerVisibility} placeholder="Дата рождения" key={timeText}/>
        {isDatePickerVisible &&
            (<DateTimePicker
                mode="date"
                onChange={handleSetDateOfBirth}
                value={date}
            />)
        }
        <TouchableOpacity onPress={handleSubmit(handleConfirmData)} activeOpacity={.7} className="max-w-[200px] bg-main-blue px-10 py-[10px] rounded-[89px] mx-auto">
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#FFFFFF] text-center text-base leading-5">
              {save ? 'Сохранено' : 'Сохранить'}
            </Text>
        </TouchableOpacity>
    </View>
  );
};

export default NameSurnameBirthday;
