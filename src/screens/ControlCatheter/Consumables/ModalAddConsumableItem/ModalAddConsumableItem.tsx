import { View, Text, Dimensions } from "react-native";
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
        title="Добавить расходник"
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
                        placeholder={'название'}
                        name={"name"}
                        inputMode={Keyboard.String}
                        maxLength={40}
                        isRequired
                    />
                </View>
                <View style={{width: screen.width / 2}}>
                    <InputData
                        key={"cunsumable-item-quantity"}
                        control={control}
                        errors={errors.quantity}
                        inputsValue={inputsValue.quantity}
                        placeholder={'расход'}
                        name={"quantity"}
                        inputMode={Keyboard.Numeric}
                        maxLength={4}
                        isRequired
                        showPrompt
                        textPrompt="Введите расход за одну катетеризацию"
                    />
                </View>
                {errors.name && <Text style={{ fontFamily: "geometria-regular"}} className="text-base text-error">{errors.name.message}</Text>}
                <View className="flex-1 w-full max-h-[50px]" style={{width: screen.width / 2}}>
                    <ButtonBluBorder title={'подтвердить'} handlePressButton={handleSubmit(submitConsumableItem)}/>
                </View>
            </View>
        </ModalSelect>
  );
};

export default ModalAddConsumableItem;
