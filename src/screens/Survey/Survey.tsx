import { ScrollView, Text, View } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import InputData from "../../components/InputData/InputData";
import { useForm } from "react-hook-form";
import { Keyboard } from "../../utils/enums";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import QuestionItem from "./QuestionItem/QuestionItem";
import { questions } from "../../utils/SurveyQuestions/SurveyQuestions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetAnswers, saveAnswer } from "../../store/slices/appStateSlicer";
import { NavigationPropsRoot } from "../../components/RootNavigations/RootNavigations";
import { handleCheckBoxAddSurveyInPdf, handleModalCustomizePdfDocument } from "../../store/slices/journalDataSlice";
import { generatePdfPattern } from "../../utils/PdfPattern/PdfPattern";

const Survey = ({route, navigation}:NavigationPropsRoot<'Survey'>) => {//TODO set input data
    const { cameFrom } = route.params;
    
    const dispatch = useAppDispatch();
    const answersState = useAppSelector(state => state.appStateSlice.surveyAnswers);
    const userData = useAppSelector(state => state.user);

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            difficulties : '',
            additional: '',
        }
    });

    const inputsValue = watch();        // состояние инпута при его изменении

    const handleAnswerChange = (questionId: number, answerId: number) => {
        dispatch(saveAnswer({ questionId, answerId }));
      };

    const goBackAndOpenModalCustomizePdf = () => {
        navigation.goBack();
        dispatch(handleModalCustomizePdfDocument(true));
    }

    const goBack = () => {
        goBackAndOpenModalCustomizePdf();
        dispatch(handleCheckBoxAddSurveyInPdf(false));
    }

    const acceptAndProceed = () => {
        goBackAndOpenModalCustomizePdf();
        dispatch(handleCheckBoxAddSurveyInPdf(true));
    }

    const resetAnswersOfSurvey = () => {
        dispatch(resetAnswers());
    }

    const downLoadSurveyPdf = async () => {
        const pdf = await generatePdfPattern({showSurvey: true, filteredRecordByDate: null, answers: answersState, userData: userData});
        const { uri } = await Print.printToFileAsync({html:pdf, useMarkupFormatter:true, base64:true});

        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    
          await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'Yor-Journal', 'application/pdf')
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch(e => console.log(e))
        } else {
          Sharing.shareAsync(uri);
        }
    }

  return (
    <MainLayout title="Catheterization Satisfaction Questionnaire">
        <ScrollView>
            {questions.map(question => (
                <QuestionItem 
                    key={question.id}
                    question={question}
                    selectedAnswer={answersState[question.id]}
                    onAnswerChange={handleAnswerChange}
                />
            ))}
            <View className="mb-4">
                <Text style={{fontFamily:'geometria-regular'}}>8. Сталкивались ли вы с трудностями при введении катетера? Если да, опишите, какие именно трудности возникали.</Text>
                <InputData
                    key={"difficulties"}
                    control={control}
                    errors={errors.difficulties }
                    inputsValue={inputsValue.difficulties }
                    placeholder="write..."
                    name={"difficulties "}
                    inputMode={Keyboard.String}
                    maxLength={200}
                    multiline
                />
            </View>
            <View className="mb-4">
                <Text style={{fontFamily:'geometria-regular'}}>9. Какие дополнительные проблемы или осложнения связанные с катетеризацией вы бы хотели отметить?</Text>
                <InputData
                    key={"additional"}
                    control={control}
                    errors={errors.additional }
                    inputsValue={inputsValue.additional }
                    placeholder="additional..."
                    name={"additional "}
                    inputMode={Keyboard.String}
                    maxLength={200}
                    multiline
                />
            </View>
            <DoubleButton 
                textOfLeftButton={cameFrom === 'customizePdf' ? 'не хочу заполнять' : 'сбросить'}
                textOfRightButton={cameFrom === 'customizePdf' ? 'подтвердить' : "подтвердить и скачать PDF"}
                handlePressLeftButton={cameFrom === 'customizePdf' ? goBack : resetAnswersOfSurvey}
                handlePressRightButton={cameFrom === 'customizePdf' ? acceptAndProceed : downLoadSurveyPdf}
                showIcon={false}
                key={'survey'}
            />
        </ScrollView>
    </MainLayout>
  );
};

export default Survey;