import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Timer from "./Timer/Timer";
import ModalLiquidAmount from "./ModalLiquidAmount/ModalLiquidAmount";
import DoubleButton from '../../components/DoubleButton/DoubleButton';
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import DoubleTapToClose from '../../components/ExitAppDoublePress/ExitAppDoublePress';
import { useAppDispatch } from '../../store/hooks';
import ModalSelect from '../../components/ModalSelect/ModalSelect';
import { whyLeakageHappenedReasons } from '../../utils/const';
import { addUrineDiaryRecord } from '../../store/slices/journalDataSlice';
import ShowToast from '../../components/ShowToast/ShowToast';
import { addBadgesJournalScreen, popupLiquidState } from '../../store/slices/appStateSlicer';
import { format } from 'date-fns';
import RestOf from '../ControlCatheter/RestOf/RestOf';
import { Option } from '../../types';

const HomeScreen = () => {
  const [modalLeakageVisible, setModalLeakageVisible] = useState<boolean>(false); // состояние модального окна Учет випитой жидкости

  const [inputLeakageValue, setInputLeakageValue] = useState<string>('');
  const [toastOpened, setToastOpened] = useState<boolean>(false);  // состояние тоста

  const dispatch = useAppDispatch();

  const openModal = () => dispatch(popupLiquidState(true)); // открытие попапа Учет выпитой жидкости

  const handlePressLeftButton = () => {  // при нажатии на левую кнопку
    setModalLeakageVisible(!modalLeakageVisible);
  }

  const closeModalOpenToast = () => { // общая функция Закрытия попапа, Показ тоста
    setModalLeakageVisible(!modalLeakageVisible);
    setInputLeakageValue('');
    setToastOpened(true);
  }

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

  return (
    <MainLayout>
      <DoubleTapToClose/>
      <View className="flex-1 justify-between">
        <View className=''>
          <RestOf/>
        </View>
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
