import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, KeyboardAvoidingView } from "react-native";
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
import Alert from "../../../components/Alert/Alert";

const ModalLiquidAmount = () => {
    const {t} = useTranslation();
    const nelaton = t("nelaton");

    const [liquidValue, setLiquidValue] = useState<string>('150');      // значение полосы прокрутки
    const [handleModalAlert, setHandleModalAlert] = useState<boolean>(false);
    const dispatch = useAppDispatch();                             // изменение состояние попапа
    const settings = useAppSelector((state) => state.appStateSlice); // состояние попапа
  
    const handleOnSubmitSave = () => { // при нажатии на кнопку Сохранить изменения
      dispatch(popupLiquidState(false));
      if(+liquidValue > 0) {
        if(settings.ifCountUrinePopupLiquidState){ // если пользователь выбрал измерять мочю, состояние меняется на экране Timer при нажатии кнопки Выполнено
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            catheterType: nelaton,
            whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
            amountOfReleasedUrine: `${liquidValue} ${settings.units.title}`,
            amountOfDrankFluids: '',
            timeStamp: format(new Date(), dateFormat)
          }));
          dispatch(addBadgesJournalScreen(1));
          dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
        }else{
          dispatch(addBadgesJournalScreen(1));
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            whenWasCanulisation:new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0'),
            amountOfDrankFluids: `${liquidValue} ${settings.units.title}`,
            amountOfReleasedUrine: '',
            timeStamp: format(new Date(), dateFormat)
          }));
        }
      }
    }

    const handleAddRecordWithoutUrineMeasure = () => {
      dispatch(popupLiquidState(false));
      if(settings.ifCountUrinePopupLiquidState){ // если пользователь выбрал измерять мочю, состояние меняется на экране Timer при нажатии кнопки Выполнено
        dispatch(addUrineDiaryRecord({
          id: uuidv4(),
          catheterType: nelaton,
          whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
          amountOfReleasedUrine: '',
          amountOfDrankFluids: '',
          timeStamp: format(new Date(), dateFormat)
        }));
        dispatch(addBadgesJournalScreen(1));
        dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
      }
    }
    
    const closeByPressButton = () => {
      dispatch(popupLiquidState(false)); // закрываем попап
      dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние, которое пользователь изменил на экране Timer при нажатии на кнопку, если пользователь выбрал измерение мочи
    }

    const modalAlert = () => setHandleModalAlert(!handleModalAlert);

    const customMl = ['100','200','300'];
    const customFlOz = ['5','7','10'];

  return (
  <Modal
    transparent={true}
    visible={settings.open}
    onRequestClose={closeByPressButton}
    animationType="fade">
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View className="bg-[#ffff] pt-10 pb-[30px] px-6 flex-1 h-full items-end">
          <TouchableOpacity
              onPress={settings.ifCountUrinePopupLiquidState ? modalAlert : closeByPressButton}
              activeOpacity={0.6}
              className={`p-2 flex-grow-0 w-8 h-8 items-center justify-center ${settings.ifCountUrinePopupLiquidState ? 'rounded-full opacity-20 bg-grey' : ''} `}>
            <ClosePopup width={15} height={15}/>
          </TouchableOpacity>

          <View className="flex-1 w-full items-center justify-center">
            {settings.ifCountUrinePopupLiquidState && !settings.scaleLiquidPopup &&         
              <View className="mb-4" style={{zIndex:22}}>
                  <TouchableOpacity onPress={handleAddRecordWithoutUrineMeasure}>
                    <Text style={{fontFamily:'geometria-regular'}} className="text-sm">{t("modalUrineOutput.not_measured")}</Text>
                    <Text style={{fontFamily:'geometria-regular'}} className="underline text-sm">
                      {t("modalUrineOutput.continue_without_recording_the_urine_volume")}
                    </Text>
                  </TouchableOpacity>
              </View>}

            <Text style={{fontFamily:'geometria-bold', zIndex:22}} className="text-xl mb-3 text-center">
              {settings.ifCountUrinePopupLiquidState ? t("modalUrineOutput.how_much_urine_was_released") : t("modalFluidIntake.how_much_fluid_did_you_drink")}
            </Text>
            <Glass customValue={+liquidValue} onValueChange={setLiquidValue}/>
             {!settings.ifCountUrinePopupLiquidState && 
             !settings.scaleLiquidPopup &&
               <View className="flex-row items-center py-2 flex-wrap gap-2">
                {(settings.units.title === 'fl oz' ? customFlOz : customMl).map((item, index) => 
                  <TouchableOpacity
                    onPress={() => setLiquidValue(item)}
                    key={index}
                    activeOpacity={.6}
                    className="p-1 items-center border bg-[#fff] border-main-blue rounded-xl">
                    <GlassIcon/> 
                    <Text style={{fontFamily:'geometria-regular'}} className="text-[#000] ital">{item} {settings.units.title}</Text>
                  </TouchableOpacity>
                )}
              </View>}
          </View>

          {!settings.scaleLiquidPopup &&     
          <TouchableOpacity onPress={handleOnSubmitSave} activeOpacity={0.6} className="py-[19px] px-[61px] mt-5 mx-auto items-center bg-main-blue rounded-[89px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base text-[#FFFFFF]">
              {t("save")}
            </Text>
          </TouchableOpacity>}
        </View>
        </KeyboardAvoidingView>
        <Alert key={'alertCloseModalCountUrine'} modalAlertState={handleModalAlert} setModalAlertState={setHandleModalAlert}>
          <View className="flex-1 justify-between items-center">
            <View>
              <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-center mb-2">{t("modalUrineOutput.noticeWhenPressClose.title")}</Text>
              <Text style={{fontFamily:'geometria-regular'}} className="text-lg text-center">{t("modalUrineOutput.noticeWhenPressClose.description")}</Text>
            </View>
            <TouchableOpacity onPress={modalAlert} activeOpacity={0.6} className="py-[19px] px-[61px] mt-5 mx-auto items-center bg-main-blue rounded-[89px]">
              <Text style={{fontFamily:'geometria-bold'}} className="text-base text-[#FFFFFF]">{t("modalUrineOutput.noticeWhenPressClose.got_it")}</Text>
            </TouchableOpacity>
          </View>
        </Alert>
  </Modal>
  );
};

export default ModalLiquidAmount;