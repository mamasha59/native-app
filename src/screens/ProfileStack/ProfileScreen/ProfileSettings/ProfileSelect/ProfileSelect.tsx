import { View, Text, Alert } from "react-native";
import React, { RefObject } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { IDropdownRef } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

import { DropDown } from "../../../../../assets/images/icons";
import { Option } from "../../../../../types";

interface iProfileSelect {
    selectRef?: RefObject<IDropdownRef>,
    handleClickOption: (value: Option) => void,
    title: string,
    value: string,
    confirmation: boolean,
}

const ProfileSelect = ({selectRef, handleClickOption, title, value, confirmation}:iProfileSelect) => {

    const selectRu = [{title:'Да', value: true},{title:'Нет', value: false}]
    // const selectEng = [{title:'Yes', value: true},{title:'No', value: false}]
    
  return (
    <View className="flex-row mb-5">
        <View className="border border-main-blue rounded-xl mr-[10px] min-w-[185px] items-center flex-1 justify-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-sm">{title}</Text>
        </View>
        <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
            <Dropdown
                ref={selectRef}
                data={selectRu}
                style={{paddingHorizontal:20,paddingVertical:10}}
                fontFamily="geometria-regular"
                labelField="title"
                valueField="value"
                placeholder={value! || 'Выбрать'}
                value={value || 'Выбрать'}
                accessibilityLabel={value!}
                confirmSelectItem={confirmation}
                onConfirmSelectItem={() => {
                Alert.alert('Вы уверенны?', 'Перед каждый нажатием кнопки Выполненно мы будем вас спрашивать сколько мочи ты выссал.', [
                    {
                    text: 'Нет, не хочу измерять!',
                    onPress: () => { handleClickOption(selectRu[1]) },
                    },
                    {
                    text: 'Да, хочу измерять!',
                    onPress: () => { handleClickOption(selectRu[0]) },
                    },
                ]);
                }}
                renderRightIcon={() => <DropDown/>}
                onChange={item => {
                    handleClickOption({value: item.value, title: item.title})
                }}
            />
        </View>
    </View>
  );
};

export default ProfileSelect;
