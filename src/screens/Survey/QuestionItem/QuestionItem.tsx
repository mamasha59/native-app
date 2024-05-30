import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface iQuestionItem{
    number: number;
    question: string;
    options: any[]
}

const QuestionItem = ({number,options,question}:iQuestionItem) => {
    const [selected, setSelected] = useState<number | null>();
     
    const handlPressAnswer = (number,option) => {
        console.log(number,option);
        setSelected(!selected);
    }
    
  return (
    <View className="mb-4">
        <Text style={{ fontFamily: 'geometria-regular' }}>{number}. {question}</Text>
        <View className="mt-2">
            {options.map((option, index) => (
                <TouchableOpacity
                    onPress={() => handlPressAnswer(number,option)}
                    key={index}
                    className={`items-center flex-row mb-1 py-2 ${selected && 'bg-grey'}`}>
                    <option.Icon name={option.name} size={24} color={option.color}/>
                    <Text className="ml-2" style={{fontFamily:'geometria-bold'}}>
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

export default QuestionItem;
