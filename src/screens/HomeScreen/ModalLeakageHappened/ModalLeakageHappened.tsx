import { Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";

import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import { Option } from "../../../types";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen } from "../../../store/slices/appStateSlicer";
import { useAppDispatch } from "../../../store/hooks";
import { whyLeakageHappenedReasons } from "../../../utils/const";

interface iModalLeakageHappened{
    setModalLeakageVisible: (value:boolean) => void,
    modalLeakageVisible: boolean,
    setToastOpened: (value:boolean) => void,
}

const ModalLeakageHappened = ({setModalLeakageVisible, modalLeakageVisible, setToastOpened}:iModalLeakageHappened) => {
    const dispatch = useAppDispatch();

    const [inputLeakageValue, setInputLeakageValue] = useState<string>('');

    const handleAction = (reason?: Option) => { // при клике на причину подтекания или кнопку Ок
        const leakageReason = reason?.title || inputLeakageValue.trim();
        const whenWasCanulisation = new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0');
        dispatch(addUrineDiaryRecord(
          { id: uuidv4(),
            whenWasCanulisation,
            leakageReason,
            timeStamp: format(new Date(), 'MM/dd/yyyy HH:mm:ss'),}));
        dispatch(addBadgesJournalScreen(1));
        closeModalOpenToast();
      }

      const closeModalOpenToast = () => { // общая функция Закрытия попапа, Показ тоста
        setModalLeakageVisible(!modalLeakageVisible);
        setInputLeakageValue('');
        setToastOpened(true);
      }
    

  return (
    <ModalSelect
        logo={<Image className="w-[150px] h-[150px]" source={require('../../../assets/images/homePageIcons/leakageButtonIcon.jpeg')}/>}
        onItemPress={handleAction}
        openModal={modalLeakageVisible}
        options={whyLeakageHappenedReasons}
        setOpenModal={closeModalOpenToast}
        title='Подтекание случилось:'
        key={'Подтекание'}>
        <>
            <TextInput
                inputMode='text'
                maxLength={50}
                value={inputLeakageValue}
                style={{fontFamily:'geometria-bold'}}
                placeholderTextColor={'#9966AA'}
                className="text-purple-button text-base text-center border-b w-full"
                placeholder='Впишите свое'
                onChangeText={(value) => setInputLeakageValue(value)}
                onSubmitEditing={() => handleAction()}
            />
            {inputLeakageValue && 
            <TouchableOpacity onPress={() => handleAction()} className='mx-auto mt-4 bg-main-blue rounded-lg px-4 py-1'>
                <Text style={{fontFamily:'geometria-bold'}} className='text-2xl text-[#fff] '>cохранить</Text>
            </TouchableOpacity>}
        </>
    </ModalSelect>
  );
};

export default ModalLeakageHappened;
