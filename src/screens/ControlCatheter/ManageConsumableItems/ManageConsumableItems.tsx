import { useTranslation } from "react-i18next";
import { TextInput } from "react-native-gesture-handler";
import { useCallback, useMemo, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import {
    BottomSheetModal,
    BottomSheetFlatList,
    BottomSheetBackdrop,
    BottomSheetTextInput,
  } from '@gorhom/bottom-sheet';
  
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { consumableItemChangeQuantity } from "../../../store/slices/consumablesSlice";
import { ClosePopup } from "../../../assets/images/icons";
import { capitalizeFirstLetter } from "../../../utils/const";

const screen = Dimensions.get('screen');

const ManageConsumableItems = () => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const inputRef = useRef<TextInput>(null);
    const snapPoints = useMemo(() => ['50%', '100%'], []);
  
    const {consumablesItem} = useAppSelector(state => state.consumablesSlice);

    const handleOpenPopup = () => bottomSheetModalRef.current?.present();
    
    const handleInputChangeQuantity = (id: string, value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    dispatch(consumableItemChangeQuantity({ id: id, value: cleanedValue }));
    };
    
    const renderBackdrop = useCallback(
    (props:any) => (
        <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
        />
    ),[]);

  const filteredData = consumablesItem.filter(item => item.active);

  return (
    <>
    <TouchableOpacity className="bg-main-blue p-2 rounded-md" onPress={handleOpenPopup} activeOpacity={.9}>
      {filteredData.map((item) => (
        <View key={item.id} className="flex-row justify-center relative flex-wrap my-1">
          <View className={`${item.category === 'catheter' ? 'flex-col' : 'flex-row'} flex-1 items-start flex-wrap`}>
            <Text 
              style={{ fontFamily: item.category === 'catheter' ? "geometria-bold" : "geometria-regular"}}
              className="mr-2 text-base text-white border-b-[.2px] border-main-blue whitespace-pre-wrap">
              {item.name}:
            </Text>
            <View className="flex-row items-center flex-wrap">
              <Text style={{ fontFamily: "geometria-bold"}} className="text-base text-white">
                {item.quantity+''}
              </Text>
              <Text style={{ fontFamily: item.category === 'catheter' ? "geometria-bold" : "geometria-regular" }} className="ml-2 text-base text-white">
                {t("units")}
              </Text>
            </View>
          </View>
        </View>
      ))}
      <View className="mt-3 items-end">
        <Text style={{ fontFamily: "geometria-bold" }} className="text-white underline">
          {t("catheterStockScreen.consumableItems.manageConsumableItemsComponent.change_the_amount")}
        </Text>
      </View>
    </TouchableOpacity>

    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
    >
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          name="change-quantity"
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enableDismissOnClose
          keyboardBehavior="interactive"
          keyboardBlurBehavior="none"
          >
          <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()} activeOpacity={0.6} className="p-2 absolute top-0 right-[5%]">
            <ClosePopup width={15} height={15}/>
          </TouchableOpacity>
          <View className="flex-1 p-6">
            <Text className="text-2xl mb-5" style={{ fontFamily: "geometria-bold" }}>
              {capitalizeFirstLetter(t("catheterStockScreen.consumableItems.manageConsumableItemsComponent.change_the_amount"))}
            </Text>
            <BottomSheetFlatList
              data={consumablesItem}
              keyExtractor={(i) => i.id}
              keyboardShouldPersistTaps="handled"
              bounces={false}
              contentContainerStyle={{paddingBottom: 60, marginHorizontal: 10}}
              renderItem={({item}) =>
                <View className="items-center flex-1 mb-3 border-b-[.2px] flex-row justify-between py-3">
                  <Text style={{fontFamily:'geometria-regular', maxWidth: screen.width / 1.7}} className="text-main-blue text-lg text-start whitespace-pre-wrap uppercase">
                    {item.name}
                  </Text>
                  <View className="flex-row items-center relative">
                    <Text style={{fontFamily:'geometria-regular'}} className="absolute text-purple-button text-xs -top-4 text-center">
                      {t("edit")}
                    </Text>
                    <BottomSheetTextInput
                      ref={inputRef}
                      value={item.quantity+''}
                      onChangeText={(value) => handleInputChangeQuantity(item.id, value)}
                      className="text-xl w-12 text-end"
                      style={{ fontFamily: "geometria-bold", fontSize: 20, width: 60 }}
                      selectTextOnFocus
                      maxLength={4}
                      keyboardType="numeric"
                    />
                      <Text style={{ fontFamily: "geometria-regular" }} className="ml-2 text-lg">
                        {t("units")}
                      </Text>
                  </View>
              </View>
              }
            />
          </View>
      </BottomSheetModal>
    </KeyboardAvoidingView>
    </>
  );
};

export default ManageConsumableItems;