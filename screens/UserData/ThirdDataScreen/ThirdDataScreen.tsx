import { View } from "react-native";
import { useState } from "react";
import { useForm } from "react-hook-form";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import { useAppDispatch } from "../../../store/hooks";
import { thirdDataScreen } from "../../../store/slices/createUserSlice";

import InputData from "../../../components/InputData/InputData";
import InpuDataModalSelect from "../../../components/InpuDataModalSelect/InpuDataModalSelect";
import { catheters } from "../../../utils/const";
import { Keyboard } from "../../../utils/enums";

interface iThirdDataScreen extends NavigationPropsWelcome<'ThirdDataScreen'>{}

const ThirdDataScreen = ({navigation}:iThirdDataScreen) => {
    const [openModalUseAtNight, setOpenModalUseAtNight] = useState<boolean>(false);
    const [openModalSelectCatheter, setOpenModalSelectCatheter] = useState<boolean>(false); // состояние попапа Тип катетора

    const dispatch = useAppDispatch();

    const { control, handleSubmit, formState: { errors}, setValue, watch} = useForm({
        defaultValues: {
            interval: '',
            useAtNight: '',
            urineMeasure: ''
        }
    })
    const inputsValue = watch(); // состояние инпута при его изменении
    
    const onSubmit = (data:any) => { // при нажатии кнопки внизу экрана Продолжить
       dispatch(thirdDataScreen(data))
       navigation.navigate('FirstOptionalScreen'); // перенаправляем юзера на 1й необязательно к заполнению скрин (уведомления)
    }

    const onSelectSexPress = (isCount:string) => { // при выбора из попапа Измерение мочи
        setValue('urineMeasure', isCount); // записываем значение пола из попапа
        setOpenModalUseAtNight(!openModalUseAtNight);
    }

    const onSelectCathetor = (catheterType:string) => { // функция при выборе Катетора Использование на ночь
        setValue('useAtNight', catheterType); // записываем значение пола из попапа
        setOpenModalSelectCatheter(!openModalSelectCatheter);
    }

  return (
    <WelcomeLayout index={3} title="Введите свои данные" buttonTitle="Продолжить" handleProceed={handleSubmit(onSubmit)}>
        <View className="items-center">
            <InputData
                key={"interval"}
                control={control}
                errors={errors.interval}
                inputsValue={inputsValue.interval}
                placeholder="Интервалы"
                name={"interval"}
                inputMode={Keyboard.Numeric}
                maxLength={3}
                />
            <>{/* попап выбор ИСПОЛЬЗОВАНИЕ НА НОЧЬ */}
                <InpuDataModalSelect
                    inputValue={inputsValue.useAtNight}
                    onItemPress={onSelectCathetor}
                    openModal={openModalSelectCatheter}
                    options={catheters}
                    setOpenModal={() => setOpenModalSelectCatheter(!openModalSelectCatheter)}
                    title={'Использование на ночь'}
                    key={inputsValue.useAtNight}
                />
            </>
            <>{/* попап выбор ИЗМЕРЕНИ МОЧИ */}
                <InpuDataModalSelect
                    inputValue={inputsValue.urineMeasure}
                    onItemPress={onSelectSexPress}
                    openModal={openModalUseAtNight}
                    options={['Да', 'Нет']}
                    setOpenModal={() => setOpenModalUseAtNight(!openModalUseAtNight)}
                    title={'Измерение кол-ва мочи*'}
                    key={inputsValue.urineMeasure}
                />
            </>
        </View>
    </WelcomeLayout>
  );
};

export default ThirdDataScreen;
