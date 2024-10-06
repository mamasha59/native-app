import { View, Text, TouchableOpacity } from "react-native";
import {useState} from "react";
import { useTranslation } from "react-i18next";

import { DropDown } from "../../../assets/images/icons";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";
import { Option } from "../../../types";

const CathetersForRoad = ({filteredRecords}:{filteredRecords:number}) => {
    const {t} = useTranslation();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [numberOfDays, setNumberOfDays] = useState<Option>({title: '7',value: '7'});

    const closeModal = () => setOpenModal(!openModal);

    const numbers = Array.from({ length: 31 }, (_, index) => index + 1, );

    const options = numbers.map((number):Option => ({
        title: ''+number,
        value: ''+number,
      }));

    const onDayPress = (item:Option) => {
        setNumberOfDays(item);
        setOpenModal(!openModal)
    }

    const cathetersForSpecificDays = numberOfDays?.value && +numberOfDays?.value * filteredRecords;

  return (
    <View className="mb-5 flex-1">
        <TouchableOpacity activeOpacity={.8} onPress={() => setOpenModal(!openModal)}>
            <View className="flex-row items-center mb-[10px]">
                <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px]">
                    {t("catheterStockScreen.cathetersForRoadComponent.calculate_catheters_for_travel")}
                </Text>
                <View className="ml-2 flex-row items-center mx-[10px]">
                    <Text style={{ fontFamily: "geometria-bold" }} className="text-lg mr-2">{numberOfDays?.title}</Text>
                    <DropDown/>
                </View>
                <Text style={{ fontFamily: "geometria-regular" }} className="text-grey text-xs leading-[15px]">{t("day")} + 1{t("units")} {t("per_day")}</Text>
            </View>
            <View className="border border-border-color p-4 flex-1 rounded-xl">
                <Text style={{ fontFamily: "geometria-bold" }} className="text-xs text-black">
                    {t("catheterStockScreen.cathetersForRoadComponent.you_will_need")} {cathetersForSpecificDays} {t("сatheter")} {t("for")} {numberOfDays?.title} {t("day")}
                </Text>
            </View>
        </TouchableOpacity>
        <ModalSelect
            showIcon={false}
            row
            title={t("catheterStockScreen.cathetersForRoadComponent.select_number_of_days")}
            options={options}
            onItemPress={onDayPress}
            openModal={openModal}
            setOpenModal={closeModal}/>
    </View>
  );
};

export default CathetersForRoad;
