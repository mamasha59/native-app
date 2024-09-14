import { View, Text, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { BlurView } from "expo-blur";

import { Drop, Graphic } from "../../assets/images/icons";
import { useAppSelector } from "../../store/hooks";

interface iDoubleButton {
    textOfLeftButton: string;
    textOfRightButton: string;
    handlePressRightButton?: () => void;
    handlePressLeftButton?: (data?:any) => void;
    showIcon: boolean;
    marginBottom?: boolean,
    clickable?: boolean,
    blurView?: boolean,
}

const DoubleButton = (props:iDoubleButton) => {
  const {
    handlePressRightButton,
    handlePressLeftButton,
    textOfLeftButton,
    textOfRightButton,
    showIcon,
    marginBottom = true,
    clickable,
    blurView = false,
  } = props;
  const {leftButton, rightButton} = useAppSelector(state => state.appStateSlice.doubleButtonProfileScreenClickable);
  
  return (
    <BlurView
      intensity={blurView ? 200 : 0}
      tint="prominent"
      className={`relative flex-row ${marginBottom && 'mb-[15px]'} ${blurView ? 'absolute bottom-0 left-0 right-0 px-3 m-0 py-3' : ''}`}>
      <TouchableOpacity
        onPress={handlePressLeftButton}
        activeOpacity={0.6}
        className="min-h-[44px] mr-[13px] p-1 flex-1 bg-purple-button rounded-[89px] flex-row items-center justify-center">

          {showIcon && <Drop width={16} height={17} color={'#fff'}/>}

          <Text style={{fontFamily:'geometria-bold'}} className="ml-1 text-white text-sm text-center">
            {textOfLeftButton}
          </Text>

         {clickable && leftButton &&
         <View className="absolute top-1 right-1">
            <Entypo name="check" size={30} color="#f5dd4b" />
          </View>}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressRightButton}
        activeOpacity={0.6}
        className="min-h-[44px] p-1 flex-1 bg-main-blue rounded-[89px] flex-row items-center justify-center">

        {showIcon && <View className="mr-4"><Graphic width={16} height={16} color={'#fff'}/></View> }

        <Text style={{fontFamily:'geometria-bold'}} className="text-white text-sm text-center leading-4">
          {textOfRightButton}
        </Text>

        {clickable && rightButton &&
        <View className="absolute top-1 right-1">
            <Entypo name="check" size={30} color="#f5dd4b" />
        </View>}
      </TouchableOpacity>
    </BlurView>
  );
};

export default DoubleButton;
