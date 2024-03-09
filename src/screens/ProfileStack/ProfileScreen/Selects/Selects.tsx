import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import { useRef, useState, RefObject } from "react";

import { DropDown } from "../../../../assets/images/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setUserData } from "../../../../store/slices/createUserSlice";

const Selects = () => {

    const [selectedLanguage, setSelectedLanguage] = useState(); // TODO настроить селекты

    const userData = useAppSelector((state) => state.user.urineMeasure);
    const dispatch = useAppDispatch();
    const dropDownCountUrine:RefObject<any> = useRef(null);
    
    const handleIsCountUrine = (value:string) => { // функция при выборе селекта выбора Измерение кол-ва мочи
        dispatch(setUserData({urineMeasure:value}));
        dropDownCountUrine.current.close();
    }

  return (
    <View className="pb-5">
        <Text style={{fontFamily:'geometria-regular'}} className="text-black text-xs leading-[14px] mb-[10px]">Режим катетеризации</Text>
        {/*  Режим катетеризации   */}
        <View className="flex-row mb-5 gap-[10px]">
            <TouchableOpacity activeOpacity={.5} className="border border-main-blue items-center rounded-xl min-w-[185px] px-3 flex-row justify-between flex-1">
                <Text style={{fontFamily:'geometria-regular'}} className="text-black text-sm leading-[14px]">Кол-во (5 раз в день)</Text>
                <DropDown/>
            </TouchableOpacity>
            
            <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Каждые 3,5 ч" value="Каждые 3,5 ч" />
                </Picker>
            </View>

        </View>
        {/*  Режим катетеризации   */}  

        {/*  Катетеризация в ночное время   */}  
        <Text style={{fontFamily:'geometria-regular'}} className="text-black text-xs leading-[14px] mb-[10px]">Катетеризация в ночное время</Text>
        <View className="flex-row mb-5 gap-[10px]">
            <View className="border border-main-blue rounded-xl min-w-[185px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Нелатон" value="Нелатон" />
                    <Picker.Item label="Фолея" value="Фолея" />
                </Picker>
            </View>
            
            <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Да" value="Да" />
                    <Picker.Item label="Нет" value="Нет" />
                </Picker>
            </View>
        </View>
        {/* 2я часть селектов Катетеризация в ночное время   */} 
        <View className="flex-row mb-5 gap-[10px]">
            <View className="border border-main-blue rounded-xl min-w-[185px] items-center flex-1 justify-center">
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm">Измерение кол-ва выделяемой мочи</Text>
            </View>
            <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
            <Dropdown
                ref={dropDownCountUrine}
                data={[{label:'Да', value:1}, {label:'Нет', value:2}]}
                style={{paddingHorizontal:20,paddingVertical:10}}
                fontFamily="geometria-regular"
                labelField="label"
                valueField="value"
                placeholder={userData!}
                value={userData}
                accessibilityLabel={userData!}
                confirmSelectItem
                onConfirmSelectItem={(item) => {
                  Alert.alert('Вы уверенны?', 'Перед каждый нажатием кнопки Выполненно мы будем вас спрашивать сколько мочи ты выссал.', [
                    {
                      text: 'Нет, не хочу измерять!',
                      onPress: () => { handleIsCountUrine('Нет') },
                    },
                    {
                      text: 'Да, хочу измерять!',
                      onPress: () => { handleIsCountUrine('Да') },
                    },
                  ]);
                }}
                renderRightIcon={() => <DropDown/>}
                onChange={item => {
                    handleIsCountUrine(item.label)
                }}
            />
            </View>
        </View>
        {/*  Катетеризация в ночное время   */}  
  </View>
  );
};

export default Selects;
