import { memo, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Dimensions, TextInput, Pressable, Alert } from "react-native";
import { Slider } from '@miblanchard/react-native-slider';
import { v4 as uuidv4 } from 'uuid';

import { ClosePopup } from "../../../assets/images/icons";
import GlassIcon from "../../../assets/images/iconsComponent/GlassIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen, ifCountUrineChangeState, popupLiquidState } from "../../../store/slices/appStateSlicer";
import { format } from "date-fns";

const windowHeight = Dimensions.get('window').height;

const ModalLiquidAmount = () => {

    const [liquidValue, setLiquidValue] = useState<number>(0);      // значение полосы прокрутки
    const [focusInput, setFocusInput] = useState<boolean>(false);
    const dispatch = useAppDispatch();                             // изменение состояние попапа
    const statePopup = useAppSelector((state) => state.appStateSlice); // состояние попапа

    const handleOnSubmitSave = () => { // при нажатии на кнопку Сохранить изменения
      dispatch(popupLiquidState(false));
      if(liquidValue > 0) {
        setLiquidValue(liquidValue); //записываем значени жидкости в liquidValue
        if(statePopup.ifCountUrinePopupLiquidState){                // если пользователь выбрал измерять мочю, состояние меняется на экране Timer при нажатии кнопки Выполнено
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            catheterType:'Нелатон',
            whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
            amountOfReleasedUrine: liquidValue,
            timeStamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          }));
          dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
        }else{
          dispatch(addBadgesJournalScreen(1));
          dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            whenWasCanulisation:new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0'),
            amountOfDrankFluids: liquidValue,
            timeStamp: new Date().toISOString(),
          }))
        }
        setLiquidValue(0);  // сбрасываем рейдж при сабмите
        setFocusInput(!focusInput); // убираем фокус с инпута
      }
    }

    const closeByPressButton = () => {
      dispatch(popupLiquidState(false)); // закрываем попап
      dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние, которое пользователь изменил на экране Timer при нажатии на кнопку, если пользователь выбрал измерение мочи
      setLiquidValue(0);  // сбрасываем рейдж при сабмите
      setFocusInput(!focusInput);
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
      <Pressable disabled={statePopup.ifCountUrinePopupLiquidState && true} onPress={(event) => event.target === event.currentTarget && closeByPressButton()} className="justify-end flex-1 bg-[#10101035]">
        <View style={{minHeight: windowHeight * 0.45}} className="bg-[#ffff] rounded-t-[30px] pt-10 pb-[30px] px-6">
          <View>
            <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-4 mb-3">{statePopup.ifCountUrinePopupLiquidState ? 'Сколько ты выссал?' : 'Сколько вы выпили жидкости?'}</Text>

            <View className="flex-row items-center py-2 flex-wrap gap-2">
              {customMl.map((item, index) => 
                <TouchableOpacity onPress={() => handlePressCustomMl1(item)} key={index} activeOpacity={.6} className="p-1 items-center border border-main-blue rounded-xl">
                  <GlassIcon/> 
                  <Text style={{fontFamily:'geometria-regular'}} className="text-[#000]">{item} мл.</Text>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <TextInput
                  style={{fontFamily:'geometria-regular'}}
                  keyboardType="numeric"
                  value={liquidValue.toString()}
                  maxLength={4}
                  onChangeText={value => +value > 1000 ? setLiquidValue(1000) : setLiquidValue(+value.replace(/[^0-9]/g, ""))}
                  onFocus={() => setFocusInput(!focusInput)}
                  className="border-b-[#DADADA] border-b w-1/2 outline-none"
                />
              <Text style={{fontFamily:'geometria-regular'}}>{focusInput ? 'просто начните вводить значение' : 'задать вручную'}</Text>
            </View>
          </View>

          <View className={`flex-1 justify-center pt-6`}>
            <Slider
                trackClickable={true}
                minimumValue={0}
                maximumValue={1000}
                animationType="timing"
                renderAboveThumbComponent={() =>
                  <Text style={{fontFamily:'geometria-regular'}} className="text-[12px] justify-center items-center leading-3 text-[#101010] opacity-70 -ml-5">{Math.floor(liquidValue)+ ' мл'}</Text>}
                thumbStyle={{backgroundColor:'#4BAAC5'}}
                minimumTrackStyle={{backgroundColor:'#4BAAC5',height:7}}
                maximumTrackStyle={{backgroundColor:'#4babc56b', height:7}}
                value={liquidValue}
                onValueChange={(value)=> setLiquidValue(Math.floor(+value))}
            />
          </View>

          <TouchableOpacity onPress={handleOnSubmitSave} activeOpacity={0.6} className="justify-end py-[19px] px-[61px] items-center bg-main-blue rounded-[89px]">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">Сохранить изменения</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={statePopup.ifCountUrinePopupLiquidState ? handleIfCountUrine : closeByPressButton}
              activeOpacity={0.6}
              className={`p-2 absolute top-[5%] right-[5%] ${statePopup.ifCountUrinePopupLiquidState ? 'rounded-full opacity-20 bg-grey' : ''} `}>
            <ClosePopup width={15} height={15}/>
          </TouchableOpacity>
        </View>
      </Pressable>
  </Modal>
  );
};

export default memo(ModalLiquidAmount);
