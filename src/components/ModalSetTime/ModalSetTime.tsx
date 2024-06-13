import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { ClosePopup } from "../../assets/images/icons";
import SetTimeInterval from "../SetTimeInterval/SetTimeInterval";
import { LinearGradient } from "expo-linear-gradient";

interface iModalSelect {
    showModalSetInterval: boolean,
    handlePressSave: () => void,
    close: () => void,
    newInterval: {
        selectedIndexHour: number;
        selectedIndexMinutes: number;
    },
    setNewInterval: React.Dispatch<React.SetStateAction<{
        selectedIndexHour: number;
        selectedIndexMinutes: number;
    }>>
}

const windowWidth = Dimensions.get('window').width;

const ModalSetTime = ({showModalSetInterval, handlePressSave, close, newInterval, setNewInterval}:iModalSelect) => {

  return (
    <Modal isVisible={showModalSetInterval} animationIn={'slideInUp'} animationOut={'zoomOut'} useNativeDriverForBackdrop onBackButtonPress={close}>
        <View style={{width:windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-[#ffff] p-10">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center">Выберите новый интервал</Text>
                <View className="flex-row justify-center items-center mb-3">
                    <SetTimeInterval visibleRest={1} interval={newInterval} setInterval={setNewInterval}/>
                </View>
                <TouchableOpacity onPress={close} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressSave} className="flex-grow-0 min-w-[141px]" activeOpacity={0.6}>
                    <LinearGradient
                        colors={['#83B759', '#609B25']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        locations={[0.0553, 0.9925]}
                        className="rounded-[43px]">
                        <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF] text-center px-6 py-3">Подтвердить новый интервал</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
    </Modal>  
  );
};

export default ModalSetTime;
