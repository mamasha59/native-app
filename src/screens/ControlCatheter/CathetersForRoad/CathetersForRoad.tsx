import { View, Text, TouchableOpacity } from "react-native";
import {useState} from "react";

import { DropDown } from "../../../assets/images/icons";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import { Option } from "../../../types";

const CathetersForRoad = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [numberOfDays, setNumberOfDays] = useState<number>(1);

    const numbers = Array.from({ length: 31 }, (_, index) => index + 1);

    const onDayPress = (item:Option) => {
        setNumberOfDays(item);
        setOpenModal(!openModal)
    }

    const handleStringEnd = (numberOfDays: number): string => { //TODO решить проблему с окончаниями
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
        <ModalSelect
            row
            title="Выберите кол-во дней:"
            options={numbers}
            onItemPress={onDayPress}
            openModal={openModal}
            setOpenModal={setOpenModal}/>
    </View>
  );
};

export default CathetersForRoad;
