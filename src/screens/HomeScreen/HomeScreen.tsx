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
import { popupLiquidState } from '../../store/slices/appStateSlicer';
import ModalLeakageHappened from './ModalLeakageHappened/ModalLeakageHappened';
import ModalSuccess from './Timer/ModalSuccess/ModalSuccess';
import ConsumableItemsWidget from './ConsumableItemsWidget/ConsumableItemsWidget';
import IntervalInfo from './IntervalInfo/IntervalInfo';
import NightModeButton from './Timer/NightModeButton/NightModeButton';

const HomeScreen = () => {
  const {t} = useTranslation();
  const [modalLeakageVisible, setModalLeakageVisible] = useState<boolean>(false); // состояние модального окна Учет випитой жидкости

  const [toastOpened, setToastOpened] = useState<boolean>(false);  // состояние тоста

  const dispatch = useAppDispatch();

  const openModal = () => dispatch(popupLiquidState(true)); // открытие попапа Выпито

  const handlePressLeftButton = () => setModalLeakageVisible(!modalLeakageVisible);

  return (
    <MainLayout>
      <DoubleTapToClose/>
      <View className="flex-1 justify-between">
        <ConsumableItemsWidget/>
        <View className='w-full flex-row items-start justify-between'>
          <IntervalInfo/>
          <NightModeButton/>
        </View>
        <Timer setToastOpened={setToastOpened}/>
        <DoubleButton
          key={'double-button-home-screen'}
          handlePressRightButton={openModal}
          handlePressLeftButton={handlePressLeftButton}
          textOfLeftButton={t("homeScreen.doubleButtonComponent.leakage")}
          textOfRightButton={t("homeScreen.doubleButtonComponent.drink")}
          showIcon
        />
      </View>

      <ModalLiquidAmount setToastOpened={setToastOpened} key={'drank'}/>
      <ModalLeakageHappened
        modalLeakageVisible={modalLeakageVisible}
        setModalLeakageVisible={setModalLeakageVisible}
        setToastOpened={setToastOpened}
        key={'leakage-modal'}
      />
      <ModalSuccess/>
      <ShowToast setShowToast={setToastOpened} show={toastOpened} text='Сохранено!' key={'toast-home-screen'}/>
    </MainLayout>
  );
};

export default HomeScreen;