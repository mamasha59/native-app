import { View, Text, Modal, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { ClosePopup } from "../../assets/images/icons";

interface iModalSelect {
    setOpenModal: (state: boolean) => void;
    openModal: boolean;
    options?: string[] | number[];
    onItemPress: (item: any) => void;
    title: string;
    children?: any,
}

const windowWidth = Dimensions.get('window').width;

const ModalSelect = ({setOpenModal, openModal, options, onItemPress, title, children}:iModalSelect) => {
  return (
    <Modal
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(!openModal)}
        animationType="fade"
        key={title}
        >
        <Pressable onPress={(event) => event.target === event.currentTarget && setOpenModal(!openModal)} className="justify-center px-4 flex-1 bg-[#10101035]">
            <View style={{width:windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-[#ffff] p-10">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center mb-6">{title}</Text>
                <View className="flex-row flex-wrap justify-center gap-3 items-center">
                    {options!.map(item =>
                            <TouchableOpacity key={item} className={`min-w-[35px] bg-main-blue rounded-lg mb-3`} activeOpacity={0.6} onPress={() => onItemPress(item)}>
                                <Text style={{fontFamily:'geometria-bold'}} className="text-[#ffff] p-2 text-base text-center">{item}</Text>
                            </TouchableOpacity>)
                    }
                    {children}
                </View>
                <TouchableOpacity onPress={() => setOpenModal(!openModal)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
            </View>
        </Pressable>
    </Modal>
  );
};

export default ModalSelect;
