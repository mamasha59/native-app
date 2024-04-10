import { useEffect, useState } from 'react';
import {Svg, Circle, Text, TextPath, TSpan, G, Path} from 'react-native-svg';
import { useAppSelector } from '../../../../store/hooks';

interface iSvgComponentText {
  start: boolean,
  initialNumberOfStrip: number,
  partTime: {
    firstPartTime?: boolean | undefined,
    secondPartTime?: boolean | undefined,
    thirdPartTime?: boolean | undefined
  },
  activeOptimalInterval: boolean,
  activeNormalInterval: boolean,
}

export const SvgComponentText = ({start, initialNumberOfStrip, partTime, activeOptimalInterval}:iSvgComponentText) => {
  const interval = useAppSelector(state => state.user.interval); // интервал выбранный пользователем

  const [currentColor, setCurrentColor] = useState('#4BAAC5'); // начальное значение цвета

  useEffect(() => { // изменяем цвет внешнего круга, пунтирные линии
    if(partTime.firstPartTime && !partTime.secondPartTime){
      setCurrentColor('#4BAAC5');
      
    } else if(partTime.secondPartTime && !partTime.thirdPartTime) {
      setCurrentColor('#FFB254');

    } else if(partTime.thirdPartTime && !activeOptimalInterval) {
      setCurrentColor('#EA3737');
    }
  },[start,partTime]);

  return (
  <Svg height="340" width="340" viewBox="0 0 300 300" rotation={-90}>
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
      <G fill={partTime.firstPartTime ? "#048eff" : "#7b7777"}>
        <Text fontSize="11">
          <TextPath href="#circle" >
            <TSpan dy={-22} >
              о п т и м а л ь н ы й
            </TSpan>
          </TextPath>
        </Text>
        <Text fontSize="22"dy={-32} dx={-2.3}>
          <TextPath href="#circle" >
              |
          </TextPath>
        </Text>
        {partTime.firstPartTime && <Path d={"M 260 151 A 109 110 0 0 1 100 245"} fill="none" stroke="#048eff" strokeWidth="4" />}
      </G>
      <G fill={partTime.secondPartTime ? "#FFB254" : "#7b7777"}>
        <Text>
          <TextPath href="#circle" startOffset={210}>
            <TSpan fontSize="11" dy={-24}>
              н о р м а л ь н ы й
            </TSpan>
          </TextPath>
        </Text>
        <Text fontSize="22" dy={111} dx={209} translateY={128} translateX={-73}>
          <TextPath href="#circle" >
              |
          </TextPath>
        </Text>
        {partTime.secondPartTime && <Path d={"M 96 54 A 115 110 0 0 0 100 245"} fill="none" stroke="#FFB254" strokeWidth="4"/>}
      </G>
      <G fill={partTime.thirdPartTime ? "#ff0404" : "#7b7777"}>
        <Text fontSize="11">
          <TextPath href="#circle" startOffset={420}>
            <TSpan dy={-22}>
              к р и т и ч е с к и й  и н т е р в а л
            </TSpan>
          </TextPath>
        </Text>
        <Text fontSize="22" dy={118} dx={100} translateY={-113} translateX={-65}>
          <TextPath href="#circle" >
              |
          </TextPath>
        </Text>
        {partTime.thirdPartTime && <Path d={"M 96 54 A 109 110 0 0 1 260 151"} fill="none" stroke="red" strokeWidth="4" />}
      </G>
    </G>
  </Svg>
   )
}