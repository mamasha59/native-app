import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";

import NelatonIcon from "../../../../assets/images/iconsComponent/NelatonIcon";
import Pencil from "../../../../assets/images/iconsComponent/Pencil";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { focusInput } from "../../../../utils/const";
import { consumableItemChangeQuantity } from "../../../../store/slices/consumablesSlice";

const {width} = Dimensions.get('screen');

const AddCatheters = () => {

    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const {consumablesItem} = useAppSelector(state => state.consumablesSlice);
    
    const [caths, setCaths] = useState<string>('');
    const inputRefAddCatheters = useRef<TextInput>(null);

    const focusInputAddCatheters = () => focusInput(inputRefAddCatheters);

    const handleInputOnChange = (value:string) => {
      +value <= 0 ? setCaths('') : setCaths(value)
    }
    
    const addCatheters = () => {
        const catheter = consumablesItem[0].id;
        if(catheter){
            dispatch(consumableItemChangeQuantity({id:catheter, value:caths}))
        }
    };        

  return (
    <View className="mb-6 flex-1">
        <TouchableOpacity onPress={focusInputAddCatheters} className="flex-row items-center justify-center">
            <View className="border-main-blue w-7 h-7 border p-6 items-center justify-center rounded-full">
                <NelatonIcon/>
            </View>
            <TextInput
                placeholder='введите количество'
                ref={inputRefAddCatheters}
                value={caths}
                onEndEditing={addCatheters}
                onChangeText={(e) => handleInputOnChange(e)}
                style={{fontFamily:'geometria-bold', width: width / 2}}
                keyboardType="numeric"
                maxLength={3}
                selectTextOnFocus
                className="text-[17px] border-b text-center"/>
            <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>{t("units")}</Text>
            <View className="w-[20px] h-[20px] items-center justify-center">
                <Pencil/>
            </View>
        </TouchableOpacity>
        <Text className="text-lg leading-5 text-center mt-4" style={{fontFamily:'geometria-regular'}}>
            При каждой катетеризации будет списан 1 катетер. Вы всегда будете точно знать, сколько катетеров у вас в запасе.
        </Text>
    </View>
  );
};

export default AddCatheters;
