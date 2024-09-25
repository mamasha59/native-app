import { LinearGradient } from "expo-linear-gradient";

interface iBackgroundGradientConsumableItems {
    children: React.ReactNode;
}

const BackgroundGradientConsumableItems = ({children}:iBackgroundGradientConsumableItems) => {
  return (
    <LinearGradient
        colors={['#e0e8e8', '#eadfdf']}
        start={[-0.5, 1]}
        end={[3, 0.9]}
        className="px-3 py-2"
  >
    {children}
  </LinearGradient>
  );
};

export default BackgroundGradientConsumableItems;
