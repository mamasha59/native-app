import { Text, TextInput, TouchableOpacity, View} from "react-native";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";

import { Option } from "../../../types";
import { addUrineDiaryRecord } from "../../../store/slices/journalDataSlice";
import { addBadgesJournalScreen } from "../../../store/slices/appStateSlicer";
import { useAppDispatch } from "../../../store/hooks";
import { dateFormat } from "../../../utils/const";
import { ClosePopup } from "../../../assets/images/icons";

interface iModalLeakageHappened{
    setToastOpened: (value:boolean) => void,
}

const ModalLeakageHappened = forwardRef<BottomSheetModal, iModalLeakageHappened>(({setToastOpened}, ref) => {
    
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const [inputLeakageValue, setInputLeakageValue] = useState<string>('');
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [selectedLeakageValue, setSelectedLeakageValue] = useState<string>('')

    const snapPoints = useMemo(() => ['87%'], []);

    const handleClickOnReasonOfLeakage = (reason?: Option) => { // при клике на причину подтекания или кнопку Ок
      const leakageReason = reason?.title || inputLeakageValue.trim();
      const leakageValue = selectedLeakageValue && selectedLeakageValue;

      const whenWasCatheterization = new Date().getHours() + ":" + new Date().getMinutes().toString().padStart(2,'0');

      dispatch(addUrineDiaryRecord({
        id: uuidv4(),
        whenWasCatheterization: whenWasCatheterization,
        leakageReason:{
          reason: leakageReason,
          value: leakageValue,
        },
        timeStamp: format(new Date(), dateFormat),
      }));

      dispatch(addBadgesJournalScreen(1));
      setInputLeakageValue('');
      setToastOpened(true);
      hideBottomSheet();
      setSelectedLeakageValue('');
    }

    const handleShowDescription = () => setShowDescription(!showDescription);

    const hideBottomSheet = () => {
      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current?.close(); // Использование методов BottomSheetModal через ref
      }
    }
    
    const whyLeakageHappenedReasons:Option[] = [
      {title: t("modalUrineLeakage.options.rest"), value: 'calm'},
      {title: t("modalUrineLeakage.options.coughing"), value: 'caught'},
      {title: t("modalUrineLeakage.options.physical_activity"), value: 'physical activity'}
    ];

    const leakageVolumes = [
      { value: 'modalUrineLeakage.leakage.few_drops.value', text: 'modalUrineLeakage.leakage.few_drops.text', description: 'modalUrineLeakage.leakage.few_drops.description' },
      { value: 'modalUrineLeakage.leakage.small.value', text: 'modalUrineLeakage.leakage.small.text', description: 'modalUrineLeakage.leakage.small.description' },
      { value: 'modalUrineLeakage.leakage.moderate.value', text: 'modalUrineLeakage.leakage.moderate.text', description: 'modalUrineLeakage.leakage.moderate.description' },
      { value: 'modalUrineLeakage.leakage.large.value', text: 'modalUrineLeakage.leakage.large.text', description: 'modalUrineLeakage.leakage.large.description' },
    ];

    const renderBackdrop = useCallback(
      (props:any) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      ),[]);
  

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView>
        <TouchableOpacity onPress={hideBottomSheet} activeOpacity={0.6} className="p-2 absolute top-0 right-[5%]">
          <ClosePopup width={15} height={15}/>
        </TouchableOpacity>
        <View className="w-full p-4 py-2">
          <TouchableOpacity onPress={handleShowDescription} className="flex-row items-center mb-2">
            <View className="w-[20x] h-[20px]">
              <LottieView
                source={require("../../../assets/question-mark.json")}
                style={{width: 20, height: 20}}
                autoPlay
              />
            </View>
            <View className="py-1">
              <Text style={{fontFamily:'geometria-bold'}} className="text-lg mb-1">
                {t("modalUrineLeakage.leakage_volume")}:
              </Text>
            </View>
          </TouchableOpacity>

          <View className="px-2">
            {leakageVolumes.map((item) => (
              <View key={item.value} className="mb-2">
                <TouchableOpacity
                  onPress={() => setSelectedLeakageValue(t(item.value))}
                  className={`border-[.2px] rounded-md p-2 m-1 ${selectedLeakageValue === t(item.value) ? 'bg-main-blue' : 'bg-white'}`}
                  >
                  <Text style={{fontFamily:'geometria-regular'}} className={`text-lg  ${selectedLeakageValue === t(item.value) ? 'text-white' : 'text-black'}`}>
                    {t(item.text)}
                  </Text>
                </TouchableOpacity>
                {showDescription && 
                <Text style={{fontFamily:'geometria-regular'}} className="text-main-blue">
                  {t(item.description)}
                </Text>}
              </View> 
            ))}
          </View>
        </View>

        <View className="p-7 py-2 items-center">
          <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-center">{t("modalUrineLeakage.title")}</Text>
          {whyLeakageHappenedReasons.map((item)=> (
            <TouchableOpacity
              key={item.title}
              className="rounded-lg p-2 bg-main-blue m-3 w-full"
              activeOpacity={0.6}
              onPress={() => handleClickOnReasonOfLeakage(item)}>
              <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-[#fff] text-center">{item.title}</Text>
            </TouchableOpacity>
          ))}
          <TextInput
              inputMode='text'
              maxLength={50}
              value={inputLeakageValue}
              style={{fontFamily:'geometria-bold'}}
              placeholderTextColor={'#9966AA'}
              className="text-purple-button text-lg mt-4 text-center border-b w-full"
              placeholder={t("modalUrineLeakage.write_your_own_option")}
              onChangeText={(value) => setInputLeakageValue(value)}
              onSubmitEditing={() => handleClickOnReasonOfLeakage()}
          />
          {inputLeakageValue && 
          <TouchableOpacity onPress={() => handleClickOnReasonOfLeakage()} className='mx-auto mt-4 bg-main-blue rounded-lg px-4 py-1'>
              <Text style={{fontFamily:'geometria-bold'}} className='text-xl text-[#fff]'>Подтвердить</Text>
          </TouchableOpacity>}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
})
export default ModalLeakageHappened;