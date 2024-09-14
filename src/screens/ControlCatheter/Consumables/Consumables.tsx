import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { View, Text, Switch, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';

import { consumableItemChangeConsumption, consumableItemSwitch, removeConsumableItem } from "../../../store/slices/consumablesSlice";
import ModalAddConsumableItem from "./ModalAddConsumableItem/ModalAddConsumableItem";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const screen = Dimensions.get('screen');

const Consumables = () => {
  const {consumablesItem} = useAppSelector(state => state.consumablesSlice);
  const dispatch = useAppDispatch();
  
  const [modalAddConsumableItem, setModalAddConsumableItem] = useState<boolean>(false);
  const [limitArray, setLimitArray] = useState<boolean>(false);

  useEffect(() => {
    consumablesItem.length <= 5 ? setLimitArray(false) : setLimitArray(true);
  },[modalAddConsumableItem, consumablesItem.length])

  const switchToggle = (id: string) => {
    dispatch(consumableItemSwitch({id:id}));
  };

  const handleModalConsumableItem = () => {
    if (!limitArray) {
      setModalAddConsumableItem(!modalAddConsumableItem);
    }
  }

  const handleDelete = (id:string) => {
    dispatch(removeConsumableItem({id:id}));
  };

  const handleUsageConsumption = (id:string, value: string) => {
    dispatch(consumableItemChangeConsumption({id:id, value: value}));
  };

  const renderRightActions = (id:string) => {
    return (
      <TouchableOpacity
        className="justify-center items-center w-20 flex-row"
        onPress={() => handleDelete(id)}
      >
        <Text className="text-error">Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
    <View className="flex-1 w-full my-9">
      <Text style={{ fontFamily: "geometria-bold"}} className="text-2xl">Расходники:</Text>
      <Text style={{ fontFamily: "geometria-regular"}} className="text-base my-2">
        Если вы используете дополнительные расходные материалы при катетеризации, вы можете учитывать их расход. Для этого включите необходимое или добавьте новое
      </Text>

      <View className="w-full flex-1 mt-4">
        <View className="flex-1 items-center">
          <Text style={{ fontFamily: "geometria-regular"}} className="text-sm leading-4 max-w-[135px]">
            Количество на одну процедуру
          </Text>
        </View>
        {consumablesItem.map((item) => {
          const content =   
          (<View className="items-center flex-row justify-between w-full mb-1 bg-white">
            <View className="flex-row flex-1 border-b-[.2px] border-main-blue items-center">
              <TouchableOpacity 
                disabled={item.category === 'catheter' && true}
                activeOpacity={0.7}
                onPress={() => switchToggle(item.id)}
                className="mr-[5px] items-center py-4 justify-center">

                <Text
                  style={{ fontFamily: "geometria-regular", width: screen.width / 2.8 }}
                  className="text-base leading-4 text-start capitalize">
                  {item.name}
                </Text>              
              </TouchableOpacity>
              <TextInput
                editable={item.category !== 'catheter' && true}
                value={item.usagePerProcedure+''}
                selectTextOnFocus
                maxLength={2}
                onChangeText={(value) => handleUsageConsumption(item.id, value)}
                style={{fontFamily:'geometria-bold'}}
                keyboardType="numeric"
                className="flex-1 max-w-[50px] py-2 items-center text-center"/>
            </View>
            <Switch
              disabled={item.category === 'catheter' && true}
              trackColor={{ false: "#d1ced3", true: "#81b0ff" }}
              thumbColor={item.active ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#b2abab"
              value={item.active}
              onValueChange={() => switchToggle(item.id)}
              className="border"
            />
          </View>)

          return item.category !== 'catheter' ? (
            <Swipeable
              key={item.id}
              renderRightActions={() => renderRightActions(item.id)}>
              {content}
            </Swipeable>
          ) : (
            <View key={item.id}>
              {content}
            </View>
          );
          })
        }
        
        {!limitArray && 
        <View className="items-center w-full mt-3">
          <TouchableOpacity onPress={handleModalConsumableItem} accessibilityLabel="add consumable item">
            <LottieView
              autoPlay
              style={{
                width: 56,
                height: 56,
              }}
              source={require('../../../assets/plus-mark.json')}
            />
          </TouchableOpacity>
        </View>}
      </View>
    </View>
    <ModalAddConsumableItem
      key={'modal-add-consumable-item'}
      handleModalConsumableItem={handleModalConsumableItem}
      modalAddConsumableItem={modalAddConsumableItem}/>
    </>
  );
};

export default Consumables;