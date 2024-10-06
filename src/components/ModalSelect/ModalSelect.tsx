import { View, Text, Dimensions, TouchableOpacity, ScrollView, Modal, Pressable} from "react-native";

import { ClosePopup } from "../../assets/images/icons";
import { Option } from "../../types";

interface iModalSelect {
    setOpenModal: (state?: boolean) => void;
    openModal: boolean;
    options?: Option[];
    onItemPress?: (item: Option) => void;
    title?: string;
    children?: React.ReactNode,
    showIcon?: boolean,
    row?: boolean,
    logo?: React.ReactNode,
    height?: number,
}

const window = Dimensions.get('window');

const ModalSelect = ({setOpenModal, openModal, options, onItemPress, title, children, showIcon = true, row = false, logo, height = 2.2}:iModalSelect) => {

  return (
    <Modal
        animationType="fade"
        visible={openModal}
        transparent
        onRequestClose={() => setOpenModal(!openModal)}
        key={title}
        >
        <Pressable
            onPress={(event) => event.target === event.currentTarget && setOpenModal(!openModal)}
            className="flex-1 justify-end mx-auto bg-[#00000037] w-full h-full">
            <View
                style={{height: window.height / height}}
                className="bg-white p-3 pt-7 w-full rounded-t-3xl">
                {showIcon && 
                <View className="mx-auto -mt-[150px] mb-1">
                    {logo}
                </View>}
                {title && title.length > 0 && <Text style={{fontFamily:'geometria-bold'}} className="text-2xl text-center mb-4">{title}</Text>}
                <View className="justify-between flex-1">
                    {options &&
                        <ScrollView className="flex-1 w-full">
                            <View className={`justify-center items-center flex-wrap ${row ? 'flex-row' : 'flex mx-auto'}`}>
                                {options!.map((item, index) =>
                                    <TouchableOpacity
                                        key={index}
                                        className={`rounded-lg p-2 bg-main-blue min-w-[40px] max-w-[250px] m-3 ${!row && 'w-full'}`}
                                        activeOpacity={0.6}
                                        onPress={() => onItemPress!(item)}>
                                        <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-[#fff] text-center">{item.title}</Text>
                                    </TouchableOpacity>)
                                }
                            </View>
                        </ScrollView>
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
