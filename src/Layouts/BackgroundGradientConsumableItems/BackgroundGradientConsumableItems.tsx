import { LinearGradient } from "expo-linear-gradient";

interface iBackgroundGradientConsumableItems {
    children: React.ReactNode;
}

const BackgroundGradientConsumableItems = ({children}:iBackgroundGradientConsumableItems) => {
  return (
    <LinearGradient
        colors={['#ffffff', '#eae5e5']}
        start={[-0.5, 1]}
        end={[3, 0.9]}
        className="px-3 py-2 rounded-md"
  >
    {children}
  </LinearGradient>
  );
};

export default BackgroundGradientConsumableItems;
