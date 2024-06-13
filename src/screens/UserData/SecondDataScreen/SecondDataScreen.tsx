import { Text, View } from "react-native";
import React, { RefObject, useRef } from "react";

import WelcomeLayout from "../../../Layouts/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../UserData";
import FluidIntakeChart from "../../WaterBalance/FluidIntakeChart/FluidIntakeChart";
import ProfileSelect from "../../ProfileStack/ProfileScreen/ProfileSettings/ProfileSelect/ProfileSelect";
import ClueAtTheBottom from "../../../components/ClueAtTheBottom/ClueAtTheBottom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IDropdownRef } from "react-native-element-dropdown";
import { Option } from "../../../types";
import { setWhetherCountUrine } from "../../../store/slices/appStateSlicer";

interface iSecondDataScreen extends NavigationPropsWelcome<'SecondDataScreen'>{}

const SecondDataScreen = ({navigation}:iSecondDataScreen) => {
    const settings = useAppSelector((state) => state.appStateSlice); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const dispatch = useAppDispatch();
    const dropDownCountUrine:RefObject<IDropdownRef> = useRef(null);
    const dropDownCountWater:RefObject<IDropdownRef> = useRef(null);
    
    const handleIsCountDrankWater = (value: Option) => { // функция при выборе селекта Измерение воды
        // dispatch(setWhetherCountUrine({value: value!.value, title: value!.title}));
        dropDownCountWater.current && dropDownCountWater.current.close();
    }

    const handleIsCountUrine = (value: Option) => { // функция при выборе селекта Измерение кол-ва мочи
        dispatch(setWhetherCountUrine({value: value.value, title: value.title}));
        dropDownCountUrine.current && dropDownCountUrine.current.close();
    }

    const proceedNextScreen = () => {
        navigation.navigate('ThirdDataScreen');
    }

  return (
    <WelcomeLayout currentScreen={2} buttonTitle="продолжить" handleProceed={proceedNextScreen}>
        <FluidIntakeChart/>
        <Text className="text-base" style={{fontFamily:'geometria-regular'}}>
            Измерение потребляемой жидкости и выделенной мочи поможет поддерживать оптимальный уровень воды в организме.
        </Text>
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

export default SecondDataScreen;
