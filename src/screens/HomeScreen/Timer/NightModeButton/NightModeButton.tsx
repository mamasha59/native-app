import { View, TouchableOpacity, Text } from "react-native";
import { useRef } from "react";
import LottieView from "lottie-react-native";

import ModalSelect from "../../../../components/ModalSelect/ModalSelect";
import { Option } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { switchCannulationAtNightNight, switchNightModeModal } from "../../../../store/slices/appStateSlicer";
import NightModeButtonSvg from "../../../../assets/images/iconsComponent/NightMode";

const NightModeButton = () => {
    const settings = useAppSelector(state => state.appStateSlice);
    const dispatch = useAppDispatch();

    const animationRef = useRef<LottieView>(null);

    const closeModal = () => {
        dispatch(switchNightModeModal(!settings.openModalNightMode));
    }

    const handlePressItem = (value: Option) => {
        if(value.value){
            dispatch(switchCannulationAtNightNight(
                {   
                    timeStamp: new Date().toString(),
                    value: !!value.value
                }
            ));
            animationRef.current && animationRef.current.play(0,78);
        }else {
            dispatch(switchCannulationAtNightNight(
                {   
                    timeStamp: new Date().toString(),
                    value: !!value.value
                }
            ));
            closeModal();
             animationRef.current && animationRef.current.play(78,0);
        }
        closeModal();        
    }

  return (
    <>
    <TouchableOpacity className="absolute top-0 right-0 w-[100px] h-[100px]" onPress={closeModal}>
        {/* <NightModeButtonSvg/> */}
        <LottieView
            ref={animationRef}
            source={require("../../../../assets/animation-night-mode.json")}
            style={{width: 100, height: 90}}
            autoPlay={false}
            loop={false}
            />
    </TouchableOpacity>
    <ModalSelect
        key={'nightbuttonhomescreen'}
        row
        showIcon={false}
        onItemPress={(item) => handlePressItem(item)}
        openModal={settings.openModalNightMode}
        setOpenModal={closeModal}
        title="Желаете включить ночной режим?"
        options={[{title: 'Да', value: true}, {title: 'Нет', value: false}]}
        children={
            <View className="items-center">
                <Text className="text-center text-base" style={{fontFamily:'geometria-regular'}}>
                    Таймер остановится, и вы прекратите получать уведомления, до утренней катетеризации.
                </Text>
            </View>
        }
    />
    </>
  );
};

export default NightModeButton;