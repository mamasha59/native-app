import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { WebView } from 'react-native-webview';

import data from '../questions.json';

import MainLayout from "../../../Layouts/MainLayout/MainLayout";
import { DropDown } from "../../../assets/images/icons";
import { NavigationPropsRecommendations } from "../RecommendationsStack";
import useBackHandler from "../../../hooks/useBackHandler";

interface iRecommendations extends NavigationPropsRecommendations<'RecommendationsScreen'>{}

const RecommendationsScreen = ({navigation}:iRecommendations) => {
  useBackHandler();

  const [activeIndex, setActiveIndex] = useState<number | null>(); // текущий индекс открытого блока

  const handleItemClick = (index:number):void => { // заменить активный индекс
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClickButton = () => navigation.navigate('FeedBackScreen');

  return (
    <MainLayout title={'Рекомендации'} buttonAction={handleClickButton} buttonBottomTitle="Написать разработчикам">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-base" style={{fontFamily:'geometria-bold'}}>
            Опросники:
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Survey', {cameFrom: ''})} activeOpacity={.9} className="p-2 bg-purple-button items-center rounded-md">
            <Text style={{fontFamily:'geometria-regular'}} className="text-lg text-white text-center">Опросник удовлетворенности катетеризацией</Text>
          </TouchableOpacity>
        </View>
        <View className="mb-6">
          <Text style={{fontFamily:'geometria-regular'}} className="text-base italic underline">
            Nelaton app — это ваш личный помощник в самокатетеризации.
            Ваш врач уже должен был объяснить причины, по которым вам необходимо проводить катетеризацию, и научить вас технике выполнения этой процедуры.
            Важно внимательно изучить инструкцию к катетерам, которые вы собираетесь использовать.
          </Text>
        </View>
        <View className="mb-6">
          <Text style={{fontFamily:'geometria-bold'}} className="text-base">Как это работает?</Text>
          <View>
            <Text style={{fontFamily:'geometria-bold'}} className="text-base">video</Text>
          </View>
        </View>
        <View className="pb-20">
          {data.map((e,index:number) =>
            <TouchableOpacity
              key={index} activeOpacity={1}
              onPress={() => handleItemClick(index)}
              className="relative py-[15px] pl-[15px] pr-8 mb-5 border border-main-blue rounded-md">
              <Text style={{fontFamily:'geometria-bold'}} className={`${activeIndex === index ? 'text-main-blue' : 'text-black'} text-base leading-4`}>{e.question}</Text>
              <View className={`absolute right-[15px] top-[19px] ${activeIndex === index && 'rotate-180'}`}>
                <DropDown width={10} height={10} color={'#101010'}/>      
              </View>
              <View className={`mt-3 ${activeIndex === index ? 'block' : 'hidden'}`}>
                <Text style={{fontFamily:'geometria-regular'}} className="text-base">{e.answer}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default RecommendationsScreen;
