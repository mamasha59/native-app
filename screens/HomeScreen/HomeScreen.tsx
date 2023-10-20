import { View } from 'react-native';
import { useState} from 'react';

import IntervalInfo from "./IntervalInfo/IntervalInfo";
import Timer from "./Timer/Timer";
import ModalLiquidAmount from "./ModalLiquidAmount/ModalLiquidAmount";
import DoubleButton from '../../components/DoubleButton/DoubleButton';
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import DoubleTapToClose from '../../components/ExitAppDoublePress/ExitAppDoublePress';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const opneModal = () => setModalVisible(true);

  return (
    <MainLayout>
      <DoubleTapToClose/>
      <View className="flex-1 justify-between h-full">
        <IntervalInfo />
        <Timer />
        <DoubleButton
            handlePressRightButton={opneModal}
            textOfLeftButton='Учет выделенной мочи'
            textOfRightButton='Учет выпитой жидкости'
            showIcon={true}
        />
      </View>
      <ModalLiquidAmount modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </MainLayout>
  );
};

export default HomeScreen;
