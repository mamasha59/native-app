import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useForm } from "react-hook-form";
import { useState } from "react";

import ModalSelect from "../../ModalSelect/ModalSelect";
import NotificationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/NotificationIcon";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import InputData from "../../InputData/InputData";
import { Keyboard } from "../../../utils/enums";
import ButtonBluBorder from "../../ButtonBluBorder/ButtonBluBorder";
import { setTimeOfNoticeAtNightOneTime } from "../../../store/slices/nightStateSlice";

interface iModalOneNoticeAtNight {
    modalOnceAtNight: boolean,
    handleModalOnceAtNight: () => void,
}

const ModalOneNoticeAtNight = ({modalOnceAtNight,handleModalOnceAtNight}:iModalOneNoticeAtNight) => {
    const settingsNighMode = useAppSelector((state) => state.nightOnBoarding); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const dispatch = useAppDispatch();

    const [showChangeTimeBlock, setShowChangeTimeBlock] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors }, setValue, watch, getValues } = useForm({
        defaultValues: {
            hours: '',
            minutes: '',
        }
    });  
    
    const inputsValue = watch();

    const handlePressChangeTime = () => { // show change time block
        setShowChangeTimeBlock(!showChangeTimeBlock);
    }

    const handleAppearModal = () => {
        handleModalOnceAtNight(); // show or close modal
        handlePressChangeTime() // hide change time block
    }

    const handleSaveNewTime = () => { // press save
        setValue('hours', +inputsValue.hours >= +settingsNighMode.timeSleepEnd.split(':')[0] || +inputsValue.hours === 0 ? (Math.round(Math.floor(+settingsNighMode.timeSleepEnd.split(':')[0] / 2))) + '' : inputsValue.hours + '');
        setValue('minutes', +inputsValue.minutes > 60 ? '00' : inputsValue.minutes + '');
        const getInputValues = getValues();
        const computedTime = `${getInputValues.hours}:${getInputValues.minutes}`;
        dispatch(setTimeOfNoticeAtNightOneTime(computedTime));
        setTimeout(() => {
            handleModalOnceAtNight();
        },1000)
    }

  return (
    <ModalSelect
        showIcon={false}
        openModal={modalOnceAtNight}
        height={!showChangeTimeBlock ? 4 : 2}
        setOpenModal={handleAppearModal}>
            <View className="mt-3 px-3">
                <View className="flex-row justify-between">
                    <View className="flex-row items-center justify-center">
                        <Image
                            style={{width:40, height:40}}
                            source={require('../../../assets/images/icons/sleepIcon.jpeg')}
                            placeholder={'wakeUpIcon'}
                            contentFit="cover"
                            transition={1000}
                            />
                        <Text className="text-2xl ml-2" style={{fontFamily:'geometria-bold'}}>. . .</Text>
                    </View>
                    <View className="items-center justify-center">
                        <Text className="text-xs" style={{fontFamily:'geometria-regular'}}>
                            время ночного уведомления:
                        </Text>
                        <View className="items-center justify-center flex-row border-b border-main-blue">
                            <NotificationIcon color={'#000'} width={20}/>
                            <Text className="text-3xl" style={{fontFamily:'geometria-bold'}}>
                                {settingsNighMode.timeOfNoticeAtNightOneTime}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handlePressChangeTime} activeOpacity={.6} className="p-3">
                            <Text className="text-xs" style={{fontFamily:'geometria-regular'}}>
                                изменить время
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center justify-center">
                        <Text className="text-2xl mr-2" style={{fontFamily:'geometria-bold'}}>. . .</Text>
                        <Image
                            style={{width:40, height:40}}
                            source={require('../../../assets/images/icons/wakeUpIcon.jpeg')}
                            placeholder={'sleepIcon'}
                            contentFit="cover"
                            transition={1000}
                            />
                    </View>
                </View>
                <View className={`${!showChangeTimeBlock && 'hidden'}`}>
                    <View className="flex-row justify-between px-4">
                        <Text style={{fontFamily:'geometria-bold'}} className="text-lg">|</Text>
                        <Text style={{fontFamily:'geometria-bold'}} className="text-lg">|</Text>
                    </View>
                    <>
                        <Text style={{fontFamily:'geometria-regular'}} className="text-sm text-center">выберете время в диапазоне:</Text>
                        <View className="flex-row justify-between items-center mt-2">
                            <Text style={{fontFamily:'geometria-bold'}} className="text-lg underline">{settingsNighMode.timeSleepStart}</Text>
                            <Text style={{fontFamily:'geometria-bold'}} className="text-lg underline">{settingsNighMode.timeSleepEnd}</Text>
                        </View>
                    </>
                    <View className="flex-row justify-center">
                        <View className="w-14">
                            <InputData
                                control={control}
                                inputMode={Keyboard.Numeric}
                                inputsValue={inputsValue.hours}
                                errors={errors.hours}
                                maxLength={1}
                                name="hours"
                                placeholder="hours"
                                marginBottom={0}
                                isRequired
                                showErrorText
                            />
                        </View>
                        <Text style={{fontFamily:'geometria-bold'}}  className="text-lg mx-1">:</Text>
                        <View className="w-20">
                            <InputData
                                control={control}
                                inputMode={Keyboard.Numeric}
                                inputsValue={inputsValue.minutes}
                                errors={errors.minutes}
                                maxLength={2}
                                name="minutes"
                                placeholder="minutes"
                                marginBottom={0}
                                isRequired
                                showErrorText
                            />
                        </View>
                    </View>
                    <Text className="text-xs text-center mt-1 mb-3" style={{fontFamily:'geometria-regular'}}>
                        новое время
                    </Text>
                    <ButtonBluBorder
                        handlePressButton={handleSubmit(handleSaveNewTime)}
                        title={'Сохранить'}
                        marginRight={0}
                    />
                </View>
            </View>
    </ModalSelect>
  );
};

export default ModalOneNoticeAtNight;
