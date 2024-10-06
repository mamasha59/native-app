import { useTranslation } from "react-i18next";
import { View, Text, Switch, TouchableOpacity, Dimensions } from "react-native";

interface iSwitchToggle {
    isEnabled: boolean,
    onValueChange: () => void,
    title: string,
}

const window = Dimensions.get('window');

const SwitchToggle = ({isEnabled, onValueChange, title}:iSwitchToggle) => {
    const {t} = useTranslation();
  return (
    <View className="border border-main-blue rounded-md items-center flex-row justify-center flex-1 w-full flex-wrap">
        <TouchableOpacity
            style={{width: window.width / 1.7}}
            activeOpacity={.7}
            onPress={onValueChange}
            className="items-center p-2 justify-center">
            <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-start">
                {title}
            </Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
            <View className="h-6 w-[1px] rounded-md bg-[#0000003c] mr-2"/>
            <Text className="pr-2 capitalize" style={{fontFamily:'geometria-bold'}}>{t('no')}</Text>
            <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={isEnabled}
                onValueChange={onValueChange}
                className="h-5 border w-9"
            />
            <Text className="capitalize" style={{fontFamily:'geometria-bold'}}>{t('yes')}</Text>
        </View>
    </View>
  );
};

export default SwitchToggle;
