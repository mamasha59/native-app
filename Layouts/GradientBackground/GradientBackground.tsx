import { LinearGradient } from "expo-linear-gradient";

interface iGradientBackground {
    children: React.ReactNode;
}

const GradientBackground = ({children}:iGradientBackground) => {
  return (
  <LinearGradient
      colors={['#4BAAC5', '#7076B0']}
      start={[0.001, 0.495]}
      end={[1, 0.505]}
      style={{ flex: 1, height:100 }}
      >
    {children}
  </LinearGradient>
  );
};

export default GradientBackground;
