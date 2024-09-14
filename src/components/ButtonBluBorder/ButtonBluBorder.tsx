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
        className={`border border-main-blue rounded-xl flex-1 py-3 justify-center items-center mr-${marginRight}`}>
        <Text style={{fontFamily:'geometria-bold'}} className="text-sm">{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBluBorder;
