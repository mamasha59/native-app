import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import {Svg, Circle, Text, TextPath, TSpan, G} from 'react-native-svg';

import { useAppSelector } from '../../../../store/hooks';
import { partTimeColors } from '../../../../utils/const';

interface iSvgComponentText {
  start: boolean,
  initialNumberOfStrip: number,
}

export const SvgComponentText = ({start, initialNumberOfStrip}:iSvgComponentText) => {
  
  const {t} = useTranslation();

  const {partTime} = useAppSelector(state => state.timerStates);

  const [currentColor, setCurrentColor] = useState(partTimeColors.blue); // начальное значение цвета
  const {width} = useWindowDimensions();

  useEffect(() => { // изменяем цвет внешнего круга, пунктирные линии
    if(start && partTime.firstPartTime && !partTime.secondPartTime){
      setCurrentColor(partTimeColors.blue);
      
    } else if(partTime.secondPartTime) {
      setCurrentColor(partTimeColors.yellow);

    } else if(partTime.thirdPartTime) {
      setCurrentColor(partTimeColors.red);
    }
  },[start, partTime]);
  
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
      <G fill={partTime.firstPartTime || partTime.secondPartTime ? partTimeColors.blue : partTimeColors.greyDark}>
        <Text fontSize="12">
          <TextPath href="#circle" startOffset={4}>
            <TSpan dy={-22} > 
              {t("timer.intervals.normal")}
            </TSpan>
          </TextPath>
        </Text>
        <Text fill={partTime.thirdPartTime ? partTimeColors.red : partTimeColors.blue} fontSize="22"dy={-32} dx={-2.3}>
          <TextPath href="#circle" >
            |
          </TextPath>
        </Text>
      </G>
      <G fill={partTime.secondPartTime ? "#FFB254" : partTime.thirdPartTime ? partTimeColors.red :"#7b7777"}>
        <Text fontSize="22" dy={111} dx={209} translateY={128} translateX={-73}>
          <TextPath href="#circle" >
            |
          </TextPath>
        </Text>
      </G>
      <G fill={partTime.thirdPartTime ? partTimeColors.red : partTimeColors.greyDark}>
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
      </G>
    </G>
  </Svg>
   )
}