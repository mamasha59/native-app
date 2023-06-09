import MainLayout from "../../components/MainLayout/MainLayout";
import IntervalInfo from "./IntervalInfo/IntervalInfo";
import Timer from "./Timer/Timer";
import ButtonsHome from "./ButtonsHome/ButtonsHome";
import { View } from 'react-native';

const HomeScreen = () => {

  return (
    <MainLayout>
      <View className="flex-1 justify-between h-full mb-[15px]">
        <IntervalInfo />
        <Timer />
        <ButtonsHome />
      </View>
    </MainLayout>
  );
};

export default HomeScreen;
