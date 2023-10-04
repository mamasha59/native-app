import { View, Text, Modal, Pressable, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { ClosePopup } from "../../assets/images/icons";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface iModalWindow {
    visible: boolean; // основное что делает попап видимым
    setModalVisible: (event: boolean) => void; // открыть - закрыть попап
    value: string; // значение инпута
    onChangeText: (text: string) => void | undefined; // колбек изменения инпута
    closePopup: () => void; // колбек, который вызывается при нажатии кнопки отправки текстового ввода
}

const ModalWindow = ({visible, setModalVisible, value, onChangeText, closePopup}: iModalWindow) => {

  return (
    <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => {setModalVisible(!visible)}}
        animationType="fade">
            <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-center px-4 flex-1 bg-[#10101035]">
            <View style={{minHeight: windowHeight * 0.3, width:windowWidth * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] rounded-3xl justify-center items-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mb-8">Напишите колличество новых катететров:</Text>
                <View className="flex-row items-center">
                    <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 mr-[10px]">Колличество</Text>
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        keyboardType="numeric"
                        value={value}
                        maxLength={3}
                        placeholder="нажмите для ввода"
                        underlineColorAndroid={'#DADADA'}
                        onChangeText={onChangeText}
                        onSubmitEditing={closePopup}
                        className="w-1/2 text-center"
                        autoFocus={true}
                    />
                </View>
                <TouchableOpacity onPress={closePopup} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
            </View>
            </Pressable>
    </Modal>
  );
};

export default ModalWindow;
