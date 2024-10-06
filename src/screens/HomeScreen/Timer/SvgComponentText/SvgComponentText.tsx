import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, useWindowDimensions } from 'react-native';
import {Svg, Circle, Text, TextPath, TSpan, G, Path} from 'react-native-svg';

interface iSvgComponentText {
  start: boolean,
  initialNumberOfStrip: number,
  partTime: {
    firstPartTime?: boolean | undefined,
    secondPartTime?: boolean | undefined,
    thirdPartTime?: boolean | undefined
  },
}

const greyDark = '#7b7777';
const blue = '#4BAAC5';
const red = "#EA3737";

export const SvgComponentText = ({start, initialNumberOfStrip, partTime}:iSvgComponentText) => {
  
  const {t} = useTranslation();
  const [currentColor, setCurrentColor] = useState(blue); // начальное значение цвета
  const {width} = useWindowDimensions();

  useEffect(() => { // изменяем цвет внешнего круга, пунктирные линии
    if(start && partTime.firstPartTime && !partTime.thirdPartTime && !partTime.secondPartTime){
      setCurrentColor(blue);
      
    } else if(partTime.secondPartTime && start) {
      setCurrentColor('#FFB254');

    } else if(partTime.thirdPartTime) {
      setCurrentColor('#EA3737');
    }
  },[start,partTime]);
  
  return (
  <Svg height={width / 1.2} width={width / 1.2} viewBox="0 0 300 300" rotation={-90}>
  {/* КРУГ С DASHED ПОЛОСКИ */}
    {
      Array(Math.floor(105)) // 105 серых полосок
      .fill(null)
      .map((_, index) => (
        <Text
          key={index}
          fill={'#cec8c8'}
          fontSize="17"
          dy={-36}
          dx={2.6 + index * 6}>
        <TextPath href="#circle" >
            |
        </TextPath>
      </Text>
      ))
    } 
    {
      Array(Math.floor(initialNumberOfStrip)) // 105 полосок, которые красятся по времени и цвет зависит от интервала 
      .fill(null)
      .map((_, index) => (
        <Text
          key={index}
          fill={currentColor}
          fontSize="17"
          dy={-36}
          dx={2.6 + index * 6}>
        <TextPath href="#circle" >
            |
        </TextPath>
      </Text>
      ))
    }
  {/* КРУГ С ТЕКСТОМ */}
    <G id="circle">
      <Circle
        r={100}
        x={150}
        y={150}
        fill="none"
        stroke="#ffffff"
    />
      <G fill={partTime.firstPartTime ? blue : greyDark}>
        <Text fontSize="12">
          <TextPath href="#circle" startOffset={4}>
            <TSpan dy={-22} > 
              {t("timer.intervals.normal")}
            </TSpan>
          </TextPath>
        </Text>
        <Text fill={partTime.thirdPartTime ? red : blue} fontSize="22"dy={-32} dx={-2.3}>
          <TextPath href="#circle" >
            |
          </TextPath>
        </Text>
        {/* {partTime.firstPartTime && <Path d={"M 260 151 A 109 110 0 0 1 100 245"} fill="none" stroke={`${partTime.thirdPartTime ? blue : blue}`} strokeWidth="4" />} */}
      </G>
      <G fill={partTime.secondPartTime ? "#FFB254" : partTime.thirdPartTime ? red :"#7b7777"}>
        <Text fontSize="22" dy={111} dx={209} translateY={128} translateX={-73}>
          <TextPath href="#circle" >
            |
          </TextPath>
        </Text>
        {/* {partTime.secondPartTime 
          && <Path d={"M 96 54 A 115 110 0 0 0 100 245"} fill="none" stroke={`${partTime.thirdPartTime ? '#FFB254' : '#FFB254'}`} strokeWidth="4"/>} */}
      </G>
      <G fill={partTime.thirdPartTime ? red : greyDark}>
        <Text fontSize="12">
          <TextPath href="#circle" startOffset={424}>
            <TSpan dy={-22}>
              {t("timer.intervals.critical")}
            </TSpan>
          </TextPath>
        </Text>
        <Text fontSize="22" dy={118} dx={100} translateY={-113} translateX={-65}>
          <TextPath href="#circle" >
            |
          </TextPath>
        </Text>
        {/* {partTime.thirdPartTime && <Path d={"M 96 54 A 109 110 0 0 1 260 151"} fill="none" stroke="red" strokeWidth="4" />} */}
      </G>
    </G>
  </Svg>
   )
}