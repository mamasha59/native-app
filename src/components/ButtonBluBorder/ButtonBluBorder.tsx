import { Text, TouchableOpacity } from "react-native";

interface iButtonBluBorder {
    handlePressButton: () => void,
    title: string | number,
    marginRight?: number,
}

const ButtonBluBorder = ({handlePressButton, title, marginRight}:iButtonBluBorder) => {
  return (
    <TouchableOpacity
        onPress={handlePressButton}
        activeOpacity={.6}
        className={`border border-main-blue rounded-xl min-w-[115px] min-h-[44px] flex-1 justify-center items-center mr-${marginRight}`}>
        <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBluBorder;
