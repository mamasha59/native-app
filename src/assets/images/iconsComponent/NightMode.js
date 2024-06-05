import * as React from "react"
import Svg, { Path } from "react-native-svg";

const NightModeButtonSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      d="M512 300.522H0v122.435h77.913V512h356.174v-89.043H512z"
      style={{
        fill: "#57a4ff",
      }}
    />
    <Path
      d="M367.3 33.391V0H178.083v33.391h-33.392v33.392H111.3v33.391l-33.387.003v166.957H111.3v33.388h289.391v-66.783H267.126v-33.391h-33.387v-66.783h33.387v-33.391h133.565V33.391z"
      style={{
        fill: "#ffda44",
      }}
    />
    <Path d="M144.696 33.391h33.391v33.391h-33.391zM111.304 66.783h33.391v33.391h-33.391zM178.087 0h189.217v33.391H178.087zM77.913 100.174h33.391v166.957H77.913zM267.13 66.783v33.391h133.566V33.391h-33.392v33.392zM233.739 100.174h33.391v33.391h-33.391zM233.739 200.348h33.391v33.391h-33.391zM200.348 133.565h33.391v66.783h-33.391z" />
    <Path d="M400.696 300.522v-66.783H267.13v33.391h100.174v33.392H144.696V267.13h-33.392v33.392H0v33.391h512v-33.391z" />
    <Path
      d="M77.913 478.609h356.174V512H77.913zM33.391 389.565h278.261v33.391H33.391zM378.435 389.565h100.174v33.391H378.435z"
      style={{
        fill: "#9bfbff",
      }}
    />
  </Svg>
)
export default NightModeButtonSvg
