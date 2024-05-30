import { Text, TouchableOpacity } from "react-native";
import AnimatedPlaceholder from "../AnimatedPlaceholder/AnimatedPlaceholder";
import { useAppSelector } from "../../store/hooks";

interface iButtonSelect{
    placeholder: string;
    inputValue: string | null | undefined;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
    onPressIn?: () => void;
}

const ButtonSelect = ({setOpenModal, openModal, placeholder, inputValue, onPressIn}:iButtonSelect) => {
  return (
    <TouchableOpacity activeOpacity={.6} key={inputValue} onPressIn={onPressIn} onPress={() => setOpenModal(!openModal)} className="w-full text-center mb-10 border-b border-main-blue pb-[10px] items-center">
        {inputValue && <AnimatedPlaceholder inputValue={inputValue} placeholder={placeholder}/>}
        {inputValue  
        ? <Text style={{fontFamily:'geometria-regular'}} className="text-lg leading-[22px] ">
            {inputValue}
          </Text> 
        : <Text style={{fontFamily:'geometria-regular'}} className="text-lg leading-[22px] opacity-60">
            {placeholder}
          </Text>
        }
    </TouchableOpacity>
  );
};

export default ButtonSelect;
