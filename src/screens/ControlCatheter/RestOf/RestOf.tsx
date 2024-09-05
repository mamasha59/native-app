import { View, Text, TouchableOpacity, Platform, Pressable, Modal, TextInput, Dimensions } from "react-native";
import {useState} from "react";
import { useTranslation } from "react-i18next";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addCatheter } from "../../../store/slices/journalDataSlice";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import { ClosePopup } from "../../../assets/images/icons";
import NelatonIcon from "../../../assets/images/iconsComponent/NelatonIcon";

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
          <Text style={{ fontFamily: "geometria-regular" }} className="text-[8px] leading-[10px] text-[#ffff]">{t("in")} 3 {t("day")}, 0 {t("catheterStockComponent.units_will_remain")}</Text>
          <View className="items-center bg-[#fff] absolute right-[15px] top-[8px] rounded-full p-2">
            { currentRoute !== 'Home'
              ?<NelatonIcon/>
              :<FontAwesome5 name="external-link-alt" size={20} color="black"/>
            }
          </View>
          {currentRoute !== 'Home' &&
            <View className="items-end absolute right-0 bottom-0 p-2">
              <Text style={{ fontFamily: "geometria-regular" }} className="text-[#ffff] text-xs text-end underline">
                Редактировать
              </Text>
            </View>
          }
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
        animationType="fade">
          <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-center flex-1 bg-[#10101035]">
            <View style={{minHeight: window.height * 0.3, width:window.width * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] rounded-3xl justify-center items-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mt-4">
              {t("catheterStockComponent.modalEditCatheters.how_many_catheters_do_you_have")}
            </Text>
                <View className="flex-row items-center mt-7 mb-4">
                    <TextInput
                        style={{fontFamily:'geometria-regular'}}
                        keyboardType="numeric"
                        value={inputValue}
                        maxLength={3}
                        placeholder={t("catheterStockComponent.modalEditCatheters.press_to_write")}
                        underlineColorAndroid={'#DADADA'}
                        onChangeText={handleChangeCatetor}
                        onSubmitEditing={handleClosePopup}
                        className="w-1/2 text-center"
                        autoFocus={true}
                    />
                    <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5">{t("units")}.</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClosePopup} activeOpacity={0.6} className="p-2 bg-main-blue rounded-lg">
                  <Text style={{fontFamily:'geometria-regular'}} className="text-[#ffff] text-base">{t("save")}</Text>
                </TouchableOpacity>
            </View>
          </Pressable>
      </Modal>
    </>
  );
};

export default RestOf;
