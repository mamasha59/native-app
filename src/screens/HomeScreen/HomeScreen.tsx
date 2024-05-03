import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import IntervalInfo from "./IntervalInfo/IntervalInfo";
import Timer from "./Timer/Timer";
import ModalLiquidAmount from "./ModalLiquidAmount/ModalLiquidAmount";
import DoubleButton from '../../components/DoubleButton/DoubleButton';
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import DoubleTapToClose from '../../components/ExitAppDoublePress/ExitAppDoublePress';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ModalSelect from '../../components/ModalSelect/ModalSelect';
import { whyLeakageHappenedReasons } from '../../utils/const';
import { addUrineDiaryRecord } from '../../store/slices/journalDataSlice';
import ShowToast from '../../components/ShowToast/ShowToast';
import { addBadgesJournalScreen, popupLiquidState } from '../../store/slices/appStateSlicer';

const HomeScreen = () => {
  const [modalLeakageVisible, setModalLeakageVisible] = useState<boolean>(false); // состояние модального окна Учет випитой жидкости

  const [inputLeakageValue, setInputLeakageValue] = useState<string>('');
  const [toastOpened, setToastOpened] = useState<boolean>(false);  // состояние тоста

  const catheter = useAppSelector(data => data.user.catheterType);
  const dispatch = useAppDispatch();

  const openModal = () => dispatch(popupLiquidState(true)); // открытие попапа Учет выпитой жидкости

  const handlePressLeftButton = () => {  // при нажатии на левую кнопку
    if (catheter === 'Нелатон') setModalLeakageVisible(!modalLeakageVisible);
  }

  const closeModalOpenToast = () => { // общая функция Закрытия попапа, Показ тоста
    setModalLeakageVisible(!modalLeakageVisible);
    setInputLeakageValue('');
    setToastOpened(true);
  }

  const handleAction = (reason?: string) => { // при клике на причину подтекания или кнопку Ок
    const leakageReason = reason || inputLeakageValue.trim();
    const whenWasCanulisation = new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0');
    dispatch(addUrineDiaryRecord({ id: uuidv4(), whenWasCanulisation, leakageReason, timeStamp: new Date().toISOString().slice(0,10) }));
    dispatch(addBadgesJournalScreen(1));
    closeModalOpenToast();
  }

  return (
    <MainLayout>
      <DoubleTapToClose/>
      <View className="flex-1 justify-between">
        <IntervalInfo />
        <Timer />
        <DoubleButton
            handlePressRightButton={openModal}
            handlePressLeftButton={handlePressLeftButton}
            textOfLeftButton='Подтекание'
            textOfRightButton='Учет выпитой жидкости'
            showIcon
        />
      </View>
      <ModalSelect
        onItemPress={handleAction}
        openModal={modalLeakageVisible}
        options={whyLeakageHappenedReasons}
        setOpenModal={setModalLeakageVisible}
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
            <TouchableOpacity onPress={() => handleAction()} className='mx-auto p-1'>
                <Text style={{fontFamily:'geometria-regular'}} className='text-sm px-4'>Oк</Text>
            </TouchableOpacity>}
          </>
      </ModalSelect>

      <ModalLiquidAmount key={'Учет выпитой жидкости'}/>

      <ShowToast setShowToast={setToastOpened} show={toastOpened} text='Сохраненно!' key={'Подтекание-тоаст'}/>
    </MainLayout>
  );
};

export default HomeScreen;
