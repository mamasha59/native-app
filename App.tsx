import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import FeedbackScreen from './screens/FeedbackScreen/FeedbackScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Main' component={Home}/>
      <Stack.Screen name='FeedbackScreen' component={FeedbackScreen}/>
    </Stack.Navigator>
  </NavigationContainer>

  );
}
