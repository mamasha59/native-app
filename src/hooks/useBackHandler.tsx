import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const useBackHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleBackPress = () => {
      navigation.goBack();
      return true; // prevent standard behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => backHandler.remove();
  }, [navigation]);
};

export default useBackHandler;