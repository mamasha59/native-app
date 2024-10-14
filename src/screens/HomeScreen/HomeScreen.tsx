import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
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

  const [toastOpened, setToastOpened] = useState<boolean>(false);// состояние тоста
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);// ref of bottom sheet of leakage happened

  const dispatch = useAppDispatch();

  const openModal = () => dispatch(popupLiquidState(true));// открытие попапа Выпито

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <MainLayout>
      <DoubleTapToClose/>

      <View className="flex-1 justify-between">
        <ConsumableItemsWidget/>
        <View className='w-full flex-row items-start justify-between'>
          <IntervalInfo/>
          <NightModeButton/>
        </View>
        <Timer/>

        <DoubleButton
          key={'double-button-home-screen'}
          handlePressRightButton={openModal}
          handlePressLeftButton={handlePresentModalPress}
          textOfLeftButton={t("homeScreen.doubleButtonComponent.leakage")}
          textOfRightButton={t("homeScreen.doubleButtonComponent.drink")}
          showIcon
        />
      </View>

      <ModalLiquidAmount setToastOpened={setToastOpened} key={'drank'}/>
      
      <ModalLeakageHappened ref={bottomSheetModalRef} setToastOpened={setToastOpened} key={'leakage-modal'}/>

      <ModalSuccess/>

      <ShowToast setShowToast={setToastOpened} show={toastOpened} text='Сохранено!' key={'toast-home-screen'}/>

    </MainLayout>
  );
};

export default HomeScreen;