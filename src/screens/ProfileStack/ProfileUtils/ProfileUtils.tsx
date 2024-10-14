import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as Notifications from 'expo-notifications';
import { useState } from "react";

import { persistor } from "../../../store/store";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";

const ProfileUtils = () => {
    const [modalPolicies, setModalPolicies] = useState<boolean>(false);

    const handleModalPolicies = () => setModalPolicies(!modalPolicies);

    const removeProfile = async () => {
      try {
        await Notifications.cancelAllScheduledNotificationsAsync()
        await Notifications.dismissAllNotificationsAsync();
        await persistor.purge();
      } catch (error) {
        console.error(error)
      }finally{
        Alert.alert('Профиль удалён', 'Пожалуйста, закройте и откройте приложение снова для применения изменений.');
      }
    }

  return (
    <View className="my-2">
      <View className="py-2">
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-base">Version 1.0.0</Text>
      </View>
      <TouchableOpacity onPress={handleModalPolicies} className="py-2">
        <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-base">Политика</Text>
      </TouchableOpacity>
      <TouchableOpacity onLongPress={removeProfile} className="py-4 mt-1">
        <Text style={{fontFamily:'geometria-bold'}} className="text-error">Сбросить профиль - (long press)</Text>
      </TouchableOpacity>
      <ModalSelect
        key={'modalpolicies'}
        openModal={modalPolicies}
        setOpenModal={handleModalPolicies}
        showIcon={false}
        title="Policies"
      >
        <TouchableOpacity className="py-2">
            <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-base">Тут политики</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-2">
            <Text style={{fontFamily:'geometria-regular'}} className="text-grey text-base">Условия использования</Text>
        </TouchableOpacity>
      </ModalSelect>
    </View>
  );
};

export default ProfileUtils;
