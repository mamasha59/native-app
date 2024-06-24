import { useState } from "react";
import { View } from "react-native";

import ShowToast from "../../../components/ShowToast/ShowToast";
import IntervalInfo from "../IntervalInfo/IntervalInfo";
import NightModeButton from "./NightModeButton/NightModeButton";
import ModalSuccess from "./ModalSuccess/ModalSuccess";
import TimerT from "./Timer-Itself/Timer-Itself";

const Timer = () => { //TODO refactoring
  const [toast, setToastShow] = useState<boolean>(false);        // показываем тост наверху экрана при нажатии на кнопку <Выполненно>

  return (
    <View className="flex-1 justify-center items-center">
      <NightModeButton/>
      <IntervalInfo/>
      <TimerT setToastShow={setToastShow}/>
      <ShowToast setShowToast={setToastShow} show={toast} text="Вы прокатетеризировались!"/>
      <ModalSuccess/>
    </View>
  );
};
export default Timer;