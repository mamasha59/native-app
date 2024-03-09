import { View, Text, TextInput, Linking } from "react-native";
import { useState } from "react";

import MainLayout from '../../../Layouts/MainLayout/MainLayout';
import ShowToast from "../../../components/ShowToast/ShowToast";

const FeedbackScreen = () => {
  const [text, setText] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [sendMessageError, setSendMessageError] = useState<boolean>(false);

  const email = 'example@example.com';
  const subject = 'Отзывы и предложения';
  const url = `mailto:${email}?subject=${subject}&body=${text}`;

  const handleSubmit = async () => {
    if (text.length === 0) {
      setErrorText('Введите текст!')
      setSendMessageError(!sendMessageError);
    } else {
      try {
        await Linking.openURL(url);
      } catch (error) {
        setErrorText('Упс! Что то пошло не так...')
        setSendMessageError(!sendMessageError);
      }
    }
  }
  return (
    <MainLayout title="Отзывы и предложения" buttonBottomTitle="Отправить" buttonAction={handleSubmit}>
      <View>
        <Text className="text-main-blue text-sm leading-5 font-normal mb-5">Напишите пожалуйста ваши отзывы или предложение</Text>
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
    <ShowToast key={'feedback-error'} setShowToast={setSendMessageError} show={sendMessageError} text={errorText}/>
    </MainLayout>
  );
};

export default FeedbackScreen;
