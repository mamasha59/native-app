import { View, Text, Modal, Pressable, Dimensions, TouchableOpacity } from "react-native";

interface iModalSelect {
    setOpenModal: (state: boolean) => void;
    openModal: boolean;
    options: string[] | number[];
    onItemPress: (item: any) => void;
    title: string;
    children?: any,
}

const windowWidth = Dimensions.get('window').width;

const ModalSelect = ({setOpenModal, openModal, options: data, onItemPress, title, children}:iModalSelect) => {    
  return (
    <Modal
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(!openModal)}
        animationType="fade"
        key={title}
        >
        <Pressable onPress={(event) => event.target === event.currentTarget && setOpenModal(false)} className="justify-center px-4 flex-1 bg-[#10101035]">
            <View style={{width:windowWidth * 0.3}} className="min-w-[315px] mx-auto bg-[#ffff] p-10">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center mb-6">{title}</Text>
                <View className="flex-row flex-wrap justify-center gap-3 items-center">
                    {data.map(item =>
                    <TouchableOpacity key={item} className={`min-w-[35px] bg-main-blue rounded-lg mb-3`} activeOpacity={0.6} onPress={() => onItemPress(item)}>
                        <Text style={{fontFamily:'geometria-bold'}} className="text-[#ffff] p-2 text-base text-center">{item}</Text>
                    </TouchableOpacity>
                    )}
                    {children}
                </View>
            </View>
        </Pressable>
    </Modal>
  );
};

export default ModalSelect;
