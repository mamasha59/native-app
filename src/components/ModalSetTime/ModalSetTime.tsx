import { View, Text, Modal, Pressable, Dimensions, TouchableOpacity } from "react-native";
import { ClosePopup } from "../../assets/images/icons";
import { useState } from "react";
import SetTimeInterval from "../SetTimeInterval/SetTimeInterval";

interface iModalSelect {
    setOpenModal: (state: boolean) => void;
    openModal: boolean;
    title?: string;
}

const windowWidth = Dimensions.get('window').width;

const ModalSetTime = ({setOpenModal, openModal,title}:iModalSelect) => {
    const [interval, setInterval] = useState<{selectedIndexHour:number,selectedIndexMinutes:number}>({
        selectedIndexHour: 3,
        selectedIndexMinutes: 0,
    })

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
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center mb-6">Выберите новый интервал</Text>
                <View className="flex-row items-center justify-center" key={'ProfileScreenSetNewTime'}>
                    <SetTimeInterval interval={interval} setInterval={setInterval}/>
                </View>
                <TouchableOpacity onPress={() => setOpenModal(!openModal)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
            </View>
        </Pressable>
    </Modal>
  );
};

export default ModalSetTime;
