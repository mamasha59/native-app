import { View, Text, ActivityIndicator, Animated } from "react-native";
import { useEffect, useRef } from "react";

import { useAppSelector } from "../../../../store/hooks";

const UserInfo = () => {
  const userData = useAppSelector(user => user.user);

  const tiles = useRef([0, 0, 0, 0, 0].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    tiles.forEach(tile => tile.setValue(0));
  
    Animated.stagger(200, tiles.map(tile => Animated.timing(tile, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }))).start();
  }, []);
  
  
  return (
    <View className="flex-row flex-wrap gap-[10px] mb-5 justify-center">
      <Animated.View
          style={{opacity: tiles[0].interpolate({inputRange: [0, 1],outputRange: [0, 1],}),}}
          className="border border-border-color rounded-xl p-[15px] max-w-[145px] w-full">
        <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg leading-[21px] mb-[10px]">
          {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                    : userData.sex || "Заполните профиль"}
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs leading-[14px]">пол</Text>
      </Animated.View>

      <Animated.View
          style={{opacity: tiles[1].interpolate({inputRange: [0, 1],outputRange: [0, 1],}),}}
          className="border border-border-color rounded-xl p-[15px] max-w-[145px] w-full">
        <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg leading-[21px] mb-[10px]">
        {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                  : userData.age || "Заполните профиль"}
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs leading-[14px]">возраст</Text>
      </Animated.View>

      <Animated.View
          style={{opacity: tiles[2].interpolate({inputRange: [0, 1],outputRange: [0, 1],}),}}
          className="border border-border-color rounded-xl p-[15px] max-w-[145px] w-full">
        <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg leading-[21px] mb-[10px]">
        {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                  : userData.volume + ' мл.' || "Заполните профиль"}
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs leading-[14px]">объем мочевого пузыря</Text>
      </Animated.View>

      <Animated.View
          style={{opacity: tiles[3].interpolate({inputRange: [0, 1],outputRange: [0, 1],}),}}
          className="border border-border-color rounded-xl p-[15px] max-w-[145px] w-full">
        <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg leading-[21px] mb-[10px]">
        {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                  : userData.catheterType || "Заполните профиль"}
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs leading-[14px]">тип катетера</Text>
      </Animated.View>

      <Animated.View
          style={{opacity: tiles[4].interpolate({inputRange: [0, 1],outputRange: [0, 1],}),}}
          className="border border-border-color rounded-xl p-[15px] max-w-[145px] w-full">
        <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-lg leading-[21px] mb-[10px]">
        {!userData ? <ActivityIndicator size="small" color="#4BAAC5" />
                  : userData.catheterSize + " Ch/Fr" || "Заполните профиль"}
        </Text>
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-xs leading-[14px]">размер катетера</Text>
      </Animated.View>
  </View>
  );
};

export default UserInfo;
