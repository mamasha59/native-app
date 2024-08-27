import { BlurView } from 'expo-blur';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
const {height,width} = Dimensions.get("screen")
const Loader = () => (
  <BlurView intensity={100} className='items-center justify-center w-full h-full'>
    <ActivityIndicator size="large" color="#0000ff" />
    {/* <Text style={{fontFamily:'geometria-regular'}}>loading...</Text> */}
  </BlurView>
);
export default Loader;
