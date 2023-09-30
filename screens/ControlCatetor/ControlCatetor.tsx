import { View, Text } from "react-native";
import MainLayout from '../../Layouts/MainLayout/MainLayout';

const ControlCatetor = () => {
  return (
    <MainLayout title="Контроль учета катетеров">
        <View className="h-full flex-1">
          <View className="mb-8">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-[#77787B]">График расхода за последние 7 дней</Text>
          </View>
          <View>
            <Text>График</Text>
            {/* <LineGraph
              points={priceHistory}
              animated={true}
              color="#4484B2"
            /> */}
          </View>
        </View>  
    </MainLayout>
  );
};

export default ControlCatetor;
