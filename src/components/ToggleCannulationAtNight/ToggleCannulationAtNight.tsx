import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setWhetherDoCannulationAtNight } from "../../store/slices/nightStateSlice";
import { StackNavigationRoot } from "../RootNavigations/RootNavigations";
import SwitchToggle from "../SwitchToggle/SwitchToggle";

const ToggleCannulationAtNight = () => {
    const {t} = useTranslation();

    const settingsNighMode = useAppSelector((state) => state.nightOnDoarding); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)

    const dispatch = useAppDispatch();

    const currentRoute = useNavigationState(state => state.routes[state.index].name);
    const navigation = useNavigation<StackNavigationRoot>();
    
    const [isEnabled, setIsEnabled] = useState<boolean>(settingsNighMode.cannulationAtNight);

    useEffect(() => {
        setIsEnabled(settingsNighMode.cannulationAtNight);
    },[settingsNighMode.cannulationAtNight]);

    const handleUseAtNight = () => {
        const newIsEnabled = !isEnabled;
        setIsEnabled(newIsEnabled);

        dispatch(setWhetherDoCannulationAtNight(newIsEnabled));
        if (!newIsEnabled && currentRoute !== 'FirstDataScreen') {
            navigation.navigate('NightMode');
        }
    };

  return (
    <View className="items-center my-4 bg-[#ecf0f1] px-1 py-4 h-[120px] rounded-xl">
        <SwitchToggle key={'togglenighmode'} title={t('toggleCannulationAtNightComponent.title')} onValueChange={handleUseAtNight} isEnabled={isEnabled}/>
        <>
            {!isEnabled && 
            <TouchableOpacity className="py-2" onPress={() => navigation.navigate('NightMode')}>
                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue">
                    Настройка ночного режима
                </Text>
            </TouchableOpacity>}
        </>
    </View>
  );
};

export default ToggleCannulationAtNight;