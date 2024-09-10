import { View, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import LottieView from "lottie-react-native";

import WelcomeLayout from "../../Layouts/WelcomeLayout/WelcomeLayout";
import { CheckedIcom } from "../../assets/images/icons";
import { changeIsExist } from "../../store/slices/appStateSlicer";
import { NavigationPropsWelcome } from "../UserData/UserData";
import { useAppDispatch } from "../../store/hooks";

interface iPayWall extends NavigationPropsWelcome<'PayWall'>{}

const PayWall = ({navigation}:iPayWall) => {
    const dispatch = useAppDispatch();

    const [selectedPlan, setSelectedPlan] = useState<{ id: string; label: string; price: string; description?: string}>({
        id: '',
        label: '',
        price: '',
        description: ''
    });

    const plans = [
        { id: 'free-trial', label: '3 дня бесплатно', price: '59$', description: 'затем 59$ в год - экономия  более 50% по сравнению с месячной оплатой' },
        { id: 'annual', label: '12 месяцев', price: '59$',},
        { id: 'monthly', label: 'В месяц', price: '9,99$' },
        { id: 'lifetime', label: 'Пожизненная подписка', price: '99$', description: 'Премиум' },
      ];

    const handleProceed = () => {
        navigation.navigate('HomeScreen');
        dispatch(changeIsExist(true));
    }

  return (
    <WelcomeLayout
        buttonTitle="Оформить подписку"
        handleProceed={handleProceed}
        currentScreen={0}
        titleCenter
        paywall
        >
      <>
      <LinearGradient
        colors={['#FF6F61', '#FF9671']}
        className="rounded-3xl items-center px-5 py-2"
      >
        <LottieView
            autoPlay
            style={{
            width: 90,
            height: 90,
            }}
            source={require('../../assets/padlock.json')}
        />
        <View className="items-center flex-1">
            <Text style={{fontFamily:'geometria-bold'}} className="text-center text-lg">
                Nelaton.app – полный контроль над катетеризацией
            </Text>
        </View>
      </LinearGradient>

      <View className="items-start flex-1">
        <Text style={{fontFamily:'geometria-bold'}} className="text-lg my-3">Преимущества премиум-доступа:</Text>

        <View className="flex-1 mb-3 flex-row items-start">
            <MaterialIcons name="check-circle" size={24} color="#FF6F61"/>
            <View className="ml-2">
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm">Контроль времени катетеризации:</Text>
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm">Получай напоминания точно в нужный момент и избегай осложнений.</Text>
            </View>
        </View>
        <View className="flex-1 mb-3 flex-row items-start">
            <MaterialIcons name="check-circle" size={24} color="#FF6F61"/>
            <View className="ml-2">
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm">Учёт катетеров:</Text>
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm">Всегда знай, сколько катетеров осталось, и планируй их покупку заранее.</Text>
            </View>
        </View>

        <View className="flex-1 mb-3 flex-row items-start">
            <MaterialIcons name="check-circle" size={24} color="#FF6F61"/>
            <View className="ml-2">
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm">Дневник мочеиспускания с PDF-отчётами:</Text>
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm">Удобно сохраняй данные и делись с врачом за секунды.</Text>
            </View>
        </View>

        <View className="flex-1 mb-3 flex-row items-start">
            <MaterialIcons name="check-circle" size={24} color="#FF6F61"/>
            <View className="ml-2">
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm">Баланс жидкости под контролем:</Text>
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm">Следи за водным балансом для поддержания здоровья.</Text>
            </View>
        </View>

        <View className="flex-1 mb-3 flex-row items-start">
            <MaterialIcons name="check-circle" size={24} color="#FF6F61"/>
            <View className="ml-2">
                <Text style={{fontFamily:'geometria-bold'}} className="text-sm">Умные уведомления:</Text>
                <Text style={{fontFamily:'geometria-regular'}} className="text-sm">Настрой оповещения под себя.</Text>
            </View>
        </View>
      </View>

      <View className="flex-1">
        <Text style={{fontFamily:'geometria-bold'}} className="text-lg">Выбери свой план:</Text>
        <View className="gap-3 flex-1 justify-start">
            {plans.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    activeOpacity={.8}
                    className="border h-auto w-full border-main-blue rounded-2xl px-3 py-4 justify-center items-start"
                    style={{backgroundColor: selectedPlan.id === item.id ? '#ff6e6111' : '#fff'}}
                    onPress={() => setSelectedPlan(item)}>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-sm">{item.label}</Text>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-lg mt-2">{item.price}</Text>
                    {item.description && item.description.length > 0 && <Text style={{fontFamily:'geometria-regular'}} className="text-sm">{item.description}</Text>}
                    <View className={`w-7 h-7 rounded-full absolute items-center justify-center right-4 ${selectedPlan.id === item.id ? 'bg-[#ffe41a] ' : 'bg-[#ecf0f1]'}`}>
                        {selectedPlan.id === item.id && <CheckedIcom/>}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
        <View className="justify-center my-2 flex-1">
            <Text style={{fontFamily:'geometria-regular'}} className="p-1 text-sm leading-4">
                Приложение не заменяет профессиональную медицинскую консультацию. Всегда консультируйтесь с врачом по любым вопросам здоровья.
            </Text>
            <Text style={{fontFamily:'geometria-regular'}} className="p-1 text-sm leading-4">
                Your subscription automatically renews for the same term unless cancelled at least 24 hours prior to the end of the current term.
                Cancel any time in Google Play at no additional cost; your subscription will then cease at the end of the current term.
            </Text>
        </View>
        <Text style={{fontFamily:'geometria-regular'}} className="p-1 text-sm leading-4">
            Использование приложения предполагает согласие с:
        </Text>
        <View className="w-full flex-row flex-wrap items-center justify-center mb-3 flex-1">
            <TouchableOpacity>
                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue p-1">Условия</Text>
            </TouchableOpacity>
            <Text style={{fontFamily:'geometria-bold'}} className="">|</Text>
            <TouchableOpacity>
                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue p-1">Политика конфиденциальности</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue p-1"> Восстановление покупки</Text>
            </TouchableOpacity>
        </View>
      </View>
    </>
    </WelcomeLayout>
  );
};

export default PayWall;
//     container: {
//       flex: 1,
//       backgroundColor: '#FFF',
//     },
//     header: {
//       padding: 30,
//       alignItems: 'center',
//     },
//     icon: {
//       marginBottom: 20,
//     },
//     title: {
//       fontSize: 28,
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     subtitle: {
//       fontSize: 16,
//       color: 'white',
//       textAlign: 'center',
//       marginTop: 10,
//     },
//     features: {
//       paddingHorizontal: 20,
//       paddingVertical: 30,
//     },
//     featureTitle: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     featureItem: {
//       alignItems: 'center',
//       marginBottom: 15,
//     },
//     featureText: {
//       fontSize: 16,
//       marginLeft: 10,
//     },
//     button: {
//       marginHorizontal: 20,
//       marginBottom: 30,
//     },
//     buttonBackground: {
//       paddingVertical: 15,
//       borderRadius: 30,
//       alignItems: 'center',
//     },
//     buttonText: {
//       color: 'white',
//       fontSize: 18,
//       fontWeight: 'bold',
//     },
//  planCard: {
//     backgroundColor: '#FFF',
//     borderWidth: 1,
//     borderColor: '#FF6F61',
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     marginBottom: 15,
//     alignItems: 'center',
//   },
//   selectedPlanCard: {
//     backgroundColor: '#FF9671',
//   },
//   planLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FF6F61',
//   },
//   planPrice: {
//     fontSize: 16,
//     color: '#FF6F61',
//     marginTop: 5,
//   },
//   plansContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 30,
//   },
//   });