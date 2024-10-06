import { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Keyboard, Vibration} from "react-native";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import { ClosePopup } from "../../../assets/images/icons";
import GlassIcon from "../../../assets/images/iconsComponent/GlassIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, ifCountUrineChangeState, popupLiquidState } from "../../../store/slices/appStateSlicer";
import Glass from "./Glass/Glass";
import { dateFormat } from "../../../utils/const";
import WithoutMeasuring from "./WithoutMeasuring/WithoutMeasuring";
import { setShowModalSuccess } from "../../../store/slices/timerStatesSlice";

const ModalLiquidAmount = ({setToastOpened}:{setToastOpened: (value:boolean) => void}) => {
    const {t} = useTranslation();
    const nelaton = t("nelaton");
    
    const dispatch = useAppDispatch();                             // изменение состояние попапа
    const settings = useAppSelector((state) => state.appStateSlice); // состояние попапа
    const {urineColor} = useAppSelector((state) => state.journal); // состояние попапа
  
    const [liquidValue, setLiquidValue] = useState<string>('150');      // значение полосы прокрутки
    const [modalAlert, setModalAlert] = useState<boolean>(false);
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
  
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

    const triggerVibration = () => Vibration.vibrate(7, false);
  
    const handleOnSubmitSave = () => { // при нажатии на кнопку Сохранить изменения
      triggerVibration();
      dispatch(popupLiquidState(false));
      if(+liquidValue > 0) {
        if(settings.ifCountUrinePopupLiquidState){ // если пользователь выбрал измерять мочу, состояние меняется на экране Timer при нажатии кнопки Выполнено
          dispatch(setShowModalSuccess(true));      // показывает модальное окно об успешной катетеризации
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            catheterType: nelaton,
            whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
            amountOfReleasedUrine: `${liquidValue} ${settings.units.title}`,
            urineColor: urineColor,
            amountOfDrankFluids: '',
            timeStamp: format(new Date(), dateFormat)
          }));
          dispatch(addBadgesJournalScreen(1));
          dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
        }else{
          dispatch(addBadgesJournalScreen(1));
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            whenWasCanulisation: new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0'),
            amountOfDrankFluids: `${liquidValue} ${settings.units.title}`,
            amountOfReleasedUrine: '',
            timeStamp: format(new Date(), dateFormat)
          }));
          setToastOpened(true);
        }
      }
    }

    const closeByPressButton = () => {
      dispatch(popupLiquidState(false)); // закрываем попап
      dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние, которое пользователь изменил на экране Timer при нажатии на кнопку, если пользователь выбрал измерение мочи
    }

    const handleModalAlert = () =>  setModalAlert(!modalAlert);
    
    const customMl = ['100','200','300'];
    const customFlOz = ['5','7','10'];

  return (
  <Modal
    transparent={true}
    visible={settings.open}
    onRequestClose={closeByPressButton}
    animationType="fade">
        <View className="bg-white py-3 flex-1 h-full items-end">
          <TouchableOpacity
              onPress={settings.ifCountUrinePopupLiquidState ? handleModalAlert : closeByPressButton}
              activeOpacity={0.6}
              className={`p-2 w-8 mx-3 items-center justify-center ${settings.ifCountUrinePopupLiquidState ? 'rounded-full opacity-20 bg-grey' : ''} `}>
            <ClosePopup width={15} height={15}/>
          </TouchableOpacity>

          <View className="flex-1 h-full w-full items-center justify-center">
            {settings.ifCountUrinePopupLiquidState && <WithoutMeasuring modalAlert={modalAlert} setModalAlert={setModalAlert} handleModalAlert={handleModalAlert}/>}
            
            <Text style={{fontFamily:'geometria-bold'}} className="text-xl mb-4 text-center">
              {settings.ifCountUrinePopupLiquidState ? t("modalUrineOutput.how_much_urine_was_released") : t("modalFluidIntake.how_much_fluid_did_you_drink")}
            </Text>

            <Glass customValue={+liquidValue} onValueChange={setLiquidValue}/>

            {!settings.ifCountUrinePopupLiquidState && !keyboardVisible &&
              <View className="flex-row items-center mt-2 justify-center">
                {(settings.units.title === 'fl oz' ? customFlOz : customMl).map((item, index) => 
                  <TouchableOpacity
                    onPress={() => setLiquidValue(item)}
                    key={index}
                    activeOpacity={.6}
                    className="p-1 mx-2 items-center border bg-white border-main-blue rounded-xl">
                    <GlassIcon/> 
                    <Text style={{fontFamily:'geometria-bold'}} className="text-black">{item} {settings.units.title}</Text>
                  </TouchableOpacity>
                )}
              </View>
            }
          </View>
          {!keyboardVisible && 
            <TouchableOpacity
              onPress={handleOnSubmitSave}
              activeOpacity={0.6}
              className="py-5 px-16 mt-4 mx-auto items-center bg-main-blue rounded-full">
              <Text style={{fontFamily:'geometria-bold'}} className="text-base text-white">
                {t("save")}
              </Text>
            </TouchableOpacity>
          }
         </View>
  </Modal>
  );
};

export default ModalLiquidAmount;