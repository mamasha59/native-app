import { View, Text } from "react-native";
import React from "react";
import MainLayout from "../../../components/MainLayout/MainLayout";

const Recomendations = ({route}) => {
  const routeName = route.name;
  return (
    <MainLayout routeName={routeName}>
        <View>
            <Text>Recomendations</Text>
        </View> 
    </MainLayout>

  );
};

export default Recomendations;
