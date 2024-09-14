import LottieView from "lottie-react-native";
import { View, Modal, Pressable, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

interface iAlert {
    children?: React.ReactNode,
    modalAlertState: boolean,
    setModalAlertState: (state:boolean) => void,
}

const Alert = ({children, modalAlertState, setModalAlertState}:iAlert) => {

    const handleStateModalCustomAlert = () => setModalAlertState(!modalAlertState);

    return (
    <Modal
        visible={modalAlertState}
        transparent
        onRequestClose={handleStateModalCustomAlert}
    >
        <Pressable
            onPress={(event) => event.target === event.currentTarget && handleStateModalCustomAlert()}
            className="flex-1 justify-center items-center mx-auto  bg-[#00000037] w-full h-full">
            <View style={{width: width / 1.2, maxHeight: height / 2.30}} className="bg-white p-3 px-7 w-full flex-1">
                <View className="w-[100px] h-[100px] mx-auto">
                    {/* <Text style={{fontFamily:'geometria-bold'}} className="text-7xl text-center text-main-blue">!</Text> */}
                    <LottieView
                        autoPlay
                        style={{
                        width: '100%',
                        height: '100%',
                        }}
                        source={require('../../assets/exlamation-point.json')}
                    />
                </View>
                {children}
            </View>
        </Pressable>
    </Modal>
  );
};

export default Alert;
