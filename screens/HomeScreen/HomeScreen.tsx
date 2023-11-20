import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';

import IntervalInfo from "./IntervalInfo/IntervalInfo";
import Timer from "./Timer/Timer";
import ModalLiquidAmount from "./ModalLiquidAmount/ModalLiquidAmount";
import DoubleButton from '../../components/DoubleButton/DoubleButton';
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import DoubleTapToClose from '../../components/ExitAppDoublePress/ExitAppDoublePress';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ModalSelect from '../../components/ModalSelect/ModalSelect';
import { whyLeakageHappenedReasons } from '../../utils/const';
import { whyLeakageHappened } from '../../store/slices/journalDataSlice';
import ShowToast from '../../components/ShowToast/ShowToast';

const HomeScreen = () => {
  const [modalFluidVisible, setModalFluidVisible] = useState<boolean>(false); // состояние модального окна Подтекание
  const [modalLeakageVisible, setModalLeakageVisible] = useState<boolean>(false); // состояние модального окна Учет випитой жидкости

  const [inputLeakageValue, setInputLeakageValue] = useState<string>('');
  const [toastOpened, setToastOpened] = useState<boolean>(false);  // состояние тоста
  
  const catheter = useAppSelector(data => data.user.catheterType);
  const dispatch = useAppDispatch();

  const opneModal = () => setModalFluidVisible(true); // открытие попапа Учет выпитой жидкости

  const handlePressLeftButton = () => {  // при нажатии на левую кнопку
    if (catheter === 'Нелатон') setModalLeakageVisible(!modalLeakageVisible);
  }

  const closeModalOpenToast = () => { // общая функция Закрытия попапа, Показ тоста
    setModalLeakageVisible(!modalLeakageVisible);
    setInputLeakageValue('');
    setToastOpened(true);
  }

  const handlePressReasonItem = (reason:string) => { // при нажатии на причину Подтекания, когда попап открыт
    dispatch(whyLeakageHappened(reason));
    closeModalOpenToast();
  }

  const handleInput = () => { // при нажатии кнопки Ок
    dispatch(whyLeakageHappened(inputLeakageValue));
    closeModalOpenToast();
  }

  return (
    <MainLayout>
      <DoubleTapToClose/>
      <View className="flex-1 justify-between h-full">
        <IntervalInfo />
        <Timer />
        <DoubleButton
            handlePressRightButton={opneModal}
            handlePressLeftButton={handlePressLeftButton}
            textOfLeftButton={catheter === 'Нелатон' ? 'Подтекание' : 'Учет выделенной мочи'}
            textOfRightButton='Учет выпитой жидкости'
            showIcon
        />
      </View>

      <ModalSelect onItemPress={handlePressReasonItem} openModal={modalLeakageVisible} options={whyLeakageHappenedReasons} setOpenModal={setModalLeakageVisible} title='Подтекание случилось:' key={'Подтекание'}>
        <View className='w-full'>
          <TextInput
            inputMode='text'
            multiline
            maxLength={100}
            value={inputLeakageValue}
            style={{fontFamily:'geometria-bold'}}
            placeholderTextColor={'#9966AA'}
            className="text-purple-button text-base text-center border-b"
            placeholder='Впишите свое'
            onChangeText={(value) => setInputLeakageValue(value)}
            />
           {inputLeakageValue && 
           <TouchableOpacity onPress={handleInput} className='mx-auto p-1'>
              <Text style={{fontFamily:'geometria-regular'}} className='text-sm px-4'>Oк</Text>
            </TouchableOpacity>}
        </View>
      </ModalSelect>

      <ModalLiquidAmount modalVisible={modalFluidVisible} setModalVisible={setModalFluidVisible} key={'Учет выпитой жидкости'}/>
      <ShowToast setShowToast={setToastOpened} show={toastOpened} text='Сохраненно!' key={'Подтекание-тоаст'}/>
    </MainLayout>
  );
};

export default HomeScreen;
