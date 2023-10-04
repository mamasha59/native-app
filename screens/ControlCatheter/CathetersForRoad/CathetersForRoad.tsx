import { View, Text, TouchableOpacity, Modal, Pressable, Dimensions, FlatList } from "react-native";
import {useState} from "react";
import { DropDown } from "../../../assets/images/icons";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

interface iNumber {
    id: number,
    title: number;
}

const CathetersForRoad = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [numberOfDays, setNumberOfDays] = useState<number>(1);

    const numbers:iNumber[] = [
        {
          id: 1,
          title: 1,
        },
        {
          id: 2,
          title: 2,
        },
        {
          id: 3,
          title: 3,
        },
        {
          id: 4,
          title: 4,
        },
        {
          id: 5,
          title: 5,
        },
        {
          id: 6,
          title: 6,
        },
        {
          id: 7,
          title: 7,
        },
      ];

    const onDayPress = (item:iNumber) => {
        setNumberOfDays(item.title);
        setOpenModal(!openModal)
    }

    const handleStringEnd = (numberOfDays: number):string => {
       return `д${numberOfDays === 1 ? 'ень' : numberOfDays > 4 ? 'ней' : 'ня'}`
    }

    const stringEnd = handleStringEnd(numberOfDays);

  return (
    <View className="mb-5">
        <View className="flex-row mb-[10px]">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px]">Расчитать катетеры в дорогу на:</Text>
            <TouchableOpacity onPress={() => setOpenModal(!openModal)} className="ml-2 flex-row items-center mx-[10px]">
                <Text style={{ fontFamily: "geometria-bold" }} className="text-xs mr-2">{numberOfDays || 0}</Text>
                <DropDown/>
            </TouchableOpacity>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px]">{stringEnd} + 1шт. в день</Text>
        </View>
        <View className="border border-border-color p-4 flex-1 rounded-xl">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs text-black">
                {`На ${numberOfDays || 1} ${stringEnd}`} вам понадобится 49 катетеров
            </Text>
        </View>
        <Modal
            transparent={true}
            visible={openModal}
            onRequestClose={() => setOpenModal(!openModal)}
            animationType="fade"
            >
            <Pressable onPress={(event) => event.target === event.currentTarget && setOpenModal(false)} className="justify-center px-4 flex-1 bg-[#10101035]">
                <View style={{minHeight: windowHeight * 0.3, width:windowWidth * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] p-10">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-center mb-3">Выберите кол-во дней:</Text>
                    <FlatList
                        data={numbers}
                        renderItem={({item}) =>
                            <TouchableOpacity onPress={() => onDayPress(item)}>
                                <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mb-3">{item.title}</Text>
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </Pressable>
        </Modal>
    </View>
  );
};

export default CathetersForRoad;
