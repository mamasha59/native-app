import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Controller } from "react-hook-form";
import { useRef } from "react";

interface iInputChangeProfile {
    inputData: string | null,
    control: any,
    name: string,
    prefix: string,
    placeholder: string,
}

const InputChangeProfile = ({inputData, control, name, prefix, placeholder}:iInputChangeProfile) => {
    const inputRef = useRef<TextInput>(null);
    const dataLength = inputData?.toString().length;
    
    const focusInput = () =>  inputRef.current && inputRef.current.focus();

  return (
    <TouchableOpacity onPress={focusInput} activeOpacity={.6} className="py-[15px] px-5 mb-[10px] w-full border border-main-blue rounded-[10px] relative">
        <View className="flex-row items-center">
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (                
                    <TextInput
                        style={{fontFamily:'geometria-bold'}}
                        inputMode={'numeric'}
                        className={`text-sm text-main-blue ${dataLength && dataLength >= 3 ? 'w-7' : 'w-5'}`}
                        onChangeText={ text => { if (/^\d*$/.test(text)) onChange(text) }}
                        placeholder={inputData?.toString()}
                        value={value?.toString()}
                        maxLength={3}
                        ref={inputRef}
                    />
                )}
                name={name}/>
                    <Text style={{fontFamily:'geometria-bold'}} className="text-sm text-main-blue">{prefix}</Text>
            </View>
        <Text style={{fontFamily:'geometria-regular'}} className="text-[10px] leading-3 mt-[5px] text-grey">
            {placeholder}
        </Text>
    </TouchableOpacity>
  );
};

export default InputChangeProfile;
