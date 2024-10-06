import { Dimensions, Text, TouchableOpacity } from "react-native";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleWidgetConsumableItems } from "../../../store/slices/appStateSlicer";

const screen = Dimensions.get('screen');

const SwitchWidgetConsumableItems = () => {
  const {showWidgetConsumableItems} = useAppSelector(state => state.appStateSlice);
  const dispatch = useAppDispatch();

  const handleWidgetState = () => {
    dispatch(toggleWidgetConsumableItems(!showWidgetConsumableItems));
  }

  const title = showWidgetConsumableItems ? 'Скрыть' : 'Показать'

  return (
    <TouchableOpacity
      activeOpacity={.9}
      onPress={handleWidgetState}
      className="mt-2 border-b justify-between w-full border-main-blue py-3 text-center items-center flex-wrap flex-row">
      <Text style={{fontFamily:'geometria-bold', width: screen.width / 2}} className="text-main-blue text-sm uppercase">
        Виджет «Запасы» на главном экране
      </Text>
      <Text
        style={{fontFamily:'geometria-bold'}}
        className={`underline text-sm uppercase ${showWidgetConsumableItems ? 'text-error' : 'text-[#27ae60]'} `}>
          {title}
        </Text>
    </TouchableOpacity>
  );
};

export default SwitchWidgetConsumableItems;
