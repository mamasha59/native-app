import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { iUser } from "../Types";

const useGetLocalStorage = () => {

  const [exist, setExist] = useState(false); // если юзер уже ввел данные раньше, то перенаправляет сразу на главный экран приложения
  const [userData, setUserData] = useState<iUser>();

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('my-key');
        if(jsonValue){
          setExist(true);
        } 
        return jsonValue != null ? setUserData(JSON.parse(jsonValue)) : null;
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  },[])

  return {exist, userData};
};

export default useGetLocalStorage;
