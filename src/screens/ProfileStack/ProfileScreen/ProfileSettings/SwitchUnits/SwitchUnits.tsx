import { useTranslation } from "react-i18next";
import { Text, FlatList,TouchableOpacity } from "react-native";
import {useEffect, useState } from "react";

import ModalSelect from "../../../../../components/ModalSelect/ModalSelect";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { iUnits } from "../../../../../types";
import { switchUnits } from "../../../../../store/slices/appStateSlicer";

const SwitchUnits = () => {
    const {t, i18n} = useTranslation();
    const dispatch = useAppDispatch();
    const units = useAppSelector(state => state.appStateSlice.units);
  
    const [openModalChangeUnits, setOpenModalChangeUnits] = useState<boolean>(false);

    const handleModalChangeLanguage = () => {
        setOpenModalChangeUnits(!openModalChangeUnits);
      }
    
      const handleClickUnit = (item:iUnits) => {
        dispatch(switchUnits(item));
        handleModalChangeLanguage();
      }

      const arrayOfUnits = [
        {title: t("ml"), id: "ml"}, {title: t("fl_oz"), id: "fl_oz"}
      ];

      useEffect(() => {
        if(units.id === 'ml'){
            dispatch(switchUnits(arrayOfUnits[0]))
        }else {
            dispatch(switchUnits(arrayOfUnits[1]))
        }
      },[i18n.language])

  return (
    <>
    <TouchableOpacity onPress={handleModalChangeLanguage} className="py-4 mt-2 border-b border-main-blue flex-row justify-between">
        <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-sm uppercase">
            {t("unit")}
        </Text>
        <Text style={{fontFamily:'geometria-bold'}}  className="text-[#048eff] text-sm uppercase">
            {units.title}
        </Text>
    </TouchableOpacity>
    <ModalSelect
        height={3.4}
        showIcon={false}
        title="Изменить единицу"
        onItemPress={(item) => console.log(item)}
        openModal={openModalChangeUnits}
        setOpenModal={handleModalChangeLanguage}
        >
        <FlatList
            data={arrayOfUnits}
            renderItem={({item}) =>
                <TouchableOpacity className="items-center mb-5 px-2 border-b border-main-blue mx-auto" onPress={() => handleClickUnit(item)}>
                    <Text
                        style={{fontFamily:'geometria-bold'}}
                        className={`text-[#101010] text-2xl uppercase ${units.id === item.id && 'text-purple-button'}`}>
                        {item.title}
                </Text>
                </TouchableOpacity>
            }
            keyExtractor={item => item.id!}
        />
    </ModalSelect>
    </>
  );
};

export default SwitchUnits;
