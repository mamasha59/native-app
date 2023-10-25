import { View, TextInput, Text, TouchableOpacity, Modal } from "react-native";
import { Controller } from "react-hook-form";
import { useEffect, useState} from 'react';

import InputError from "../InputError/InputError";
import AnimatedPlaceholder from "../AnimatedPlaceholder/AnimatedPlaceholder";
import { Keyboard } from "../../utils/enums";

interface iInputData{
    control: any;
    inputsValue: any;
    errors?: any;
    placeholder: string; 
    name: string; // имя инпута
    showPrompt?: boolean; // показывать подсказку к инпуту или нет
    textPrompt?: string; // текст подсказки
    isRequired?: boolean;
    canEdite?:boolean;
    maxLength: number;
    inputMode: Keyboard;
}

const InputData = (props:iInputData) => {
    const {control, inputsValue, errors, placeholder, name, showPrompt, textPrompt, canEdite, maxLength, inputMode, isRequired} = props;
    const [prompt, setPrompt] = useState<boolean>(false); // состояние показывать подсказку к инпуту или нет
   
    useEffect(() => { // убирать подсказку через 3 сек после ее показа
        let timerId:number | NodeJS.Timeout;
        if (prompt) {
            timerId = setTimeout(() => {
                setPrompt(false);
            }, 3000);
        }
        return () => clearTimeout(timerId);
    }, [prompt]);

  return (
    <View className="mb-10 w-full border-b border-main-blue pb-[10px] items-center relative">
        <Controller
            control={control}
            rules={{required:isRequired || true}}
            render={({ field: { onChange, value } }) => (                
                <TextInput
                    style={{fontFamily:'geometria-regular'}}
                    inputMode={inputMode}
                    editable={canEdite}
                    placeholder={placeholder}
                    className="text-lg w-full text-center leading-[22px]"
                    onChangeText={onChange}
                    value={value}
                    maxLength={maxLength}
                />
            )}
            name={name}
        />
        {inputsValue && <AnimatedPlaceholder inputValue={inputsValue} placeholder={placeholder}/>}

        {showPrompt &&
        <>
            <TouchableOpacity onPress={() => setPrompt(true)} className="absolute py-2 px-4 right-0 -top-[5px]">
                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-base">?</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={prompt}
                >
                <View className="p-4 bg-[#636e72] mx-1 justify-start">
                    <Text style={{fontFamily:'geometria-regular'}} className="text-[#ffff] text-sm text-center">
                        {textPrompt}
                    </Text>
                </View>
            </Modal>
        </>
        }
        {errors && <InputError errorText="Заполните поле"/>}
    </View>
  );
};

export default InputData;