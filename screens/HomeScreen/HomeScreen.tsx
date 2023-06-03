import MainLayout from "../../components/MainLayout/MainLayout";
import IntervalInfo from "./IntervalInfo/IntervalInfo";
import Timer from "./Timer/Timer";
import ButtonsHome from "./ButtonsHome/ButtonsHome";

const HomeScreen = () => {

  return (
    <MainLayout>
        <IntervalInfo/>
        <Timer/>
        <ButtonsHome/>
    </MainLayout>
  );
};

export default HomeScreen;
