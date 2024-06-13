import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { RefObject, useEffect, useRef, useState } from "react";

import Pencil from "../../assets/images/iconsComponent/Pencil";
import { addCatheter } from "../../store/slices/journalDataSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDaysInAdvanceWhenShowNoticeOfRemainCaths } from "../../store/slices/noticeSettingsSlice";

const NoticesOfRemainCaths = () => {
    const dispatch = useAppDispatch();
    const settingsOfNotice = useAppSelector(state => state.noticeSettingsSlice);
    const settings = useAppSelector(state => state.journal.initialCathetherAmount);

    const [caths, setCaths] = useState<string>('');
    const [whenShowNoticeOfCathsRemain, setWhenShowNoticeOfCathsRemain] = useState<string>(''+settingsOfNotice.daysInAdvanceWhenShowNoticeOfRemainCaths);

    const inputRefNoticeOfCathsRemain = useRef<TextInput>(null);
    const inputRefaddCatheters = useRef<TextInput>(null);

    useEffect(() => {
        setCaths(String(settings.nelaton));
    },[settings])
   
    const focusInput = (inputRef: RefObject<TextInput>) => {
        if (inputRef.current) {
            inputRef.current.blur(); // Сначала снимаем фокус
            setTimeout(() => {
                inputRef.current && inputRef.current.focus(); // Затем устанавливаем фокус
            }, 100); // Немного задержки для корректной работы
        }
    };

    const focusInputNoticeOfCathsRemain = () => focusInput(inputRefNoticeOfCathsRemain);
    const focusInputAddCatheters = () => focusInput(inputRefaddCatheters);

    const handleInputOnChange = (value:string) => {
        if(+value <= 0){
            setCaths('');
        }else{
            setCaths(value);
        }
    }
    
    const handleInputNoticeOfCathsRemain = (value:string) => {
        if(+value <= 0){
            setWhenShowNoticeOfCathsRemain('');
        }else{
            setWhenShowNoticeOfCathsRemain(value);
        }
    }

    const addCatheters = () => {
        dispatch(addCatheter({amount: +caths}));        
    }

    const submitDaysWhenShowNoticeOfCathsRemain = () => {
        dispatch(setDaysInAdvanceWhenShowNoticeOfRemainCaths(+whenShowNoticeOfCathsRemain))
    }

  return (
    <View className="mt-6">
        <Text style={{fontFamily:'geometria-bold'}}>Уведомления об остатке катеторов:</Text>

        <TouchableOpacity onPress={focusInputNoticeOfCathsRemain} className="mt-2 py-2 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>При остатке менее чем:</Text>
            <View className="flex-row items-center">
                <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>на</Text>
                <TextInput
                    ref={inputRefNoticeOfCathsRemain}
                    value={whenShowNoticeOfCathsRemain}
                    onEndEditing={submitDaysWhenShowNoticeOfCathsRemain}
                    onChangeText={(e) => handleInputNoticeOfCathsRemain(e)}
                    style={{fontFamily:'geometria-bold'}}
                    keyboardType="numeric"
                    maxLength={1}
                    className="text-[17px] border-b max-w-[40px] flex-1 text-center"/>
                <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>дней</Text>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={focusInputAddCatheters} className="mt-2 py-3 flex-row justify-between items-center border-b border-[#bdc3c75e]">
            <Text className="text-[17px]" style={{fontFamily:'geometria-regular'}}>Сколько катеторов у вас есть?:</Text>
            <View className="flex-row items-center">
                <TextInput
                    ref={inputRefaddCatheters}
                    value={caths}
                    onEndEditing={addCatheters}
                    onChangeText={(e) => handleInputOnChange(e)}
                    style={{fontFamily:'geometria-bold'}}
                    keyboardType="numeric"
                    maxLength={3}
                    className="text-[17px] border-b max-w-[40px] flex-1 text-center"/>
                <Text className="text-[17px]" style={{fontFamily:'geometria-bold'}}>шт</Text>
                <View className="w-[20px] h-[20px] items-center justify-center">
                    <Pencil/>
                </View>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default NoticesOfRemainCaths;
