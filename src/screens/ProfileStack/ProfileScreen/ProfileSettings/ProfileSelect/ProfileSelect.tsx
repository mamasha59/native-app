import { View, Text, Alert } from "react-native";
import React, { RefObject } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { IDropdownRef } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

import { DropDown } from "../../../../../assets/images/icons";

interface iProfileSelect {
    selectRef?: RefObject<IDropdownRef>,
    handleClickOption: (value:string) => void,
    title: string,
    value: string | null,
    confirmation: boolean,
}

const ProfileSelect = ({selectRef, handleClickOption, title, value, confirmation}:iProfileSelect) => {
    
  return (
    <View className="flex-row mb-5">
        <View className="border border-main-blue rounded-xl mr-[10px] min-w-[185px] items-center flex-1 justify-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-sm">{title}</Text>
        </View>
        <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
            <Dropdown
                ref={selectRef}
                data={[{label:'Да', value:1}, {label:'Нет', value:2}]}
                style={{paddingHorizontal:20,paddingVertical:10}}
                fontFamily="geometria-regular"
                labelField="label"
                valueField="value"
                placeholder={value! || 'Выбрать'}
                value={value}
                accessibilityLabel={value!}
                confirmSelectItem={confirmation}
                onConfirmSelectItem={() => {
                Alert.alert('Вы уверенны?', 'Перед каждый нажатием кнопки Выполненно мы будем вас спрашивать сколько мочи ты выссал.', [
                    {
                    text: 'Нет, не хочу измерять!',
                    onPress: () => { handleClickOption('Нет') },
                    },
                    {
                    text: 'Да, хочу измерять!',
                    onPress: () => { handleClickOption('Да') },
                    },
                ]);
                }}
                renderRightIcon={() => <DropDown/>}
                onChange={item => {
                    handleClickOption(item.label)
                }}
            />
        </View>
    </View>
  );
};

export default ProfileSelect;
