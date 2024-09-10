import { View, Text, TouchableOpacity, Switch } from "react-native";
import React, { useState } from "react";
import ModalSelect from "../../../components/ModalSelect/ModalSelect";

const ManageSupply = () => {
    const [modalManageSupply, setModalManageSupply] = useState<boolean>(false);
    const [toggleSmazka, setToggleSmazka] = useState<boolean>(false);

    const handleModalManageSupply = () => setModalManageSupply(!modalManageSupply);
    const switchToggleSmazka = () => setToggleSmazka(!toggleSmazka);

  return (
    <>
    <TouchableOpacity
        onPress={handleModalManageSupply}
        className="py-4 mt-2 border-b border-main-blue">
        <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-sm uppercase">
        управлять расходниками
        </Text>
    </TouchableOpacity>

    <ModalSelect
        key={'modalmanagesupply'}
        openModal={modalManageSupply}
        setOpenModal={handleModalManageSupply}
        showIcon={false}
        title="Manage supply"
        >
         <View className="items-center flex-row justify-between w-full">
            <TouchableOpacity
                activeOpacity={.7}
                onPress={switchToggleSmazka}
                className="mr-[5px] items-center p-3 justify-center">
                <Text style={{fontFamily:'geometria-regular'}} className="text-lg text-center capitalize">
                    смазка
                </Text>
            </TouchableOpacity>
            <Switch
                trackColor={{false: '#d1ced3', true: '#81b0ff'}}
                thumbColor={toggleSmazka ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#b2abab"
                value={toggleSmazka}
                onValueChange={switchToggleSmazka}
                className="h-5 border w-9"
            />
        </View>
         <View className="items-center flex-row justify-between w-full">
            <TouchableOpacity
                activeOpacity={.7}
                onPress={switchToggleSmazka}
                className="mr-[5px] items-center p-3 justify-center">
                <Text style={{fontFamily:'geometria-regular'}} className="text-lg text-center capitalize">
                    смазка
                </Text>
            </TouchableOpacity>
            <Switch
                trackColor={{false: '#d1ced3', true: '#81b0ff'}}
                thumbColor={toggleSmazka ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#b2abab"
                value={toggleSmazka}
                onValueChange={switchToggleSmazka}
                className="h-5 border w-9"
            />
        </View>
         <View className="items-center flex-row justify-between w-full">
            <TouchableOpacity
                activeOpacity={.7}
                onPress={switchToggleSmazka}
                className="mr-[5px] items-center p-3 justify-center">
                <Text style={{fontFamily:'geometria-regular'}} className="text-lg text-center capitalize">
                    смазка
                </Text>
            </TouchableOpacity>
            <Switch
                trackColor={{false: '#d1ced3', true: '#81b0ff'}}
                thumbColor={toggleSmazka ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#b2abab"
                value={toggleSmazka}
                onValueChange={switchToggleSmazka}
                className="h-5 border w-9"
            />
        </View>
         <View className="items-center flex-row justify-between w-full">
            <TouchableOpacity
                activeOpacity={.7}
                onPress={switchToggleSmazka}
                className="mr-[5px] items-center p-3 justify-center">
                <Text style={{fontFamily:'geometria-regular'}} className="text-lg text-center capitalize">
                    смазка
                </Text>
            </TouchableOpacity>
            <Switch
                trackColor={{false: '#d1ced3', true: '#81b0ff'}}
                thumbColor={toggleSmazka ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#b2abab"
                value={toggleSmazka}
                onValueChange={switchToggleSmazka}
                className="h-5 border w-9"
            />
        </View>
    </ModalSelect>
    </>
  );
};

export default ManageSupply;
