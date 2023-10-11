import { View, Text, Modal, Pressable, FlatList, Dimensions, TouchableOpacity } from "react-native";
import React from "react";

interface iModalSelect {
    setOpenModal: (state: boolean) => void;
    openModal: boolean;
    options: any[];
    onItemPress: (item: any) => void;
    title: string;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ModalSelect = ({setOpenModal, openModal, options: data, onItemPress, title}:iModalSelect) => {
  return (
    <Modal
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(!openModal)}
        animationType="fade"
        >
        <Pressable onPress={(event) => event.target === event.currentTarget && setOpenModal(false)} className="justify-center px-4 flex-1 bg-[#10101035]">
            <View style={{maxHeight: windowHeight * 0.4, width:windowWidth * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] p-10">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center mb-3">{title}</Text>
                <FlatList
                    data={data}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={() => onItemPress(item)}>
                            <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mb-3">{item}</Text>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.toString()}
                />
            </View>
        </Pressable>
    </Modal>
  );
};

export default ModalSelect;
