import {Svg, Circle, Text, TextPath, TSpan, G} from 'react-native-svg';

const strokeWidth = 13;
const r = 140;
const cx = 150;
const cy = 150;

export const SvgComponentText = () => {

  return (
  <Svg height="100%" width="100%" viewBox="0 0 300 300">
  {/* КРУГ С DASHED ПОЛОСКИ */}
    <G>
    <Circle
      r={r}
      cx={cx}
      cy={cy}
      fill="none"
      stroke="#cec8c8"
      strokeDasharray={[1,7]}
      strokeWidth={strokeWidth}
    />
    </G>
  {/* КРУГ С ТЕКСТОМ */}
      <G id="circle">
        <Circle
          r={100}
          x={150}
          y={150}
          fill="none"
          stroke="#ffffff"
        />

      <Text fill="#7b7777" fontSize="11">
        <TextPath href="#circle" >
          <TSpan dy={-22} >
            о п т и м а л ь н ы й
          </TSpan>
        </TextPath>
      </Text>

      <Text fill="#77787B" fontSize="11">
        <TextPath href="#circle" startOffset={200}>
          <TSpan dy={-24}>
            н о р м а л ь н ы й
          </TSpan>
        </TextPath>
      </Text>

      <Text fill="#77787B" fontSize="11">
        <TextPath href="#circle" startOffset={420}>
          <TSpan dy={-22}>
            к р и т и ч е с к и й  и н т е р в а л
          </TSpan>
        </TextPath>
      </Text>
      </G>

    </Svg>
   )
}