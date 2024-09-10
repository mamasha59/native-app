import { useTranslation } from "react-i18next";
import { useCallback, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, Alert, View} from "react-native";
import { Image } from 'expo-image';
import {
  BottomSheetModal,
  BottomSheetFlatList,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { iLanguage } from "../../../types";
import { setLanguage } from "../../../store/slices/appStateSlicer";
import { languages } from "../../../utils/const";

const SwitchLanguage = () => {
    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const selectedLanguage = useAppSelector(state => state.appStateSlice.setLanguage);
  
    const [openModalChangeLanguage, setOpenModalChangeLanguage] = useState<boolean>(false);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleModalChangeLanguage = () => setOpenModalChangeLanguage(!openModalChangeLanguage);
    
    const handleClickLang = (language:iLanguage) => {
      if(language.id) {
        i18n.changeLanguage(language.id)
        .catch((e) => Alert.alert(e))
        dispatch(setLanguage(language));
        handleModalChangeLanguage();
        bottomSheetModalRef.current?.close();
      }
    }

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
    <>
    <TouchableOpacity
      activeOpacity={.9}
      onPress={handlePresentModalPress}
      className="py-4 mt-2 border-b border-main-blue flex-row justify-between items-center">
      <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-sm uppercase">
        {t("language")}
      </Text>
      <View className="flex-row items-center">
          <View className="w-8 h-8 mr-2 items-center">
              <Image
                style={{width:'100%', height:'100%'}}
                source={selectedLanguage.icon}
                placeholder={selectedLanguage.id}
                contentFit="cover"
                transition={1000}
              />
          </View>
          <Text style={{fontFamily:'geometria-bold'}} className="text-[#048eff] text-sm uppercase">{selectedLanguage.title}</Text>
      </View>
    </TouchableOpacity>

    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetFlatList
        data={languages}
        keyExtractor={(i) => i.id}
        renderItem={({item}) =>
          <TouchableOpacity
            activeOpacity={.9}
            className="items-center mb-5 px-2 flex-row justify-center"
            onPress={() => handleClickLang(item)}>
            <View className="w-10 h-10 mr-2 items-center">
              <Image
                accessibilityLabel={item.title}
                style={{width:'100%', height:'100%'}}
                source={item.icon}
                placeholder={item.id}
                contentFit="cover"
                transition={1000}
              />
            </View>
            <Text style={{fontFamily:'geometria-regular'}} className="text-[#101010] text-lg w-24 text-center">{item.title}</Text>
          </TouchableOpacity>
        }
      />
    </BottomSheetModal>
    </>
  );
};

export default SwitchLanguage;