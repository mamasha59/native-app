import { View, Text, Switch, TouchableOpacity, Dimensions } from "react-native";

interface iSwitchToggle {
    isEnabled: boolean,
    onValueChange: () => void,
    title: string,
}

const window = Dimensions.get('window');

const SwitchToggle = ({isEnabled, onValueChange, title}:iSwitchToggle) => {
  return (
    <View className="items-center flex-row justify-between w-full">
        <TouchableOpacity
            style={{width: window.width / 1.6}}
            activeOpacity={.7}
            onPress={onValueChange}
            className="border border-main-blue rounded-xl mr-[5px] max-w-[290px] items-center p-4 justify-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-center">
                {title}
            </Text>
        </TouchableOpacity>
        <View style={{width: window.width / 0.4}} className="flex-row flex-1">
            <Text className="pr-2" style={{fontFamily:'geometria-regular'}}>Нет</Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={isEnabled}
                onValueChange={onValueChange}
                className="h-5 border w-9"
            />
            <Text className="pr-2" style={{fontFamily:'geometria-regular'}}>Да</Text>
        </View>
    </View>
  );
};

export default SwitchToggle;
