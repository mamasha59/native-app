import { useState } from "react";
import { useForm } from "react-hook-form";
import DateTimePicker from "react-native-modal-datetime-picker";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { thirdDataScreen } from "../../../store/slices/createUserSlice";

import { catheters } from "../../../utils/const";
import { day } from "../../../utils/date";
import ButtonSelect from "../../../components/ButtonSelect/ButtonSelect";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const [openModalUseAtNight, setOpenModalUseAtNight] = useState<boolean>(false); // состояние попапа использование на ночь
    const [openModalSelectCatheter, setOpenModalSelectCatheter] = useState<boolean>(false); // состояние попапа Тип катетора
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false); // состояние попапа выбора интервала

    const minDate = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1); // Минимальная дата через 1 день
    const maxDate = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 31); // Максимальная дата через 31 день
  
    const [intervalTime, setIntervalTime] = useState<Date>(new Date());
    const [timeText, setTimeText] = useState<string>('')

    const dispatch = useAppDispatch();
    const wichCatheter = useAppSelector( catheter => catheter.user.catheterType);

    const { handleSubmit, setValue, watch} = useForm({
        defaultValues: {
            interval: '',
            useAtNight: '',
            urineMeasure: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении

    const onSelectUrineMeasure = (isCount:string) => { // при выбора из попапа Измерение мочи на ночь
        setValue('urineMeasure', isCount); // записываем значение пола из попапа
        setOpenModalUseAtNight((prevValue) => !prevValue);
    }

    const onSelectCathetor = (catheterType:string) => { // функция при выборе Катетора Использование на ночь
        setValue('useAtNight', catheterType); // записываем значение пола из попапа
        setOpenModalSelectCatheter((prevValue) => !prevValue);
    }
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirmInterval = (date: Date) => {
        const currentDate = date || intervalTime;
        setIntervalTime(currentDate);

        let tempDate = new Date(currentDate);
        console.log(tempDate);
        
        let time;
        // Рассчитываем разницу в миллисекундах между выбранной датой (tempDate) и текущей датой (today)
        let timeDifference = tempDate.getTime() - day.getTime();
        // Рассчитываем количество миллисекунд в одном дне
        let millisecondsInDay = 24 * 60 * 60 * 1000;
        // Рассчитываем количество дней, разделив разницу на количество миллисекунд в дне
        let daysDifference = Math.floor(timeDifference / millisecondsInDay);
        const hoursMinutes = ' Часы: ' + tempDate.getHours() + ' | Минуты: ' + tempDate.getMinutes();

        if (wichCatheter === 'Фоллея') {
          time = 'Дни: ' + daysDifference + ' |' + hoursMinutes;
        } else {
          time = hoursMinutes;
        }
        setValue('interval', time);
        setTimeText(time);
        hideDatePicker();
    };

    const onSubmit = (data:any) => { // при нажатии кнопки Продолжить
        dispatch(thirdDataScreen(data))
        navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
     }

  return (
    <WelcomeLayout index={3} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <>{/* попап выбор Интервалы */}
        <ButtonSelect
            inputValue={timeText}
            openModal={isDatePickerVisible}
            placeholder={'Интервалы'}
            setOpenModal={()=>setDatePickerVisibility(true)}
            key={'Интервалы'}/>
        <DateTimePicker
            isVisible={isDatePickerVisible}
            mode={wichCatheter === 'Фоллея' ? 'datetime' : 'time'}
            onConfirm={handleConfirmInterval}
            onCancel={hideDatePicker}
            is24Hour={true}
            minimumDate={wichCatheter === 'Фоллея' ? minDate : undefined}
            maximumDate={wichCatheter === 'Фоллея' ? maxDate : undefined}/>
        </>

        <>{/* попап выбор ИСПОЛЬЗОВАНИЕ НА НОЧЬ */}
        <ButtonSelect
            inputValue={inputsValue.useAtNight}
            openModal={openModalSelectCatheter}
            placeholder={'Использование на ночь'}
            setOpenModal={() => setOpenModalSelectCatheter(!openModalSelectCatheter)}
            key={'Использование на ночь'}/>
        <ModalSelect
            onItemPress={onSelectCathetor}
            openModal={openModalSelectCatheter}
            options={catheters}
            setOpenModal={() => setOpenModalSelectCatheter(!openModalSelectCatheter)}
            title={'Использование на ночь'}/>
        </>
        
        <>{/* попап выбор ИЗМЕРЕНИ МОЧИ */}
        <ButtonSelect
            inputValue={inputsValue.urineMeasure}
            openModal={openModalUseAtNight}
            placeholder={'Измерение кол-ва мочи*'}
            setOpenModal={() => setOpenModalUseAtNight(!openModalUseAtNight)}
            key={'Измерение кол-ва мочи*'}/>
        <ModalSelect
            onItemPress={onSelectUrineMeasure}
            openModal={openModalUseAtNight}
            options={['Да', 'Нет']}
            setOpenModal={() => setOpenModalUseAtNight(!openModalUseAtNight)}
            title={'Измерение кол-ва мочи*'}/>
        </>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;
