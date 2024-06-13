import { View, Text, Modal, Pressable, Dimensions, TouchableOpacity, Image } from "react-native";

import { ClosePopup } from "../../assets/images/icons";
import { Option } from "../../types";

interface iModalSelect {
    setOpenModal: (state: boolean) => void;
    openModal: boolean;
    options?: Option[];
    onItemPress: (item: Option) => void;
    title: string;
    children?: any,
}

const window = Dimensions.get('window');

const ModalSelect = ({setOpenModal, openModal, options, onItemPress, title, children}:iModalSelect) => {
  return (
    <Modal
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(!openModal)}
        animationType="fade"
        key={title}
        >
        <Pressable onPress={(event) => event.target === event.currentTarget && setOpenModal(!openModal)} className="justify-end flex-1 bg-[#10101035]">
            <View style={{width: window.width, maxHeight: window.height / 2}} className="bg-[#ffff] p-10 w-full flex-1 justify-center">
                <View className="mx-auto -mt-[150px] mb-10">
                    <Image className="w-[150px] h-[150px]" source={require('../../assets/images/homePageIcons/leakageButtonIcon.jpeg')}/>
                </View>
                <Text style={{fontFamily:'geometria-bold'}} className="text-2xl text-center mb-6">{title}</Text>
                <View className="justify-center items-center mb-4">
                    {options!.map((item, index) =>
                            <TouchableOpacity key={index} className="rounded-lg p-2 bg-main-blue mb-5 w-full" activeOpacity={0.6} onPress={() => onItemPress(item)}>
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
