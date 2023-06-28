import { View } from "react-native";
import  {useState } from "react";
import { Picker } from "@react-native-picker/picker";

import WelcomeLayout from "../../../../components/WelcomeLayout/WelcomeLayout";
import { NavigationPropsWelcome } from "../../UserData";

interface FirstOptionalScreen extends NavigationPropsWelcome<'FirstOptionalScreen'>{}

const FirstOptionalScreen = ({navigation}:FirstOptionalScreen) => {

    const [signal, setSignal] = useState();

    const onSubmit = () => { // функция при клике на кнопку 'Сохранить'
        navigation.navigate('SecondOptionalScreen');
    }

    const skipScreen = () => { // функция при клике на кнопку 'Изменить позже'
        navigation.navigate('SecondOptionalScreen');
    }

  return (
    <WelcomeLayout title="Настройки уведомлений" buttonTitle="Сохранить изменения" handleProceed={onSubmit} skip={true} skipNextScreen={skipScreen}>
     
            <View className="border-b border-[#4babc526] mb-10">
                <Picker 
                    
                    mode="dropdown"
                    itemStyle={{fontSize:18}}
                    selectedValue={signal}
                    onValueChange={(itemValue, itemIndex) =>
                        setSignal(itemValue)
                }>
                    <Picker.Item label="Тип сигнала" value="Тип сигнала" />
                    <Picker.Item label="Будильник 1 (по умолчанию)" value="Будильник 1 (по умолчанию)" />
                    <Picker.Item label="Радар" value="Радар" />
                    <Picker.Item label="Звук смс" value="Звук смс" />
                    <Picker.Item label="Вступление" value="Вступление" />
                </Picker>
            </View>
            <View className="border-b border-[#4babc526]">
                <Picker 
                    mode="dropdown"
                    itemStyle={{fontSize:18}}
                    selectedValue={signal}
                    onValueChange={(itemValue, itemIndex) =>
                        setSignal(itemValue)
                }>
                    <Picker.Item label="Тип сигнала" value="Тип сигнала" />
                    <Picker.Item label="Будильник 1 (по умолчанию)" value="Будильник 1 (по умолчанию)" />
                    <Picker.Item label="Радар" value="Радар" />
                    <Picker.Item label="Звук смс" value="Звук смс" />
                    <Picker.Item label="Вступление" value="Вступление" />
                </Picker>
            </View>

    </WelcomeLayout>
  );
};

export default FirstOptionalScreen;
