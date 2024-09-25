import { View, TouchableOpacity, Text } from "react-native";
import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

import ModalSelect from "../../../../components/ModalSelect/ModalSelect";
import { Option } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { switchCannulationAtNightMode, switchNightModeModal } from "../../../../store/slices/appStateSlicer";
import { setWhetherDoCannulationAtNight } from "../../../../store/slices/nightStateSlice";
import { useTranslation } from "react-i18next";

const NightModeButton = () => {
    const {t} = useTranslation();

    const settings = useAppSelector(state => state.appStateSlice);
    const dispatch = useAppDispatch();
    const animationRef = useRef<LottieView>(null);

    const handleModal = () => dispatch(switchNightModeModal(!settings.openModalNightMode));

    const handlePressItem = (value: Option) => {
        const newValue = !!value.value;
        dispatch(switchCannulationAtNightMode({   
            timeStamp: new Date().toString(),
            value: newValue
        }));
        // dispatch(setWhetherDoCannulationAtNight(!!!value.value));

        handleModal();        
    };

    useEffect(() => {
        if (animationRef.current) {
            if (settings.cannulationAtNight.value) {
                animationRef.current.play(0, 78);
            } else {
                animationRef.current.play(78, 0);
            }
        }
    },[settings.cannulationAtNight.value])

  return (
    <>
        <TouchableOpacity className="w-[90px] h-[65px]" onPress={handleModal}>
            <LottieView
                ref={animationRef}
                source={require("../../../../assets/animation-night-mode.json")}
                style={{width: '100%', height: '100%'}}
                autoPlay={false}
                loop={false}
            />
        </TouchableOpacity>
        <ModalSelect
            key={'night-button-home-screen'}
            row
            height={3}
            showIcon={false}
            onItemPress={(item) => handlePressItem(item)}
            openModal={settings.openModalNightMode}
            setOpenModal={handleModal}
            title={`Включить «${t("night_mode")}»?`}
            options={[{title: 'Да', value: true}, {title: 'Нет', value: false}]}
            children={
                <View className="items-center flex-1">
                    <Text className="text-center text-base" style={{fontFamily:'geometria-regular'}}>
                        Таймер остановится, и вы прекратите получать уведомления, до утренней катетеризации.
                    </Text>
                    <Text className="text-center text-xs" style={{fontFamily:'geometria-regular'}}>
                        время можно изменить на экране {`«${t("night_mode")}»`}
                    </Text>
                </View>
            }
        />
    </>
  );
};

export default NightModeButton;