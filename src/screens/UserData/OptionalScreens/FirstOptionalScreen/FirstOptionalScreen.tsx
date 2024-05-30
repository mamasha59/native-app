import { View } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";
import { RefObject, useRef } from "react";

import WelcomeLayout from "../../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../../UserData";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { changeIsExist, setWhetherCountUrine } from "../../../../store/slices/appStateSlicer";
import ClueAtTheBottom from "../../../../components/ClueAtTheBottom/ClueAtTheBottom";
import { Option } from "../../../../types";
import ProfileSelect from "../../../ProfileStack/ProfileScreen/ProfileSettings/ProfileSelect/ProfileSelect";

interface FirstOptionalScreen extends NavigationPropsWelcome<'FirstOptionalScreen'>{}

const FirstOptionalScreen = ({navigation}:FirstOptionalScreen) => {
    const settings = useAppSelector((state) => state.appStateSlice); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const dispatch = useAppDispatch();
    const dropDownCountUrine:RefObject<IDropdownRef> = useRef(null);
    const dropDownCountWater:RefObject<IDropdownRef> = useRef(null);

    const onSubmit = () => { // функция при клике на кнопку 'Изменить позже'
        navigation.navigate('MainScreen');
        dispatch(changeIsExist(true));
    }
    
    const handleIsCountDrankWater = (value: Option) => { // функция при выборе селекта Измерение воды
        // dispatch(setWhetherCountUrine({value: value!.value, title: value!.title}));
        dropDownCountWater.current && dropDownCountWater.current.close();
    }

    const handleIsCountUrine = (value: Option) => { // функция при выборе селекта Измерение кол-ва мочи
        dispatch(setWhetherCountUrine({value: value.value, title: value.title}));
        dropDownCountUrine.current && dropDownCountUrine.current.close();
    }

  return (
    <WelcomeLayout title="Water balance" buttonTitle="Сохранить изменения" handleProceed={onSubmit} skip={true} skipNextScreen={onSubmit}>
        <View className="my-4">
            <ProfileSelect
                selectRef={dropDownCountUrine}
                confirmation={true}
                handleClickOption={handleIsCountUrine}
                title="Измерение кол-ва выделяемой мочи"
                value={settings.urineMeasure.title}
                key={"Измерение кол-ва выделяемой мочи"}
            />
        </View>

        <View className="mt-4">
            <ProfileSelect
                selectRef={dropDownCountWater}
                confirmation={false}
                handleClickOption={handleIsCountDrankWater}
                title="Измерение кол-ва выпитой жидкости"
                value={''}
                key={"Измерение кол-ва выпитой жидкости"}
            />
        </View>

        <ClueAtTheBottom/>
    </WelcomeLayout>
  );
};

export default FirstOptionalScreen;
