import { View, Text, Modal, Pressable, Dimensions, TouchableOpacity } from "react-native";
import React from "react";

interface iModalSelect {
    setOpenModal: (state: boolean) => void;
    openModal: boolean;
    options: string[] | number[];
    onItemPress: (item: any) => void;
    title: string;
}

const windowWidth = Dimensions.get('window').width;

const ModalSelect = ({setOpenModal, openModal, options: data, onItemPress, title}:iModalSelect) => {
  return (
    <Modal
        transparent={true}
        visible={openModal}
        onRequestClose={() => setOpenModal(!openModal)}
        animationType="fade"
        key={title}
        >
        <Pressable onPress={(event) => event.target === event.currentTarget && setOpenModal(false)} className="justify-center px-4 flex-1 bg-[#10101035]">
            <View style={{width:windowWidth * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] p-10">
            <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center mb-6">{title}</Text>
                <View className="flex-row gap-4 flex-wrap justify-center">
                    {data.map(item =>
                    <TouchableOpacity key={item} className={`min-w-[35px] bg-main-blue flex-grow-0`} activeOpacity={0.6} onPress={() => onItemPress(item)}>
                        <Text style={{fontFamily:'geometria-bold'}} className="text-[#ffff] p-2 text-base text-center">{item}</Text>
                    </TouchableOpacity>
                    )}
                </View>
            </View>
        </Pressable>
    </Modal>
  );
};

export default ModalSelect;
