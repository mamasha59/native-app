import { View, Text } from "react-native"
import NelatonIcon from "../../assets/images/iconsComponent/NelatonIcon";
import { useAppSelector } from "../../store/hooks";

const CatheterizationReminder = () => {
  const setting = useAppSelector(state => state.timerStates.yellowInterval);
  return (
    <View className="flex-row flex-1 mt-3 bg-[#ecf0f1] p-2 px-5 items-start rounded-md">
        <View className="border-main-blue border max-w-[47px] max-h-[47px] w-full rounded-full p-2 mr-3">
            <NelatonIcon/>
        </View>
        <View className="">
            <Text style={{fontFamily:'geometria-regular'}} className="text-xs">
                Мы напомним вам о необходимости катетеризироваться за {setting} минут до окончания интервала. Вы можете изменить эти и другие настройки ниже.
            </Text>
        </View>
    </View>
  );
};

export default CatheterizationReminder;
