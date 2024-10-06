import { ScrollView, Text, TextInput, View } from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { useState } from "react";
import { useTranslation } from "react-i18next";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import { Keyboard } from "../../utils/enums";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import QuestionItem from "./QuestionItem/QuestionItem";
import { generateQuestions } from "../../utils/SurveyQuestions/SurveyQuestions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavigationPropsRoot } from "../../components/RootNavigations/RootNavigations";
import { handleCheckBoxAddSurveyInPdf, handleModalCustomizePdfDocument } from "../../store/slices/journalDataSlice";
import { generatePdfPattern } from "../../utils/PdfPattern/PdfPattern";
import { resetAnswers, saveAnswer, setSurveyInputs } from "../../store/slices/surveySlice";
import Alert from "../../components/Alert/Alert";
import Error from "../../components/Alert/Error/Error";
import { iSurveyInputs } from "../../types";

const Survey = ({route, navigation}:NavigationPropsRoot<'Survey'>) => {//TODO set input data
    const {t} = useTranslation();
    const { cameFrom } = route.params;
    
    const dispatch = useAppDispatch();
    const {surveyAnswers} = useAppSelector(state => state.surveySlice);
    const userData = useAppSelector(state => state.user);

    const [error, showError] = useState<boolean>(false);

    const [inputsValue, setInputsValue] = useState<iSurveyInputs>({
        additional: '',
        difficulties: ''
    })
    
    const questions = generateQuestions();

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

    const handleInputDifficulties = (value:string) => {
        setInputsValue({
            ...inputsValue,
            difficulties: value
        })
    }

    const handleInputAdditional = (value:string) => {
        setInputsValue({
            ...inputsValue,
            additional: value
        })
    }

    const acceptAndProceed = () => {
        dispatch(setSurveyInputs(inputsValue));
        goBackAndOpenModalCustomizePdf();
        dispatch(handleCheckBoxAddSurveyInPdf(true));
    }

    const resetAnswersOfSurvey = () => dispatch(resetAnswers());

    const handleModalError = () => showError(!error);
    
    const downLoadSurveyPdf = async () => {
        
        const pdf = await generatePdfPattern({
            showSurvey: true,
            filteredRecordByDate: null,
            answers: surveyAnswers,
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
            .catch(() => handleModalError())
        } else {
          Sharing.shareAsync(uri);
        }
    }

  return (
    <MainLayout title="Catheterization Satisfaction Questionnaire">
        <ScrollView showsVerticalScrollIndicator={false}>
            {questions.map(question => (
                <QuestionItem 
                    key={question.id}
                    question={question}
                    selectedAnswer={surveyAnswers[question.id]}
                    onAnswerChange={handleAnswerChange}
                />
            ))}
            <View className="mb-4">
                <Text style={{fontFamily:'geometria-regular'}}>
                    8. {t("questionnaireScreen.question_eight")}
                </Text>
                <TextInput
                    key={"difficulties"}
                    placeholder="write..."
                    inputMode={Keyboard.String}
                    maxLength={200}
                    multiline
                    style={{fontFamily:'geometria-regular'}}
                    onChangeText={(e) => handleInputDifficulties(e)}
                    className="text-lg w-full mt-2 text-center leading-[22px] border-b border-main-blue pb-[10px] items-center"
                />
            </View>
            <View className="mb-6">
                <Text style={{fontFamily:'geometria-regular'}}>
                    9. {t("questionnaireScreen.question_nine")}
                </Text>
                <TextInput
                    key={"additional"}
                    placeholder="additional..."
                    inputMode={Keyboard.String}
                    maxLength={200}
                    multiline
                    style={{fontFamily:'geometria-regular'}}
                    onChangeText={(e) => handleInputAdditional(e)}
                    className="text-lg w-full mt-2 text-center leading-[22px] border-b border-main-blue pb-[10px] items-center"
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
        <Alert modalAlertState={error} setModalAlertState={showError} key={'survey-error'}>
            <Error close={handleModalError} key={'survey-error'}/>
        </Alert>
    </MainLayout>
  );
};

export default Survey;