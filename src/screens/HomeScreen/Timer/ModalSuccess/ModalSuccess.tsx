import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import NotificationIcon from "../../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setShowModalSuccess } from "../../../../store/slices/timerStatesSlice";

const windowSize = Dimensions.get('window');

const ModalSuccess = () => {
    const settings = useAppSelector(state => state.timerStates.showModalSuccess);
    const dispatch = useAppDispatch();

  return (
    <View>
      <Modal
        onSwipeComplete={() => dispatch(setShowModalSuccess(false))}
        className="justify-end m-0"
        isVisible={settings}
        swipeDirection={'down'}
        useNativeDriver
        propagateSwipe
        hideModalContentWhileAnimating
        >
        <View style={{height: windowSize.height / 2 }} className="bg-[#fff] rounded-t-[40px] p-5 items-center justify-between">
            <View className="-mt-20">
                <Image source={require('../../../../assets/images/homePageIcons/successCath.png')} style={{ width: 150, height: 150 }} />
            </View>
            <View className="">
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-4xl text-center">Отлично!</Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-2xl text-center">Катетеризация выполнена!</Text>
                <View className="mt-2">
                    <Text style={{fontFamily:'geometria-regular'}} className="text-[#000] text-xl text-start mb-4">Следующая катетеризация:</Text>
                    <View className="items-center flex-row justify-center"> 
                        <NotificationIcon color={'#000'} width={20}/>
                        <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-3xl text-center ml-2">15:00 - 14:00</Text> 
                    </View>
                </View>
            </View>
          <TouchableOpacity onPress={() => dispatch(setShowModalSuccess(false))} className="bg-main-blue px-3 py-3 w-full rounded-lg">
            <Text style={{fontFamily:'geometria-bold'}} className="text-xl text-center text-[#fff]">Хорошо</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalSuccess;
