import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";

import { DropDown } from "../../../assets/images/icons";
import data from './questions.json';
import { NavigationPropsRecomendations } from ".";
import MainLayout from '../../../Layouts/MainLayout/MainLayout';

interface iRecomendations extends NavigationPropsRecomendations<'Recomendations'>{}

const Recomendations = ({navigation}:iRecomendations) => {

  const [activeIndex, setActiveIndex] = useState<number | null>(); // текущий индекс открытого блока

  const handleItemClick = (index:number):void => { // заменить активный индекс
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClickButton = () => {
    navigation.navigate('FeedBack');
  }

  return (
    <MainLayout title={'Рекомендации'} buttonBottomTitle="Отзывы и предложения" buttonAction={handleClickButton} >
      <ScrollView>
      <View className="pb-24">
        {data.map((e,index:number) =>
          <TouchableOpacity key={index} onPress={() => handleItemClick(index)} className="relative py-[15px] pl-[15px] pr-8 mb-5 border border-main-blue rounded-md">
            <Text style={{fontFamily:'geometria-regular'}} className={`${activeIndex === index ? 'text-main-blue' : 'text-[#101010]'} text-sm leading-[17px]`}>{e.question}</Text>
            <View className={`absolute right-[15px] top-[19px] ${activeIndex === index && 'rotate-180'}`}>
              <DropDown width={10} height={10} color={'#101010'}/>      
            </View>
            <View className={`mt-3 ${activeIndex === index ? 'block' : 'hidden'}`}>
              <Text style={{fontFamily:'geometria-regular'}} className="text-xs leading-[17px]">{e.answer}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      </ScrollView>
    </MainLayout>
  );
};

export default Recomendations;
