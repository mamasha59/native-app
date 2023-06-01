import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoadScreen = () => {
  return (
    <SafeAreaView className='p-11 bg-blue-200 h-full'>
        <View className="flex-1 items-center justify-center">
            <Text className='text-[#FFFFFF] text-[40px] leading-[48px] mb-10'>UroControl</Text>
            <Image className='w-[150px] h-auto' source={require('../../imgs/logo2.png')} />
            <StatusBar style="auto" />  
        </View>
    </SafeAreaView>
  );
};

export default LoadScreen;
