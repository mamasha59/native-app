import { ScrollView, Text, View } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import InputData from "../../components/InputData/InputData";
import { Keyboard } from "../../utils/enums";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import QuestionItem from "./QuestionItem/QuestionItem";
import { generateQuestions } from "../../utils/SurveyQuestions/SurveyQuestions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavigationPropsRoot } from "../../components/RootNavigations/RootNavigations";
import { handleCheckBoxAddSurveyInPdf, handleModalCustomizePdfDocument } from "../../store/slices/journalDataSlice";
import { generatePdfPattern } from "../../utils/PdfPattern/PdfPattern";
import { resetAnswers, saveAnswer } from "../../store/slices/surveySlice";
// import { questions } from "../../utils/SurveyQuestions/SurveyQuestions";

const Survey = ({route, navigation}:NavigationPropsRoot<'Survey'>) => {//TODO set input data
    const {t, i18n} = useTranslation();
    const { cameFrom } = route.params;
    
    const dispatch = useAppDispatch();
    const answers = useAppSelector(state => state.surveySlice.surveyAnswers);
    const userData = useAppSelector(state => state.user);

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            difficulties : '',
            additional: '',
        }
    });
    const questions = generateQuestions();
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
        const pdf = await generatePdfPattern({
            showSurvey: true,
            filteredRecordByDate: null,
            answers: answers,
            userData: userData
        });
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
                    selectedAnswer={answers[question.id]}
                    onAnswerChange={handleAnswerChange}
                />
            ))}
            <View className="mb-4">
                <Text style={{fontFamily:'geometria-regular'}}>
                    8. {t("questionnaireScreen.question_eight")}
                </Text>
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
                <Text style={{fontFamily:'geometria-regular'}}>
                    9. {t("questionnaireScreen.question_nine")}
                </Text>
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
                textOfLeftButton={cameFrom === 'customizePdf' ? t("dont_want_to_fill_out") : t("questionnaireScreen.reset_button")}
                textOfRightButton={cameFrom === 'customizePdf' ? t("save") : t("questionnaireScreen.confirm_and_download_PDF")}
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