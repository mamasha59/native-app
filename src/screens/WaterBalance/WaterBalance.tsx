import { View, Text, ScrollView } from "react-native";
import { RefObject, useRef } from "react";
import { IDropdownRef } from "react-native-element-dropdown";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ChartReleasedUrine from "../ControlCatheter/ChartReleasedUrine/ChartReleasedUrine";
import ChartDrankWater from "../ControlCatheter/ChartDrankWater/ChartDrankWater";
import ProfileSelect from "../ProfileStack/ProfileScreen/ProfileSettings/ProfileSelect/ProfileSelect";
import { setWhetherCountUrine } from "../../store/slices/appStateSlicer";
import { Option } from "../../types";
import FluidIntakeChart from "./FluidIntakeChart/FluidIntakeChart";

const WaterBalance = () => {
    const countUrine = useAppSelector((state) => state.appStateSlice.urineMeasure);
    const settings = useAppSelector((state) => state.appStateSlice); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)

    const dispatch = useAppDispatch();
    const dropDownCountUrine:RefObject<IDropdownRef> = useRef(null);

    const handleIsCountUrine = (value: Option) => { // функция при выборе селекта Измерение кол-ва мочи
        dispatch(setWhetherCountUrine({value: value.value, title: value.title}));
        dropDownCountUrine.current && dropDownCountUrine.current.close();
    }

    const handleIsCountDrankWater = (value: Option) => { // функция при выборе селекта Измерение выпитой жидкости
       
    }

  return (
    <MainLayout>
        <ScrollView className="flex-1">
            <FluidIntakeChart/>
            <>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">График выпитой жидкости</Text>
                <ChartDrankWater/>
            </>
            {countUrine.value && 
            <>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#101010] text-[22px] leading-[26px]">График выделенной мочи</Text>
                <ChartReleasedUrine/>
            </>
            }
            <View>
                <Text className="text-start" style={{fontFamily:'geometria-regular'}}>
                    Водный баланс — это соотношение между количеством жидкости,
                    поступающей в организм, и количеством жидкости, выводимой из него за
                    определённый период времени. Измерение потребляемой жидкости и
                    выделенной мочи поможет вам поддерживать оптимальный уровень воды в
                    организме.
                </Text>
            </View>
            <View className="mt-4">
                <ProfileSelect 
                    selectRef={dropDownCountUrine}
                    confirmation={false}
                    handleClickOption={handleIsCountDrankWater}
                    title="Измерение кол-ва выпитой жидкости"
                    value={'пока пусто'}
                    key={"Измерение кол-ва выпитой жидкости"}
                />
            </View>
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
        </ScrollView>
    </MainLayout>
  );
};

export default WaterBalance;
