import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useRef, useState, RefObject } from "react";

import { DropDown } from "../../../../assets/images/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setUserData } from "../../../../store/slices/createUserSlice";
import ModalSetTime from "../../../../components/ModalSetTime/ModalSetTime";

const Selects = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const urineMesure = useAppSelector((state) => state.user.urineMeasure);

    const dispatch = useAppDispatch();
    const dropDownCountUrine:RefObject<any> = useRef(null);
    
    const handleIsCountUrine = (value:string) => { // функция при выборе селекта Измерение кол-ва мочи
        dispatch(setUserData({urineMeasure:value}));
        dropDownCountUrine.current.close();
    }
    const handleUseAtNight = (value:string) => { // функция при выборе селекта Катетеризация в ночное время
        console.log(value);
    }
    const handleModal = () => {
        setOpenModal(!openModal);
    }

  return (
    <>
        <Text style={{fontFamily:'geometria-regular'}} className="text-black text-xs leading-[14px] mb-[10px]">Режим катетеризации</Text>
        {/*  Режим катетеризации   */}
        <View className="flex-row mb-5 gap-[10px]">
             <View className="border border-main-blue rounded-xl min-w-[185px] items-center flex-1 justify-center px-5 py-[16px]">
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-center">Кол-во (5 раз в день)</Text>
            </View>
            <TouchableOpacity onPress={handleModal} activeOpacity={.6} className="border border-main-blue rounded-xl min-w-[130px] flex-1 justify-center items-center">
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-center">Выбрать</Text>
            </TouchableOpacity>
        </View>

        <View className="flex-row mb-5 gap-[10px]">
            <View className="border border-main-blue rounded-xl min-w-[185px] items-center flex-1 justify-center">
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-center">Катетеризация в ночное время</Text>
            </View>
            <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
                <Dropdown
                    ref={dropDownCountUrine}
                    data={[{label:'Да', value:1}, {label:'Нет', value:2}]}
                    style={{paddingHorizontal:20,paddingVertical:10}}
                    fontFamily="geometria-regular"
                    labelField="label"
                    valueField="value"
                    placeholder={urineMesure! || 'Выбрать'}
                    value={urineMesure}
                    accessibilityLabel={urineMesure!}
                    confirmSelectItem
                    renderRightIcon={() => <DropDown/>}
                    onChange={item => {
                        handleUseAtNight(item.label)
                    }}
                />
            </View>
        </View>
        {/* -------------------------- */} 
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
                    placeholder={urineMesure! || 'Выбрать'}
                    value={urineMesure}
                    accessibilityLabel={urineMesure!}
                    confirmSelectItem
                    onConfirmSelectItem={() => {
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
        {/* Modal Set Time */}
        <ModalSetTime openModal={openModal} setOpenModal={setOpenModal} key={'ProfileScreenSetNewTime'}/>          
  </>
  );
};
export default Selects;