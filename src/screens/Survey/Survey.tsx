import { ScrollView, Text, View } from "react-native";

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import InputData from "../../components/InputData/InputData";
import { useForm } from "react-hook-form";
import { Keyboard } from "../../utils/enums";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import QuestionItem from "./QuestionItem/QuestionItem";
import { useState } from "react";
import { questions } from "../../utils/SurveyQuestions/SurveyQuestions";

const Survey = () => {
    const [answersState, setAnswersState] = useState<{ [key: number]: string | undefined }>({});

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            difficulties : '',
            additional: '',
        }
    });

    const inputsValue = watch();        // состояние инпута при его изменении

    const handleAnswerChange = (questionId:number, answer:string) => {
      setAnswersState(prevState => ({
        ...prevState,
        [questionId]: answer
      }));
    };

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
                textOfLeftButton="сохранить"
                textOfRightButton="сохранить и скачать PDF"
                handlePressLeftButton={() => console.log('left')}
                handlePressRightButton={() => console.log('left')}
                showIcon={false}
                key={'survey'}
            />
        </ScrollView>
    </MainLayout>
  );
};

export default Survey;