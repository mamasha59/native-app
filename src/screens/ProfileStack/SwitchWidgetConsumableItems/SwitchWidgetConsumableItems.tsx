import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleWidgetConsumableItems } from "../../../store/slices/appStateSlicer";

const SwitchWidgetConsumableItems = () => {
  const {showWidgetConsumableItems} = useAppSelector(state => state.appStateSlice);
  const dispatch = useAppDispatch();

  const handleWidgetState = () => {
    dispatch(toggleWidgetConsumableItems(!showWidgetConsumableItems));
  }

  const title = showWidgetConsumableItems ? 'Скрыть' : 'Показать'

  return (
    <TouchableOpacity activeOpacity={.9} onPress={handleWidgetState} className="mt-2 border-b border-main-blue py-3 text-center flex-1">
      <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-sm uppercase">
        <Text className={`underline ${showWidgetConsumableItems ? 'text-error' : 'text-[#27ae60]'} `}>{title}</Text> виджет «Запасы» на главном экране
      </Text>
    </TouchableOpacity>
  );
};

export default SwitchWidgetConsumableItems;
