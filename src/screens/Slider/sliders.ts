import { ImageSourcePropType } from "react-native";

export interface iSliderItem {
    id: string;
    image: ImageSourcePropType;
    description: string;
  }
  

export default [
    {
        id: '1',
        image: require('../../assets/images/slider/slide1.png'),
        description: 'Уведомления и удобный отчет'
    },
    {
        id: '2',
        image: require('../../assets/images/slider/slide2.png'),
        description: 'Контроль расхода катетеров'
    },
    {
        id: '3',
        image: require('../../assets/images/slider/slide3.png'),
        description: 'Расчет интервалов катеризации'
    }
]