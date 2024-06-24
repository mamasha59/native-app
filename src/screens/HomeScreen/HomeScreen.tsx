import { View } from 'react-native';
import { useState } from 'react';

import Timer from "./Timer/Timer";
import ModalLiquidAmount from "./ModalLiquidAmount/ModalLiquidAmount";
import DoubleButton from '../../components/DoubleButton/DoubleButton';
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import DoubleTapToClose from '../../components/ExitAppDoublePress/ExitAppDoublePress';
import { useAppDispatch } from '../../store/hooks';
import ShowToast from '../../components/ShowToast/ShowToast';
import RestOf from '../ControlCatheter/RestOf/RestOf';
import { popupLiquidState } from '../../store/slices/appStateSlicer';
import ModalLeakageHappened from './ModalLeakageHappened/ModalLeakageHappened';

const HomeScreen = () => {
  const [modalLeakageVisible, setModalLeakageVisible] = useState<boolean>(false); // состояние модального окна Учет випитой жидкости

  const [toastOpened, setToastOpened] = useState<boolean>(false);  // состояние тоста

  const dispatch = useAppDispatch();

  const openModal = () => dispatch(popupLiquidState(true)); // открытие попапа Учет выпитой жидкости

  const handlePressLeftButton = () => {  // при нажатии на левую кнопку
    setModalLeakageVisible(!modalLeakageVisible);
  }

  return (
    <MainLayout>
      <DoubleTapToClose/>
      <View className="flex-1 justify-between">
        <RestOf/>
        <Timer />
        <DoubleButton
            handlePressRightButton={openModal}
            handlePressLeftButton={handlePressLeftButton}
            textOfLeftButton='Подтекание'
            textOfRightButton='Учет выпитой жидкости'
            showIcon
        />
      </View>

      <ModalLiquidAmount key={'Учет выпитой жидкости'}/>
      <ModalLeakageHappened modalLeakageVisible={modalLeakageVisible} setModalLeakageVisible={setModalLeakageVisible} setToastOpened={setToastOpened} key={'leakagemodal'}/>
      <ShowToast setShowToast={setToastOpened} show={toastOpened} text='Сохраненно!' key={'Подтекание-тоаст'}/>
    </MainLayout>
  );
};

export default HomeScreen;