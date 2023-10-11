import { View, TextInput, Text, TouchableOpacity, Modal } from "react-native";
import { Controller } from "react-hook-form";
import { useEffect, useState} from 'react';

import InputError from "../InputError/InputError";

interface iInputData{
    control: any;
    inputsValue: any;
    errors: any;
    placeholder: string; 
    name: string; // имя инпута
    showPrompt?: boolean; // показывать подсказку к инпуту или нет
    textPrompt?: string; // текст подсказки
}

const InputData = ({control, inputsValue, errors, placeholder, name, showPrompt, textPrompt}:iInputData) => {
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
            rules={{required:true, maxLength:3}}
            render={({ field: { onChange, value } }) => (
                <TextInput
                    style={{fontFamily:'geometria-regular'}}
                    inputMode="numeric"
                    placeholder={placeholder}
                    className="text-lg w-full text-center leading-[22px]"
                    onChangeText={onChange}
                    value={value}
                    maxLength={3}
                />
            )}
            name={name}
        />
        {inputsValue &&
            <Text style={{fontFamily:'geometria-regular',}} className="text-xs absolute left-0 -top-5 opacity-60">
                {placeholder}
            </Text>
        }

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
 // TODO анимацию текста