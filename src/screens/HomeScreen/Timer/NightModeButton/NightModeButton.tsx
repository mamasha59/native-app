import { View, TouchableOpacity, Text } from "react-native";
import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import { v4 as uuidv4 } from 'uuid';

import ModalSelect from "../../../../components/ModalSelect/ModalSelect";
import { Option } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ifCountUrineChangeState, popupLiquidState, switchCannulationAtNightMode, switchNightModeModal } from "../../../../store/slices/appStateSlicer";
import { addUrineDiaryRecord } from "../../../../store/slices/journalDataSlice";
import { dateFormat } from "../../../../utils/const";
import { setShowModalSuccess } from "../../../../store/slices/timerStatesSlice";

const NightModeButton = () => {
    const {t} = useTranslation();

    const settings = useAppSelector(state => state.appStateSlice);
    const dispatch = useAppDispatch();
    const animationRef = useRef<LottieView>(null);

    const handleModal = () => dispatch(switchNightModeModal(!settings.openModalNightMode));

    const handlePressItem = (value: Option) => {
        const newValue = !!value.value;
        if(newValue) {
            dispatch(switchCannulationAtNightMode({   
                timeStamp: new Date().toString(),
                value: newValue
            }));
        }else {
            if(settings.urineMeasure){
                dispatch(popupLiquidState(true));
                dispatch(ifCountUrineChangeState(true));
            }else{
                dispatch(addUrineDiaryRecord({
                    id: uuidv4(),
                    whenWasCatheterization: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`, 
                    catheterType: t("nelaton"),
                    timeStamp: format(new Date(), dateFormat),
                    amountOfDrankFluids: {
                        value: ''
                    },
                    amountOfReleasedUrine: ''
                  }));
            }
            dispatch(setShowModalSuccess(true));
        }
        
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
        <TouchableOpacity className="w-[90px] h-[65px] -mr-2" onPress={handleModal}>
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
            height={2.6}
            showIcon={false}
            onItemPress={(item) => handlePressItem(item)}
            openModal={settings.openModalNightMode}
            setOpenModal={handleModal}
            title={`${t("modalNightModeHomeScreen.enable")} «${t("night_mode")}»?`}
            options={[{title: t("yes"), value: true}, {title: t("no"), value: false}]}
            children={
                <View className="items-center flex-1">
                    <Text className="text-center text-base" style={{fontFamily:'geometria-regular'}}>
                        {t("modalNightModeHomeScreen.description")}
                    </Text>
                    <Text className="text-center text-xs underline" style={{fontFamily:'geometria-regular'}}>
                    {t("modalNightModeHomeScreen.hint")} {`«${t("night_mode")}»`}
                    </Text>
                </View>
            }
        />
    </>
  );
};

export default NightModeButton;