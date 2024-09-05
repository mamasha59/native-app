import { View, TextInput, Text, TouchableOpacity, Modal } from "react-native";
import { Controller } from "react-hook-form";
import { useEffect, useState} from 'react';
import { useTranslation } from "react-i18next";

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
    multiline?: boolean,
    marginBottom?: number,
    showErrorText?: boolean,
}

const InputData = (props:iInputData) => {
    const {t} = useTranslation();
    const {
            control,
            inputsValue,
            errors,
            placeholder,
            name,
            showPrompt,
            textPrompt,
            canEdite,
            maxLength,
            inputMode,
            isRequired,
            multiline,
            marginBottom = 40,
            showErrorText = false,
        } = props;
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
    <View
        style={{marginBottom: marginBottom}}
        className={`w-full border-b border-main-blue pb-[10px] items-center relative ${errors && showErrorText && 'border-b border-error'}`}>
        <Controller
            control={control}
            rules={{required:isRequired || false}}
            render={({ field }) => (                
                <TextInput
                    multiline={multiline}
                    style={{fontFamily:'geometria-regular'}}
                    inputMode={inputMode}
                    editable={canEdite}
                    placeholder={placeholder}
                    className="text-lg w-full text-center leading-[22px]"
                    onChangeText={(text) => field.onChange(text)} 
                    value={field.value}
                    maxLength={maxLength}
                    selectTextOnFocus
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
        {errors && !showErrorText &&
            <Text style={{fontFamily:'geometria-regular'}} className="text-error absolute -bottom-5">
                {t("fill_in_the_field")}
            </Text>
        }
    </View>
  );
};

export default InputData;