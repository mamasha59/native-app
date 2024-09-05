import { View } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();
  const [modalLeakageVisible, setModalLeakageVisible] = useState<boolean>(false); // состояние модального окна Учет випитой жидкости

  const [toastOpened, setToastOpened] = useState<boolean>(false);  // состояние тоста

  const dispatch = useAppDispatch();

  const openModal = () => dispatch(popupLiquidState(true)); // открытие попапа Выпито

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
          key={'doubleButtonHomeScreen'}
          handlePressRightButton={openModal}
          handlePressLeftButton={handlePressLeftButton}
          textOfLeftButton={t("homeScreen.doubleButtonComponent.leakage")}
          textOfRightButton={t("homeScreen.doubleButtonComponent.drink")}
          showIcon
        />
      </View>

      <ModalLiquidAmount key={'drank'}/>
      <ModalLeakageHappened
        modalLeakageVisible={modalLeakageVisible}
        setModalLeakageVisible={setModalLeakageVisible}
        setToastOpened={setToastOpened}
        key={'leakagemodal'}
      />
      <ShowToast setShowToast={setToastOpened} show={toastOpened} text='Сохранено!' key={'leakage-toast'}/>
    </MainLayout>
  );
};

export default HomeScreen;