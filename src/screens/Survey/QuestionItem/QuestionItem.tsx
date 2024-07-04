import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';

interface iQuestionItem{
    question: {
        id: number;
        text: string;
        answers: {
            id: number,
            iconName: string;
            text: string;
            iconColor: string,
        }[]
    }
    selectedAnswer:  number | undefined,
    onAnswerChange: (one:number, second:number) => void,
}

const QuestionItem = ({question, onAnswerChange, selectedAnswer}:iQuestionItem) => {
        //  console.log(selectedAnswer);
         
  return (
    <View className="mb-4">
        <Text style={{ fontFamily: 'geometria-regular' }}>{question.text}</Text>
        <View className="mt-2">
            {question.answers.map((answer) => (
                <TouchableOpacity
                    onPress={() => onAnswerChange(question.id, answer.id)}
                    key={answer.id}
                    className={`items-center flex-row mb-1 py-2 pl-2 rounded-lg ${selectedAnswer === answer.id && 'bg-[#bdc3c77d]'}`}>
                    <FontAwesome6 name={answer.iconName} size={24} color={answer.iconColor} />
                    <Text className="ml-2" style={{fontFamily:'geometria-bold'}}>
                        {answer.text}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

export default QuestionItem;
