import { View, Text, Modal, Pressable, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { ClosePopup } from "../../assets/images/icons";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface iModalAddCatheter {
    visible: boolean; // основное что делает попап видимым
    setModalVisible: (event: boolean) => void; // открыть - закрыть попап
    value: string; // значение инпута
    onChangeText: (text: string) => void | undefined; // колбек изменения инпута
    handleSafe: () => void; // колбек, который вызывается при нажатии кнопки отправки текстового ввода
}

const ModalAddCatheter = ({visible, setModalVisible, value, onChangeText, handleSafe}: iModalAddCatheter) => {
  return (
    <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {setModalVisible(!visible)}}
        animationType="fade">
            <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-center flex-1 bg-[#10101035]">
            <View style={{minHeight: windowHeight * 0.3, width:windowWidth * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] rounded-3xl justify-center items-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mt-4">Напишите колличество новых катететров:</Text>
                <View className="flex-row items-center mt-7 mb-4">
                    <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5">Колличество</Text>
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        keyboardType="numeric"
                        value={value}
                        maxLength={3}
                        placeholder="нажмите для ввода"
                        underlineColorAndroid={'#DADADA'}
                        onChangeText={onChangeText}
                        onSubmitEditing={handleSafe}
                        className="w-1/2 text-center"
                        autoFocus={true}
                    />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSafe} activeOpacity={0.6} className="p-2 bg-main-blue rounded-lg">
                   <Text style={{fontFamily:'geometria-regular'}} className="text-[#ffff] text-base">Сохранить</Text>
                </TouchableOpacity>
            </View>
            </Pressable>
    </Modal>
  );
};

export default ModalAddCatheter;
