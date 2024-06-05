import { View, TouchableOpacity, Text } from "react-native";
import { useState } from "react";

import ModalSelect from "../../../../components/ModalSelect/ModalSelect";
import { Option } from "../../../../types";
import { useAppDispatch } from "../../../../store/hooks";
import { switchNightMode } from "../../../../store/slices/appStateSlicer";
import NightModeButtonSvg from "../../../../assets/images/iconsComponent/NightMode";

const NightModeButton = () => {
    const dispatch = useAppDispatch();
    const [openModalNightMode, setOpenModalNightMode] = useState<boolean>(false);

    const handlePressItem = (value: Option) => {                
        dispatch(switchNightMode(
            {   
                title: value.title,
                timeStamp: new Date().toString(),
                value: !!value.value
            }
        ));
        setOpenModalNightMode(!openModalNightMode); 
    }

  return (
    <>
    <View className="absolute top-[15%] right-0 w-10 h-10">
        <TouchableOpacity onPress={() => setOpenModalNightMode(!openModalNightMode)}>
            <NightModeButtonSvg/>
        </TouchableOpacity>
    </View>
    <ModalSelect
        onItemPress={(item) => handlePressItem(item)}
        openModal={openModalNightMode}
        setOpenModal={setOpenModalNightMode}
        title="Желаете включить ночной режим?"
        options={[{title: 'Да', value: true}, {title: 'Нет', value: false}]}
        children={
            <View>
                <Text>да да</Text>
            </View>
        }
    />
    </>
  );
};

export default NightModeButton;