import { TouchableOpacity, Text } from "react-native";

import ModalSelect from "../ModalSelect/ModalSelect";
import AnimatedPlaceholder from "../AnimatedPlaceholder/AnimatedPlaceholder";

interface iInpuDataModalSelect{
    title: string;
    onItemPress: (item: any) => void;
    options: string[] | number[];
    inputValue: string | null;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

const InpuDataModalSelect = ({onItemPress, setOpenModal, openModal, options, title, inputValue}:iInpuDataModalSelect) => {
  
  return (
    <>
    <TouchableOpacity key={inputValue} onPress={() => setOpenModal(!openModal)} className="w-full text-center mb-10 border-b border-main-blue pb-[10px] items-center">
        {inputValue && <AnimatedPlaceholder inputValue={inputValue} placeholder={title}/>}
        {inputValue  
          ? <Text style={{fontFamily:'geometria-regular'}} className="text-lg leading-[22px] ">
              {inputValue}
            </Text> 
          : <Text style={{fontFamily:'geometria-regular'}} className="text-lg leading-[22px] opacity-60">
              {title}
            </Text>
        }
    </TouchableOpacity>
    <ModalSelect onItemPress={onItemPress} openModal={openModal} options={options} setOpenModal={setOpenModal} title={title}/>
    </>
  );
};

export default InpuDataModalSelect;
