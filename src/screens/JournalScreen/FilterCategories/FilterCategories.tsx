import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { Dispatch, useState } from "react";
import { filters } from "../../../utils/const";

interface iFilterCategories {
    setFilterSetting: Dispatch<React.SetStateAction<string>>;
}

const FilterCategories = ({setFilterSetting}:iFilterCategories) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(filters[0].keyWord);

    const handlePressFilter = (keyWord:string) => {
        setSelectedItem(keyWord === selectedItem ? null : keyWord);
        setFilterSetting((prev) => keyWord);
    }

  return (
    <View className="mb-2">
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filters}
            renderItem={({item}) => 
            <TouchableOpacity
                onPress={() => handlePressFilter(item.keyWord)}
                className={`border-main-blue border mr-2 rounded-md text-center px-1 ${selectedItem === item.keyWord ? 'bg-main-blue' : 'bg-[#fff]'}`}>
                <Text
                    style={{fontFamily:'geometria-regular'}}
                    className={`text-base tracking-tighter ${selectedItem === item.keyWord ? 'text-[#fff]' : 'text-[#000]'}`}>
                        {item.title}
                </Text>
            </TouchableOpacity>}
            keyExtractor={item => item.id}
        />
    </View>
  );
};

export default FilterCategories;
