import { View, Text, TouchableOpacity } from "react-native";
import ProfileSelect from "../ProfileSelect/ProfileSelect";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationRoot } from "../../../../../components/RootNavigations/RootNavigations";
import { Option } from "../../../../../types";
import { useAppSelector } from "../../../../../store/hooks";

const NightModeSelect = () => {
    const settings = useAppSelector((state) => state.appStateSlice); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const navigation = useNavigation<StackNavigationRoot>();

    const handleUseAtNight = (value:Option) => { // функция при выборе селекта Катетеризация в ночное время
        if(!value.value) navigation.navigate('NightMode');     
    }
  return (
    <View className="items-center mb-4 bg-[#ecf0f1] px-1 py-1 rounded-xl">
        <ProfileSelect
            confirmation={false}
            handleClickOption={handleUseAtNight}
            title="Катетеризация в ночное время"
            value={settings.nighMode.title}
            key={"Катетеризация в ночное время"}
            />
        <TouchableOpacity onPress={() => navigation.navigate('NightMode')}>
            <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue">
                Ночной режим катетеризации
            </Text>
        </TouchableOpacity>
    </View>
  );
};

export default NightModeSelect;
