import { View, Text, TouchableOpacity, Dimensions, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

import { ClosePopup } from "../../assets/images/icons";
import SetTimeInterval from "../SetTimeInterval/SetTimeInterval";
import { iTimePicker } from "../../types";

const screen = Dimensions.get('window');

interface iModalSetInterval {
    showModalSetInterval: boolean,
    pressSaveButton?: () => void,
    newInterval: iTimePicker,
    setNewInterval: React.Dispatch<React.SetStateAction<iTimePicker>>,
    handleOpenModalChangeInterval: () => void,
    title: string,
    is24Hours: boolean,
    height?: number,
    showError?:boolean,
    errorText?:string,
}

const ModalSetInterval = (props:iModalSetInterval) => { // here we use another Modal, cause there is a trouble using native modal with Wheel picker
    const {t} = useTranslation();
    const {
        showModalSetInterval,
        pressSaveButton,
        newInterval,
        setNewInterval,
        handleOpenModalChangeInterval,
        title,
        is24Hours,
        height = 3,
        showError,
        errorText
    } = props;

  return (
    <Modal onRequestClose={handleOpenModalChangeInterval} animationType="fade" className=" border flex-1" transparent visible={showModalSetInterval}>
        <View className="absolute top-0 left-0 right-0 flex-1 h-full w-full bg-[#2f2f2f53]">
            {showError && 
            <View className="absolute left-0 right-0 w-full top-1/2 bg-white p-3 rounded-2xl">
                <Text className="text-center text-lg text-error leading-5" style={{fontFamily:'geometria-bold'}}>
                    {errorText}
                </Text>
            </View>}
            <View style={{width: screen.width, height: screen.height / height}} className="bg-white p-10 rounded-t-2xl absolute bottom-0">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base text-center min-h-[2px]">
                    {title}
                </Text>
                <View className="flex-row justify-center items-center mb-3">
                    <SetTimeInterval is24Hours={is24Hours} visibleRest={1} interval={newInterval} setInterval={setNewInterval}/>
                </View>
                <TouchableOpacity onPress={handleOpenModalChangeInterval} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={pressSaveButton} className="w-full max-w-[250px] mx-auto" activeOpacity={0.6}>
                    <LinearGradient
                        colors={['#83B759', '#609B25']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        locations={[0.0553, 0.9925]}
                        className="rounded-[43px]">
                        <Text style={{fontFamily:'geometria-bold'}} className="text-base text-white text-center px-6 py-3">
                            {t("save")}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
};

export default ModalSetInterval;
