import { memo, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";

import { ClosePopup } from "../../../assets/images/icons";
import GlassIcon from "../../../assets/images/iconsComponent/GlassIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, ifCountUrineChangeState, popupLiquidState } from "../../../store/slices/appStateSlicer";
import Glass from "./Glass/Glass";

const ModalLiquidAmount = () => {

    const [liquidValue, setLiquidValue] = useState<number>(0);      // значение полосы прокрутки
    const dispatch = useAppDispatch();                             // изменение состояние попапа
    const statePopup = useAppSelector((state) => state.appStateSlice); // состояние попапа
  
    const handleOnSubmitSave = () => { // при нажатии на кнопку Сохранить изменения
      dispatch(popupLiquidState(false));
      if(liquidValue > 0) {
        if(statePopup.ifCountUrinePopupLiquidState){ // если пользователь выбрал измерять мочю, состояние меняется на экране Timer при нажатии кнопки Выполнено
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            catheterType:'Нелатон',
            whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
            amountOfReleasedUrine: +liquidValue,
            timeStamp: format(new Date(), 'MM/dd/yyyy HH:mm:ss'),
          }));
          dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
        }else{
          dispatch(addBadgesJournalScreen(1));
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            whenWasCanulisation:new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0'),
            amountOfDrankFluids: +liquidValue,
            timeStamp: format(new Date(), 'MM/dd/yyyy HH:mm:ss'),
          }))
        }
      }
    }
    
    const closeByPressButton = () => {
      dispatch(popupLiquidState(false)); // закрываем попап
      dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние, которое пользователь изменил на экране Timer при нажатии на кнопку, если пользователь выбрал измерение мочи
    }

    const handleIfCountUrine = () => {
      if(statePopup.ifCountUrinePopupLiquidState){
        Alert.alert('Пожалуйста, укажите сколько вы выписали.', 'Если вы не хотите постоянно указывать значение, то это можно изменить на экране Профиля.', 
        [{
          text: 'Хорошо, я понял.',
        }]
        );
      }
    }

    const handlePressCustomMl1 = (item:string) => { // при нажатии на иконки с кол-вом мл
      if(item) setLiquidValue(+item) 
    }
    const customMl = ['200','500','600'];

  return (
  <Modal
    transparent={true}
    visible={statePopup.open}
    onRequestClose={closeByPressButton}
    animationType="fade">
        <View className="bg-[#ffff] pt-10 pb-[30px] px-6 flex-1 h-full items-end">
          <TouchableOpacity
              onPress={statePopup.ifCountUrinePopupLiquidState ? handleIfCountUrine : closeByPressButton}
              activeOpacity={0.6}
              className={`p-2 flex-grow-0 w-8 h-8 items-center justify-center ${statePopup.ifCountUrinePopupLiquidState ? 'rounded-full opacity-20 bg-grey' : ''} `}>
            <ClosePopup width={15} height={15}/>
          </TouchableOpacity>

          <View className="flex-1 w-full items-center">
            <Text style={{fontFamily:'geometria-bold'}} className="text-2xl mb-3 text-center">{statePopup.ifCountUrinePopupLiquidState ? 'Сколько ты выссал?' : 'Сколько вы выпили жидкости?'}</Text>
            <Glass customValue={liquidValue} onValueChange={setLiquidValue}/>
            <View className="flex-row items-center py-2 flex-wrap gap-2">
              {customMl.map((item, index) => 
                <TouchableOpacity onPress={() => handlePressCustomMl1(item)} key={index} activeOpacity={.6} className="p-1 items-center border border-main-blue rounded-xl">
                  <GlassIcon/> 
                  <Text style={{fontFamily:'geometria-regular'}} className="text-[#000]">{item} мл.</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={handleOnSubmitSave} activeOpacity={0.6} className="py-[19px] px-[61px] mx-auto items-center bg-main-blue rounded-[89px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">Сохранить изменения</Text>
          </TouchableOpacity>
        </View>
  </Modal>
  );
};

export default memo(ModalLiquidAmount);