import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";

import { ClosePopup } from "../../../assets/images/icons";
import GlassIcon from "../../../assets/images/iconsComponent/GlassIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, ifCountUrineChangeState, popupLiquidState } from "../../../store/slices/appStateSlicer";
import Glass from "./Glass/Glass";
import { dateFormat } from "../../../utils/const";

const ModalLiquidAmount = () => {

    const [liquidValue, setLiquidValue] = useState<string>('');      // значение полосы прокрутки
    const dispatch = useAppDispatch();                             // изменение состояние попапа
    const settings = useAppSelector((state) => state.appStateSlice); // состояние попапа
  
    const handleOnSubmitSave = () => { // при нажатии на кнопку Сохранить изменения
      dispatch(popupLiquidState(false));
      if(+liquidValue > 0) {
        if(settings.ifCountUrinePopupLiquidState){ // если пользователь выбрал измерять мочю, состояние меняется на экране Timer при нажатии кнопки Выполнено
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            catheterType:'Нелатон',
            whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
            amountOfReleasedUrine: +liquidValue,
            timeStamp: format(new Date(), dateFormat),
          }));
          dispatch(addBadgesJournalScreen(1));
          dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
        }else{
          dispatch(addBadgesJournalScreen(1));
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            whenWasCanulisation:new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0'),
            amountOfDrankFluids: +liquidValue,
            timeStamp: format(new Date(), dateFormat),
          }));
        }
      }
    }

    const handleAddRecordWithoutUrineMeasure = () => {
      dispatch(popupLiquidState(false));
      if(settings.ifCountUrinePopupLiquidState){ // если пользователь выбрал измерять мочю, состояние меняется на экране Timer при нажатии кнопки Выполнено
        dispatch(addUrineDiaryRecord({
          id: uuidv4(),
          catheterType:'Нелатон',
          whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
          amountOfReleasedUrine: null,
          timeStamp: format(new Date(), dateFormat),
        }));
        dispatch(addBadgesJournalScreen(1));
        dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
      }
    }
    
    const closeByPressButton = () => {
      dispatch(popupLiquidState(false)); // закрываем попап
      dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние, которое пользователь изменил на экране Timer при нажатии на кнопку, если пользователь выбрал измерение мочи
    }

    const handleIfCountUrine = () => {
      if(settings.ifCountUrinePopupLiquidState){
        Alert.alert('Пожалуйста, укажите сколько вы выписали.', 'Если вы не хотите постоянно указывать значение, то это можно изменить на экране Профиля.', 
        [{
          text: 'Хорошо, я понял.',
        }]
        );
      }
    }

    const customMl = ['100','200','300'];

  return (
  <Modal
    transparent={true}
    visible={settings.open}
    onRequestClose={closeByPressButton}
    animationType="fade">
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View className="bg-[#ffff] pt-10 pb-[30px] px-6 flex-1 h-full items-end">
          <TouchableOpacity
              onPress={settings.ifCountUrinePopupLiquidState ? handleIfCountUrine : closeByPressButton}
              activeOpacity={0.6}
              className={`p-2 flex-grow-0 w-8 h-8 items-center justify-center ${settings.ifCountUrinePopupLiquidState ? 'rounded-full opacity-20 bg-grey' : ''} `}>
            <ClosePopup width={15} height={15}/>
          </TouchableOpacity>

          <View className="flex-1 w-full items-center justify-center">
            {settings.ifCountUrinePopupLiquidState && !settings.scaleLiquidPopup &&         
              <View className="mb-4">
                  <Text style={{fontFamily:'geometria-regular'}}>Не измеряли?</Text>
                  <TouchableOpacity onPress={handleAddRecordWithoutUrineMeasure} className="py-2">
                    <Text style={{fontFamily:'geometria-regular'}} className="underline">продолжить без записи обьема выделеной мочи</Text>
                  </TouchableOpacity>
              </View>}

            <Text style={{fontFamily:'geometria-bold'}} className="text-2xl mb-3 text-center">{settings.ifCountUrinePopupLiquidState ? 'Сколько выделено мочи?' : 'Сколько вы выпили жидкости?'}</Text>
            <Glass customValue={+liquidValue} onValueChange={setLiquidValue}/>
             {!settings.ifCountUrinePopupLiquidState && 
             !settings.scaleLiquidPopup &&
               <View className="flex-row items-center py-2 flex-wrap gap-2">
                {customMl.map((item, index) => 
                  <TouchableOpacity onPress={() => setLiquidValue(item)} key={index} activeOpacity={.6} className="p-1 items-center border bg-[#fff] border-main-blue rounded-xl">
                    <GlassIcon/> 
                    <Text style={{fontFamily:'geometria-regular'}} className="text-[#000]">{item} мл.</Text>
                  </TouchableOpacity>
                )}
              </View>}
          </View>

     {!settings.scaleLiquidPopup &&     
          <TouchableOpacity onPress={handleOnSubmitSave} activeOpacity={0.6} className="py-[19px] px-[61px] mt-5 mx-auto items-center bg-main-blue rounded-[89px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">Сохранить изменения</Text>
          </TouchableOpacity>}
        </View>
        </KeyboardAvoidingView>
  </Modal>
  );
};

export default ModalLiquidAmount;