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
import ModalOneNoticeAtNight from "./ModalOneNoticeAtNight/ModalOneNoticeAtNight";
import NotificationIcon from "../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";

const ToggleCannulationAtNight = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const settingsNighMode = useAppSelector((state) => state.nightOnBoarding); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const toggledButton = useAppSelector((state) => state.appStateSlice.doubleButtonProfileScreenClickable); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)

    const [toggleNightMode, setToggleNightMode] = useState<boolean>(settingsNighMode.cannulationAtNight);
    const [modalOnceAtNight, setModalOnceAtNight] = useState<boolean>(false);

    const currentRoute = useNavigationState(state => state.routes[state.index].name);
    const navigation = useNavigation<StackNavigationRoot>();
    
    useEffect(() => {
        setToggleNightMode(settingsNighMode.cannulationAtNight);
    },[settingsNighMode.cannulationAtNight]);

    const handleDeniedToggleUseAtNight = () => {
        const newIsEnabled = !toggleNightMode;
        setToggleNightMode(newIsEnabled);

        dispatch(setWhetherDoCannulationAtNight(newIsEnabled));
        if (!newIsEnabled && currentRoute !== 'FirstDataScreen') {
            navigation.navigate('NightMode');
        }
    };

    const handleModalOneNoticeAtNight = () => setModalOnceAtNight(!modalOnceAtNight);

    const handleLeftButtonOnceAtNight = () => {
        handleModalOneNoticeAtNight();
        dispatch(switchCheckedButtonProfileScreen({leftButton: true, rightButton: false}));
    }

    const handleRightButtonByInterval = () => {
        dispatch(switchCheckedButtonProfileScreen({leftButton: false, rightButton: true}));
    }

  return (
    <View className="items-center my-4 bg-[#ecf0f1] p-2 rounded-xl flex-1">
        <SwitchToggle
            key={'togglenightmode'}
            title={t('toggleCannulationAtNightComponent.title')}
            onValueChange={handleDeniedToggleUseAtNight}
            isEnabled={toggleNightMode}
        />
        <View className="flex-1 w-full items-center mt-2">
            {!toggleNightMode &&
                <TouchableOpacity className="p-2 bg-[#b5b8b933]" onPress={() => navigation.navigate('NightMode')}>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue">
                        {t("nightModeScreen.title")}
                    </Text>
                </TouchableOpacity>
            }
            {toggleNightMode &&
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
            <ModalOneNoticeAtNight
                key={'ModalOneNoticeAtNight'}
                handleModalOnceAtNight={handleModalOneNoticeAtNight}
                modalOnceAtNight={modalOnceAtNight}/>
        </View>
        {toggleNightMode &&
            <View className="flex-row justify-between mt-2">
                <TouchableOpacity onPress={handleLeftButtonOnceAtNight} className="flex-1 items-center py-1 flex-row justify-center">
                    <NotificationIcon color={'#9966AA'} width={20}/>
                    <Text
                        style={{fontFamily:'geometria-bold'}}
                        className={`text-main-blue text-start ml-1 ${toggledButton.rightButton && 'line-through'}`}>
                        {settingsNighMode.timeOfNoticeAtNightOneTime}
                    </Text>
                </TouchableOpacity>
                <View className="flex-1"></View>
            </View>
        }
    </View>
    
  );
};

export default ToggleCannulationAtNight;