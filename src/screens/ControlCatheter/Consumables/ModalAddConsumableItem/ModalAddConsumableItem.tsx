import { View, Text, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

import ModalSelect from "../../../../components/ModalSelect/ModalSelect";
import InputData from "../../../../components/InputData/InputData";
import ButtonBluBorder from "../../../../components/ButtonBluBorder/ButtonBluBorder";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { Keyboard } from "../../../../utils/enums";
import { addNewConsumableItem } from "../../../../store/slices/consumablesSlice";

const screen = Dimensions.get('screen');

 interface iModalAddConsumableItem {
    handleModalConsumableItem: () => void,
    modalAddConsumableItem: boolean,
 }

const ModalAddConsumableItem = ({handleModalConsumableItem, modalAddConsumableItem}:iModalAddConsumableItem) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const {consumablesItem} = useAppSelector(state => state.consumablesSlice);

    const { control, handleSubmit, formState: { errors }, reset,  setError, watch } = useForm({
        defaultValues: {
          id: '',
          name: '',
          quantity: ''
        }
      });

    useEffect(() => {
        reset();
    }, [modalAddConsumableItem])
    
    const inputsValue = watch();   
    
  const submitConsumableItem = () => {  
    const findTheSame = consumablesItem.find((item) => item.name.toLowerCase() === inputsValue.name.toLowerCase());
    if(findTheSame) {
        setError("name", {
            message: 'Такой расходник уже добавлен',
            type:'required'
        })
    } else {
    const id = uuidv4();
        dispatch(addNewConsumableItem({
            id: id,
            active: false,
            category: inputsValue.name,
            name: inputsValue.name,
            usagePerProcedure: +inputsValue.quantity,
            quantity: 1,
        }))
        handleModalConsumableItem();
        }
    }

  return (
       <ModalSelect
        openModal={modalAddConsumableItem}
        setOpenModal={handleModalConsumableItem}
        title={`${t("add")} ${t("consumables")}`}
        showIcon={false}
        height={2.2}
        >
            <View className="flex-1 items-center p-4">
                <View style={{width: screen.width / 2}}>
                    <InputData
                        key={"cunsumable-item-title"}
                        control={control}
                        errors={errors.name}
                        inputsValue={inputsValue.name}
                        placeholder={t("title")}
                        name={"name"}
                        inputMode={Keyboard.String}
                        maxLength={40}
                        isRequired
                    />
                </View>
                <View style={{width: screen.width / 2}}>
                    <InputData
                        key={"consumable-item-quantity"}
                        control={control}
                        errors={errors.quantity}
                        inputsValue={inputsValue.quantity}
                        placeholder={t("expense")}
                        name={"quantity"}
                        inputMode={Keyboard.Numeric}
                        maxLength={3}
                        isRequired
                        showPrompt
                        textPrompt={`${t("enter")} ${t("the")} ${t("expense")} ${t("per")} ${t("catheterization")}`}
                    />
                </View>
                {errors.name && <Text style={{ fontFamily: "geometria-regular"}} className="text-base text-error">{errors.name.message}</Text>}
                <View className="flex-1 w-full max-h-[50px]" style={{width: screen.width / 2}}>
                    <ButtonBluBorder title={t("save")} handlePressButton={handleSubmit(submitConsumableItem)}/>
                </View>
            </View>
        </ModalSelect>
  );
};

export default ModalAddConsumableItem;