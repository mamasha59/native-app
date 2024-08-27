import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setWhetherDoCannulationAtNight } from "../../store/slices/nightStateSlice";
import { StackNavigationRoot } from "../RootNavigations/RootNavigations";
import SwitchToggle from "../SwitchToggle/SwitchToggle";
import DoubleButton from "../DoubleButton/DoubleButton";
import { switchCheckedButtonProfileScreen } from "../../store/slices/appStateSlicer";

const ToggleCannulationAtNight = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const settingsNighMode = useAppSelector((state) => state.nightOnBoarding); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)

    const [isEnabled, setIsEnabled] = useState<boolean>(settingsNighMode.cannulationAtNight);

    const currentRoute = useNavigationState(state => state.routes[state.index].name);
    const navigation = useNavigation<StackNavigationRoot>();
    
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

    const handleLeftButtonOnceAtNight = () => {
        dispatch(switchCheckedButtonProfileScreen({leftButton: true, rightButton: false}));
    }

    const handleRightButtonByInterval = () => {
        dispatch(switchCheckedButtonProfileScreen({leftButton: false, rightButton: true}));
    }

  return (
    <View className="items-center my-4 bg-[#ecf0f1] p-2 rounded-xl flex-1 justify-center">
        <SwitchToggle key={'togglenightmode'} title={t('toggleCannulationAtNightComponent.title')} onValueChange={handleUseAtNight} isEnabled={isEnabled}/>
        <View className="flex-1 w-full items-center justify-center mt-2">
            {!isEnabled &&
                <TouchableOpacity className="p-2к bg-[#b5b8b933]" onPress={() => navigation.navigate('NightMode')}>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue">
                        {t("nightModeScreen.title")}
                    </Text>
                </TouchableOpacity>
            }
            {isEnabled &&
                <DoubleButton
                    clickable
                    marginBottom={false}
                    showIcon={false}
                    textOfLeftButton="1 раз за ночь"
                    textOfRightButton="по интервалу"
                    handlePressLeftButton={handleLeftButtonOnceAtNight}
                    handlePressRightButton={handleRightButtonByInterval}
                />
            }
        </View>
    </View>
  );
};

export default ToggleCannulationAtNight;