import { View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface iWaterBalanceInterval{
    showResult: boolean,
    result: number,
    bgColor: string,
}

const WaterBalanceInterval = ({showResult, result, bgColor}:iWaterBalanceInterval) => { 
     
  return (
    <View className="flex-1 items-center justify-center py-1 relative" style={{ backgroundColor: bgColor }}>
        {showResult && 
        <View className={`absolute -top-12 w-16 h-10 border right-0 rounded-full items-center`}>
            <Text style={{fontFamily:'geometria-bold'}} className="text-xl text-center p-1">
              {result === 0 || Number.isNaN(result) ? '∞' : `${Math.floor(result)}%`}
            </Text>
            <View className="-mt-3">
              <MaterialIcons name="arrow-drop-down" size={34} color="black" />
            </View>
        </View>}
    </View>
  );
};

export default WaterBalanceInterval;
