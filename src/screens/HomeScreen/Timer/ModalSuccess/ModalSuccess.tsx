import { View, Text, TouchableOpacity } from "react-native";
import { addSeconds, format, parse, subSeconds } from "date-fns";
import { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";

import NotificationIcon from "../../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import { setShowModalSuccess } from "../../../../store/slices/timerStatesSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import ModalSelect from "../../../../components/ModalSelect/ModalSelect";

const ModalSuccess = () => {
    const {t} = useTranslation();
    
    const dispatch = useAppDispatch();
    const {interval, yellowInterval, showModalSuccess} = useAppSelector(state => state.timerStates);
    const {timeSleepStart, timeOfNoticeAtNightOneTime} = useAppSelector(state => state.nightOnBoarding);
    const {doubleButtonProfileScreenClickable} = useAppSelector((state) => state.appStateSlice);

    const [nextCatheterizationTime, setNextCatheterizationTime] = useState<string>('');
    const [changeBody, setChangeBody] = useState<boolean>(false);
  
    useEffect(() => {
      const now = new Date(); // Текущее время
      const futureDate = addSeconds(now, interval); // Добавляем интервал в секундах
      const futureDateMinusSubtract = subSeconds(futureDate, yellowInterval * 60); // Вычитаем секунды
      // Форматируем даты в строку
      const formattedStartTime = format(futureDateMinusSubtract, 'HH:mm');
      const formattedEndTime = format(futureDate, 'HH:mm');
      const timeSleepStartObject = parse(timeSleepStart, 'HH:mm', new Date())
    
      setNextCatheterizationTime(`${formattedStartTime} - ${formattedEndTime}`);
      
      if(doubleButtonProfileScreenClickable.leftButton){
        if(futureDateMinusSubtract >= timeSleepStartObject){
          setChangeBody(true);
        }
      }else {
        setChangeBody(false);
      }
    },[showModalSuccess])
  
  return (
    <ModalSelect
      openModal={showModalSuccess}
      setOpenModal={() => dispatch(setShowModalSuccess(false))}
      showIcon={true}
      logo={undefined}
      height={2.4}
      >
        <View className="items-center">
          <View style={{backgroundColor: 'transparent'}} className=" w-[200px] h-[200px]">
            <LottieView
              source={require("../../../../assets/success.json")}
              style={{width: 200, height: 200, backgroundColor: 'transparent'}}
              autoPlay
              loop
            />
          </View>
          <View className="items-center">
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-3xl text-center">
              {t("modalCatheterizationCompleted.excellent")}
            </Text>
            <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-xl text-center">
              {t("modalCatheterizationCompleted.catheterization_completed")}
            </Text>
            <Text style={{fontFamily:'geometria-regular'}} className="text-[#000] text-xl text-start">
              {t("modalCatheterizationCompleted.next_catheterization")}
            </Text>
            {!changeBody 
              ? <View className="items-center flex-row justify-center py-3"> 
                  <NotificationIcon color={'#000'} width={20}/>
                  <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-3xl text-center ml-2">{nextCatheterizationTime}</Text> 
                </View>
              : <View className="items-center flex-row justify-center py-3"> 
                  <NotificationIcon color={'#000'} width={20}/>
                  <Text style={{fontFamily:'geometria-bold'}} className="text-[#000] text-3xl text-center ml-2">{timeOfNoticeAtNightOneTime}</Text> 
                </View>
          }
          </View>
          <TouchableOpacity activeOpacity={.8} onPress={() => dispatch(setShowModalSuccess(false))} className="bg-main-blue px-3 py-3 w-full rounded-lg">
            <Text style={{fontFamily:'geometria-bold'}} className="text-xl text-center text-[#fff]">{t("ok")}</Text>
          </TouchableOpacity>
        </View>
    </ModalSelect>
  );
};

export default ModalSuccess;
