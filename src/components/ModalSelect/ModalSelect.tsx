import { View, Text, Pressable, Dimensions, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { ClosePopup } from "../../assets/images/icons";
import { Option } from "../../types";

interface iModalSelect {
    setOpenModal: (state?: boolean) => void;
    openModal: boolean;
    options?: Option[];
    onItemPress: (item: Option) => void;
    title: string;
    children?: React.ReactNode,
    showIcon?: boolean,
    row?: boolean,
    logo?: React.ReactNode,
}

const window = Dimensions.get('window');

const ModalSelect = ({setOpenModal, openModal, options, onItemPress, title, children, showIcon = true, row = false, logo}:iModalSelect) => {
  return (
    <Modal
        isVisible={openModal}
        key={title}
        className="p-0 m-0"
        >
        <Pressable onPress={(event) => event.target === event.currentTarget && setOpenModal(!openModal)} className="justify-end flex-1 bg-[#10101035]">
            <View style={{width: window.width, maxHeight: window.height / 2.2}} className="bg-[#ffff] p-10 w-full flex-1 justify-center items-center">
              {showIcon && 
                <View className="mx-auto -mt-[150px] mb-10">
                    {logo}
                </View>}
                <Text style={{fontFamily:'geometria-bold'}} className="text-2xl text-center mb-6">{title}</Text>
                <View className={`justify-center items-center mb-4 flex-wrap ${row ? 'flex-row gap-9' : 'flex'}`}>
                    {options!.map((item, index) =>
                            <TouchableOpacity key={index} className={`rounded-lg p-2 bg-main-blue min-w-[40px] max-w-[250px] mb-5 ${!row && 'w-full'}`} activeOpacity={0.6} onPress={() => onItemPress(item)}>
                                <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-[#fff] text-center">{item.title}</Text>
                            </TouchableOpacity>)
                    }
                </View>
                    {children}
                <TouchableOpacity onPress={() => setOpenModal(!openModal)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
            </View>
        </Pressable>
    </Modal>
  );
};

export default ModalSelect;
