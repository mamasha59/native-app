import { View, Text, TouchableOpacity, Platform, Pressable, Modal, TextInput, Dimensions } from "react-native";
import {useState} from "react";
import { useTranslation } from "react-i18next";

import NelatonIcon from "../../../assets/images/iconsComponent/TabMenuIcons/NelatonIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCatheter } from "../../../store/slices/journalDataSlice";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import { ClosePopup } from "../../../assets/images/icons";

const window = Dimensions.get('window');

const RestOf = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationRoot>();
  const currentRoute = useNavigationState(state => state.routes[state.index].name);
  
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const initial = useAppSelector(amount => amount.journal.initialCathetherAmount);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState<string>('');

  const handleChangeCatetor = (value:string) => {
    if(+value <= 0) {
      setInputValue('');
    }else {
      const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
      setInputValue(numericValue);
    }
  }

  const handleOpenPopup = () => {
    if(currentRoute === 'Home') {
      navigation.navigate('ControlCatheter');
    }else {
      setModalVisible(true);
    } 
  };

  const handleClosePopup = () => { // закрыть попап
    dispatch(addCatheter({amount: +inputValue}))
    setInputValue('');
    setModalVisible(false);
  };

  return (
    <>
      <View className="justify-center items-center flex-grow-0">
        <TouchableOpacity style={{elevation:Platform.OS === 'android' ? 5 : 0, 
                                  shadowColor: 'black', 
                                  shadowOffset: { width: 0, height: 2 }, 
                                  shadowOpacity: 0.25,
                                  shadowRadius: 4,}} 
                                  activeOpacity={.8} 
                                  onPress={handleOpenPopup} 
                                  className="bg-main-blue rounded-xl w-full max-h-[96px] p-[10px] relative">
            <Text style={{ fontFamily: "geometria-regular" }} className="text-xs leading-[14px] text-[#ffff]">
              {t("catheterStockComponent.title")}
            </Text>
            <Text style={{ fontFamily: "geometria-bold" }} className="text-lg leading-[22px] text-[#ffff] my-[5px]">{initial.nelaton} {t("units")}</Text>
            <Text style={{ fontFamily: "geometria-regular" }} className="text-[8px] leading-[10px] text-[#ffff]">{t("in")} 3 {t("days")}, 0 {t("catheterStockComponent.units_will_remain")}</Text>
            <View className="border border-[#ffff] absolute right-[15px] top-[15px] rounded-full p-2">
              <NelatonIcon width={25} color={'#f8e40c'}/>
            </View>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
        animationType="fade">
            <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-center flex-1 bg-[#10101035]">
            <View style={{minHeight: window.height * 0.3, width:window.width * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] rounded-3xl justify-center items-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mt-4">Напишите колличество новых катететров:</Text>
                <View className="flex-row items-center mt-7 mb-4">
                    <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5">Колличество</Text>
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        keyboardType="numeric"
                        value={inputValue}
                        maxLength={3}
                        placeholder="нажмите для ввода"
                        underlineColorAndroid={'#DADADA'}
                        onChangeText={handleChangeCatetor}
                        onSubmitEditing={handleClosePopup}
                        className="w-1/2 text-center"
                        autoFocus={true}
                    />
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClosePopup} activeOpacity={0.6} className="p-2 bg-main-blue rounded-lg">
                   <Text style={{fontFamily:'geometria-regular'}} className="text-[#ffff] text-base">Сохранить</Text>
                </TouchableOpacity>
            </View>
            </Pressable>
      </Modal>
    </>
  );
};

export default RestOf;
