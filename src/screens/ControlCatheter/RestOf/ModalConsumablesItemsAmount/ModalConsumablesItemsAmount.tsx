// import { View, Text, Modal, Pressable, TextInput, TouchableOpacity, Dimensions } from "react-native";
// import React, { useState } from "react";
// import { ClosePopup } from "../../../../assets/images/icons";
// import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
// import { addCatheter } from "../../../../store/slices/journalDataSlice";
// import { useTranslation } from "react-i18next";

// const window = Dimensions.get('window');

// const ModalConsumablesItemsAmount = ({handleClosePopup}:{handleClosePopup:()=> void}) => {
//     const {t} = useTranslation();

//     const [modalVisible, setModalVisible] = useState<boolean>(false);
    
  
//   const handleChangeCatetor = (value:string) => {
//     if(+value <= 0) {
//       setInputValue('');
//     }else {
//       const numericValue = value.replace(/\D/g, ''); // \D соответствует всем не-цифровым символам
//       setInputValue(numericValue);
//     }
//   }


//   return (
//     <Modal
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {setModalVisible(!modalVisible)}}
//         animationType="fade">
//         <Pressable onPress={(event) => event.target === event.currentTarget && setModalVisible(false)} className="justify-center flex-1 bg-[#10101035]">
//             <View style={{minHeight: window.height * 0.3, width:window.width * 0.3}} className="relative min-w-[315px] mx-auto bg-[#ffff] rounded-3xl justify-center items-center">
//             <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5 text-center mt-4">
//             {t("catheterStockComponent.modalEditCatheters.how_many_catheters_do_you_have")}
//             </Text>
//                 <View className="flex-row items-center mt-7 mb-4">
//                     <TextInput
//                         style={{fontFamily:'geometria-regular'}}
//                         keyboardType="numeric"
//                         value={inputValue}
//                         maxLength={3}
//                         placeholder={t("catheterStockComponent.modalEditCatheters.press_to_write")}
//                         underlineColorAndroid={'#DADADA'}
//                         onChangeText={handleChangeCatetor}
//                         onSubmitEditing={handleClosePopup}
//                         className="w-1/2 text-center"
//                         autoFocus={true}
//                     />
//                     <Text style={{fontFamily:'geometria-regular'}} className="text-base leading-5">{t("units")}.</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
//                     <ClosePopup width={15} height={15}/>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleClosePopup} activeOpacity={0.6} className="p-2 bg-main-blue rounded-lg">
//                 <Text style={{fontFamily:'geometria-regular'}} className="text-[#ffff] text-base">{t("save")}</Text>
//                 </TouchableOpacity>
//             </View>
//         </Pressable>
//     </Modal>
//   );
// };

// export default ModalConsumablesItemsAmount;
