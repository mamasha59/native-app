import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { addSeconds, format, subSeconds } from "date-fns";
import { useEffect, useState } from "react";

import NotificationIcon from "../../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setShowModalSuccess } from "../../../../store/slices/timerStatesSlice";
import LottieView from "lottie-react-native";

const windowSize = Dimensions.get('window');

const ModalSuccess = () => {
    const settings = useAppSelector(state => state.timerStates);
    const dispatch = useAppDispatch();

    const [nextCathTime, setNextCathTime] = useState<string>('');
  
    useEffect(() => {
      const now = new Date(); // Текущее время
      const futureDate = addSeconds(now, settings.interval); // Добавляем интервал в секундах
      const futureDateMinusSubtract = subSeconds(futureDate, settings.yellowInterval * 60); // Вычитаем секунды
    
      // Форматируем даты в строку
      const formattedStartTime = format(futureDateMinusSubtract, 'HH:mm');
      const formattedEndTime = format(futureDate, 'HH:mm');
    
      setNextCathTime(`${formattedStartTime} - ${formattedEndTime}`);
      
    },[settings.showModalSuccess])
  
  return (
    <View>
      <Modal
        onSwipeComplete={() => dispatch(setShowModalSuccess(false))}
        className="justify-end m-0"
        isVisible={settings.showModalSuccess}
        swipeDirection={'down'}
        useNativeDriver
        propagateSwipe
        hideModalContentWhileAnimating
        >
        <View style={{height: windowSize.height / 2 }} className="bg-[#fff] rounded-t-[40px] p-5 items-center justify-between">
            <View style={{backgroundColor: 'transparent'}} className="-mt-20 w-[200px] h-[200px]">
                <LottieView
                  source={require("../../../../assets/dance.json")}
                  style={{width: 200, height: 200, backgroundColor: 'transparent'}}
                  autoPlay
                  loop
                />
            </View>
            <>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-3xl text-center">Отлично!</Text>
                <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-xl text-center">Катетеризация выполнена!</Text>
                <Text style={{fontFamily:'geometria-regular'}} className="text-[#000] text-xl text-start">Следующая катетеризация:</Text>
                <View className="items-center flex-row justify-center py-3"> 
                    <NotificationIcon color={'#000'} width={20}/>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-3xl text-center ml-2">{nextCathTime}</Text> 
                </View>
            </>
          <TouchableOpacity onPress={() => dispatch(setShowModalSuccess(false))} className="bg-main-blue px-3 py-3 w-full rounded-lg">
            <Text style={{fontFamily:'geometria-bold'}} className="text-xl text-center text-[#fff]">Хорошо</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ModalSuccess;
