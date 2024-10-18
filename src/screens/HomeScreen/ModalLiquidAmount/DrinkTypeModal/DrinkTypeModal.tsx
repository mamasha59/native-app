import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { useTranslation } from "react-i18next";

import { ClosePopup } from "../../../../assets/images/icons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addBadgesJournalScreen, popupLiquidState } from "../../../../store/slices/appStateSlicer";
import { addUrineDiaryRecord } from "../../../../store/slices/journalDataSlice";
import { dateFormat } from "../../../../utils/const";

interface iDrinkTypeModal {
    modalDrinkType: boolean,
    close: () => void,
    liquidValue: string,
    setToastOpened: (value:boolean) => void,
}

const DrinkTypeModal = ({modalDrinkType, close, liquidValue, setToastOpened}:iDrinkTypeModal) => {
    const {t} = useTranslation();

    const dispatch = useAppDispatch();
    const {units} = useAppSelector(state => state.appStateSlice);

    const [selectedDrink, setSelectedDrink] = useState('');

    const drinks = [
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.water')},
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.juice')},
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.soda')},
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.coffee')},
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.tea')},
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.milk')},
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.soup')},
        { titleKey: t('modalFluidIntake.modal_type_of_drink.drinks.alcohol')}
      ];

    const handleSubmitRecord = () => {
        dispatch(addBadgesJournalScreen(1));
        dispatch(addUrineDiaryRecord({
            id: uuidv4(),
            whenWasCatheterization: new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0'),
            amountOfDrankFluids: {
                value: `${liquidValue} ${units.title}`,
                drinkName: selectedDrink
            },
            timeStamp: format(new Date(), dateFormat),
        }));
        close();
        setToastOpened(true);
        dispatch(popupLiquidState(false));
    }

    const handleSelectDrink = (drink:string) => setSelectedDrink(drink);

  return (
    <Modal
        transparent
        visible={modalDrinkType}
        animationType="fade"
    >
        <View className="bg-[#000000a3] flex-1 justify-center px-4">
            <View className="rounded-md p-10 mx-auto justify-center items-center bg-white">
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={close}
                    className="absolute top-4 right-0 p-2 w-8 mx-3 items-center justify-center rounded-full">
                    <ClosePopup width={15} height={15}/>
                </TouchableOpacity>
                <Text style={{fontFamily:'geometria-bold'}} className="text-lg my-3">Тип напитка / Type of Drink</Text>
                <FlatList
                    numColumns={3}
                    columnWrapperStyle={{columnGap: 18}}
                    contentContainerStyle={{alignItems:'center'}}
                    data={drinks}
                    renderItem={({item}) => 
                        <TouchableOpacity
                            onPress={() => handleSelectDrink(item.titleKey)}
                            className={`border-[.2px] p-3 rounded-md mb-2 ${selectedDrink === item.titleKey && 'bg-purple-button'}`}>
                            <Text style={{fontFamily:'geometria-bold'}} className={`${selectedDrink === item.titleKey && 'text-white'}`}>
                                {item.titleKey}
                            </Text>
                        </TouchableOpacity>    
                    }
                    keyExtractor={item => item.titleKey}
                />
                <TouchableOpacity onPress={handleSubmitRecord} className="p-3 my-3 bg-main-blue rounded-md border-[.2px]">
                    <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-main-blue text-white">
                        {t("save")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
  );
};

export default DrinkTypeModal;
