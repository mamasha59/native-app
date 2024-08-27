import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Dispatch, useEffect, useState } from "react";
import i18next from "i18next";

interface iFilterCategories {
    setFilterSetting: Dispatch<React.SetStateAction<string>>;
}

interface arrayOfFilters {
    id: string;
    title: string;
    keyWord: string;
}

const FilterCategories = ({setFilterSetting}:iFilterCategories) => {

    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [filters, setFilters] = useState<arrayOfFilters[]>([]);

    const handlePressFilter = (keyWord:string) => {
        setSelectedItem(keyWord === selectedItem ? null : keyWord);
        setFilterSetting((prev) => keyWord);
    }

    useEffect(() => {
        const updateFilters = () => {
            const translatedFilters = [
                {
                    id: 'all',
                    title: i18next.t("journalScreen.filters.all"),
                    keyWord: 'timeStamp'
                },
                {
                    id: 'catheterization',
                    title: i18next.t("journalScreen.filters.catheterizations"),
                    keyWord: i18next.t("nelaton")
                },
                {
                    id: 'urine_output',
                    title: i18next.t("journalScreen.filters.urine_output"),
                    keyWord: 'amountOfReleasedUrine'
                },
                {
                    id: 'fluid_intake',
                    title: i18next.t("journalScreen.filters.fluid_intake"),
                    keyWord: 'amountOfDrankFluids'
                },
                {
                    id: 'urine_leakage',
                    title: i18next.t("journalScreen.filters.urine_leakage"),
                    keyWord: 'leakageReason'
                },
            ];
            setFilters(translatedFilters);
        };

        updateFilters(); // first render to see filters

    }, [i18next.language]);

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
