import { View, Text, TextInput } from "react-native";
import MainLayout from "../../components/MainLayout/MainLayout";
import { useState } from "react";

const FeedbackScreen = () => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    console.log('hi');
  }

  return (
    <MainLayout title="Отзывы и предложения" buttonBottomTitle="Отправить" buttonAction={handleSubmit}>
      <View>
        <Text className="text-[#4BAAC5] text-sm leading-5 font-normal mb-5">Напишите пожалуйста ваши отзывы или предложение</Text>
        <View className="min-w-[320px] min-h-[180px] border border-[#4babc558] flex-1 px-5 py-4 rounded-xl">
          <TextInput
            autoFocus={true}
            multiline
            value={text}
            className=""
            placeholder="Введите текст"
            onChangeText={setText}
          />
        </View>

    </View>
    </MainLayout>
  );
};

export default FeedbackScreen;
