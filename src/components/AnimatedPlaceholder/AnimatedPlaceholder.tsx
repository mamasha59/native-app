import { Animated, Text } from "react-native";
import { useEffect, useRef } from "react";

interface iAnimatedPlaceholder {
    inputValue:string;
    placeholder:string | null;
}

const AnimatedPlaceholder = ({inputValue: inputValue,placeholder}:iAnimatedPlaceholder) => {
    const popUp = useRef(new Animated.Value(0)).current; 
    
    useEffect(() => {
        if(inputValue){
            Animated.timing(popUp, {
            toValue: -20,
            duration: 100,
            useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(popUp, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                }).start();
        }

      }, [popUp,inputValue]);

  return (
    <>
        <Animated.Text style={{fontFamily:'geometria-regular',transform:[{translateY:popUp}]}} className="text-xs absolute left-0 opacity-60">
            {placeholder}
        </Animated.Text>
    </>
  )
};

export default AnimatedPlaceholder;
