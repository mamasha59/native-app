import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import { Text, TouchableOpacity, View } from "react-native";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addBadgesJournalScreen, ifCountUrineChangeState, popupLiquidState } from "../../../../store/slices/appStateSlicer";
import { addUrineDiaryRecord } from "../../../../store/slices/journalDataSlice";
import { dateFormat } from "../../../../utils/const";
import Alert from "../../../../components/Alert/Alert";

interface iWithoutMeasuring {
  handleModalAlert: () => void,
  modalAlert: boolean,
  setModalAlert: Dispatch<SetStateAction<boolean>>,
}

const WithoutMeasuring = ({handleModalAlert, modalAlert, setModalAlert}:iWithoutMeasuring) => {
  const {t} = useTranslation();
  const nelaton = t("nelaton");

  const dispatch = useAppDispatch();
  const {ifCountUrinePopupLiquidState} = useAppSelector(state => state.appStateSlice);

  const handleAddRecordWithoutUrineMeasure = () => {
    dispatch(popupLiquidState(false));
    if(ifCountUrinePopupLiquidState){ // если пользователь выбрал измерять мочю, состояние меняется на экране Timer при нажатии кнопки Выполнено
      dispatch(addUrineDiaryRecord({
        id: uuidv4(),
        catheterType: nelaton,
        whenWasCanulisation: `${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`,
        amountOfReleasedUrine: '',
        amountOfDrankFluids: '',
        timeStamp: format(new Date(), dateFormat)
      }));
      dispatch(addBadgesJournalScreen(1));
      dispatch(ifCountUrineChangeState(false)); // сбрасываем состояние попапа Учет выделенной мочи
    }
  }

  return (
    <>
    <TouchableOpacity className="mb-4" onPress={handleAddRecordWithoutUrineMeasure}>
      <Text style={{fontFamily:'geometria-regular'}} className="text-sm">{t("modalUrineOutput.not_measured")}</Text>
      <Text style={{fontFamily:'geometria-regular'}} className="underline text-sm">
        {t("modalUrineOutput.continue_without_recording_the_urine_volume")}
      </Text>
    </TouchableOpacity>
    <Alert key={'alertCloseModalCountUrine'} modalAlertState={modalAlert} setModalAlertState={setModalAlert}>
      <View className="flex-1 justify-between items-center">
        <View>
          <Text style={{fontFamily:'geometria-bold'}} className="text-lg text-center mb-2">{t("modalUrineOutput.noticeWhenPressClose.title")}</Text>
          <Text style={{fontFamily:'geometria-regular'}} className="text-lg text-center">{t("modalUrineOutput.noticeWhenPressClose.description")}</Text>
        </View>
        <TouchableOpacity onPress={handleModalAlert} activeOpacity={0.6} className="py-[19px] px-[61px] mt-5 mx-auto items-center bg-main-blue rounded-[89px]">
          <Text style={{fontFamily:'geometria-bold'}} className="text-base text-white">{t("modalUrineOutput.noticeWhenPressClose.got_it")}</Text>
        </TouchableOpacity>
      </View>
    </Alert>
    </>
  );
};

export default WithoutMeasuring;