import { View, Text, TouchableOpacity, Platform } from "react-native";
import {useCallback, useMemo, useRef} from "react";
import { useTranslation } from "react-i18next";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import NelatonIcon from "../../../assets/images/iconsComponent/NelatonIcon";
import { consumableItemChangeQuantity } from "../../../store/slices/consumablesSlice";
import { ClosePopup } from "../../../assets/images/icons";

const RestOf = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {consumablesItem} = useAppSelector(state => state.consumablesSlice);
  
  const navigation = useNavigation<StackNavigationRoot>();
  const currentRoute = useNavigationState(state => state.routes[state.index].name);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const inputRef = useRef<TextInput>(null);
  const snapPoints = useMemo(() => ['45%', '75%'], []);

  const handleOpenPopup = () => {
    if(currentRoute === 'Home') {
      navigation.navigate('ControlCatheter');
    }else {
      bottomSheetModalRef.current?.present();
    }
  };

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
    ),
    []
  );

  return (
    <View>
      <TouchableOpacity style={{elevation:Platform.OS === 'android' ? 5 : 0, 
                                shadowColor: 'black', 
                                shadowOffset: { width: 0, height: 2 }, 
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                              }}
                                activeOpacity={.8}
                                onPress={handleOpenPopup} 
                                className="bg-main-blue rounded-xl w-full p-5 relative">
        {consumablesItem.slice(0, currentRoute === 'Home' ? 1 : consumablesItem.length).map((item) => (
            <View key={item.id} className="flex-row mb-4 justify-between relative flex-wrap">
              <View className={`${item.category === 'catheter' ? 'flex-col' : 'flex-row'} flex-1 items-start flex-wrap`}>
                <Text 
                  style={{ fontFamily: item.category === 'catheter' ? "geometria-bold" : "geometria-regular"}}
                  className="mr-2 text-base text-white border-b-[.2px] border-[#f5dd4b] whitespace-pre-wrap">
                  {item.name}:
                </Text>
                <View className="flex-row items-center flex-wrap">
                  <Text
                    style={{ fontFamily: "geometria-bold"}}
                    className="text-base text-white">
                      {item.quantity+''}
                    </Text>
                   <Text
                    style={{ fontFamily: item.category === 'catheter' ? "geometria-bold" : "geometria-regular" }}
                    className="ml-2 text-base text-white">
                      {t("units")}
                    </Text>
                </View>
              </View>
              {item.category !== 'catheter' 
                ?(<>
                  <Text className={`${item.active === true ? 'text-[#69ff6b]' : 'text-[#a50002]'}  text-sm leading-6`} style={{ fontFamily: "geometria-regular" }}>
                    - {item.active === true ? 'учитываем' : 'не учитываем' } расход
                  </Text>
                </>)
                :(<View className="items-center bg-[#fff] absolute right-0 top-0 rounded-full p-2">
                  <NelatonIcon/>
                </View>)
              }
            </View>
        ))}
        <View className="items-end">
          <Text className="text-white underline" style={{ fontFamily: "geometria-regular" }}>
            {currentRoute === 'Home' ? 'Контроль расходников' : 'Редактировать'}
          </Text>
        </View>
      </TouchableOpacity>
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
        <View className="flex-1 p-6">
          <Text className="text-2xl mb-5" style={{ fontFamily: "geometria-bold" }}>Изменить количество:</Text>
          <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()} activeOpacity={0.6} className="p-2 absolute top-[5%] right-[5%]">
              <ClosePopup width={15} height={15}/>
            </TouchableOpacity>
          <BottomSheetFlatList
            data={consumablesItem}
            keyExtractor={(i) => i.id}
            renderItem={({item}) =>
              <TouchableOpacity
                // onPress={inputFocus}
                activeOpacity={.9}
                className="items-start flex-1 mb-5 border-b-[.2px] flex-row justify-between mx-3 pt-3"
              >
                <Text style={{fontFamily:'geometria-regular'}} className="text-[#101010] text-lg text-start uppercase">
                  {item.name}
                </Text>
                <View className="flex-row items-center relative">
                  <Text style={{fontFamily:'geometria-regular'}} className="absolute text-xs -top-3 text-center">изменить</Text>
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
                    <Text
                    style={{ fontFamily: "geometria-regular" }}
                    className="ml-2 text-lg">
                      {t("units")}
                    </Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default RestOf;