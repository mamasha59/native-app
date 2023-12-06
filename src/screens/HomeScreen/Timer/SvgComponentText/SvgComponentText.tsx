import {Svg, Circle, Text, TextPath, TSpan, G} from 'react-native-svg';
import { useAppSelector } from '../../../../store/hooks';

const strokeWidth = 13;
const r = 140;
const cx = 150;
const cy = 150;

interface iSvgComponentText {
  start: boolean;
  initial: number;
  partTime: {
    firstPartTime: boolean,
    secondPartTime: boolean,
    thirdPartTime: boolean
  }
}

export const SvgComponentText = ({start, initial, partTime}:iSvgComponentText) => {
  const wichСatheter  = useAppSelector((state) => state.user.catheterType); // какой катетер

  return (
  <Svg height="340" width="340" viewBox="0 0 300 300">
  {/* КРУГ С DASHED ПОЛОСКИ */}
    <Circle
      r={r}
      cx={cx}
      cy={cy}
      fill="none"
      stroke="#cec8c8"
      strokeDasharray={[1,7]}
      strokeWidth={strokeWidth}
    />
    {Array(Math.floor(initial)) // 105
    .fill(null)
    .map((_, index) => (
      <Text
        key={index}
        fill={!start ? "#ff0707" : "#ff0505"}
        fontSize="14"
        dy={-36}
        dx={2.8 + index * 6}>
      <TextPath href="#circle" >
          |
      </TextPath>
    </Text>
    ))
    }
  {/* КРУГ С ТЕКСТОМ */}
 {wichСatheter !== 'Фоллея' &&
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
      </G>
      <G fill={partTime.secondPartTime ? "#FFB254" : "#7b7777"}>
          <Text>
            <TextPath href="#circle" startOffset={210}>
              <TSpan fontSize="11" dy={-24}>
                н о р м а л ь н ы й
              </TSpan>
            </TextPath>
          </Text>
          <Text fontSize="22" dy={110} dx={203} translateY={129} translateX={-69}>
            <TextPath href="#circle" >
                |
            </TextPath>
          </Text>
      </G>
      <G fill={partTime.thirdPartTime ? "#ff0404" : "#7b7777"}>
        <Text fontSize="11">
          <TextPath href="#circle" startOffset={420}>
            <TSpan dy={-22}>
              к р и т и ч е с к и й  и н т е р в а л
            </TSpan>
          </TextPath>
        </Text>
        <Text fontSize="22" dy={118} dx={100} translateY={-112} translateX={-67}>
          <TextPath href="#circle" >
              |
          </TextPath>
        </Text>
      </G>
    </G>}
  </Svg>
   )
}