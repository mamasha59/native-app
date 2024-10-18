import { View, Text, TextInput, Linking, TouchableOpacity, ScrollView } from "react-native";
import { useRef, useState } from "react";

import MainLayout from '../../../Layouts/MainLayout/MainLayout';
import ShowToast from "../../../components/ShowToast/ShowToast";
import { focusInput } from "../../../utils/const";
import ButtonBluBorder from "../../../components/ButtonBluBorder/ButtonBluBorder";
import useBackHandler from "../../../hooks/useBackHandler";
import { useTranslation } from "react-i18next";

const FeedbackScreen = () => {
  const {t} = useTranslation();

  const [text, setText] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [sendMessageError, setSendMessageError] = useState<boolean>(false);

  const [subjectIndex, setSubjectIndex] = useState<number | null>();
  const [subject, setSubject] = useState<string>('');

  const inputRef = useRef<TextInput>(null);

  useBackHandler();

  const email = 'example@example.com';
  const url = `mailto:${email}?subject=${subject}&body=${text}`;

  const handleSubmit = async () => {
    if(subject.length > 0){
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
    }else {
      setErrorText('Выберите тему!');
      setSendMessageError(!sendMessageError);
    }
  }

  const handlePressSubject = (index:number, title: string) => {
    setSubjectIndex(subjectIndex === index ? null : index);
    setSubject(title);
  }

  const subjects = [
    { titleKey: 'recommendationScreen.subjects.report_issue' },
    { titleKey: 'recommendationScreen.subjects.suggest_improvement' },
    { titleKey: 'recommendationScreen.subjects.tech_support' },
    { titleKey: 'recommendationScreen.subjects.feedback' },
  ];

  return (
    <MainLayout title={t("recommendationScreen.write_to_the_developers")}>
      <ScrollView className="flex-1">
        <Text style={{fontFamily:'geometria-bold'}} className="text-base">
          {t("recommendationScreen.topics")}:
        </Text>
        <View className="mb-4">
          {subjects.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => handlePressSubject(index, item.titleKey)}
              className={`p-3 border-b-[0.2px] border-main-blue rounded-md ${subjectIndex === index && 'bg-main-blue'}`}
              >
              <Text style={{fontFamily:'geometria-regular'}} className={`text-base ${subjectIndex === index ? 'text-white' : 'text-black'}`}>
              - {t(item.titleKey)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-main-blue text-sm leading-5 font-normal mb-5">{t("recommendationScreen.describe_what_you_wanted")}</Text>
        <TouchableOpacity
          onPress={() => focusInput(inputRef)}
          activeOpacity={1}
          className="min-h-[180px] border border-main-blue flex-1 px-5 py-4 mb-6 rounded-xl">
          <TextInput
            ref={inputRef}
            multiline
            value={text}
            style={{fontFamily:'geometria-regular'}}
            placeholder={t("recommendationScreen.enter_text")}
            onChangeText={setText}
          />
        </TouchableOpacity>
        <ButtonBluBorder handlePressButton={handleSubmit} title={t("journalScreen.send")}/>
      </ScrollView>
      <ShowToast key={'feedback-error'} setShowToast={setSendMessageError} show={sendMessageError} text={errorText}/>
    </MainLayout>
  );
};

export default FeedbackScreen;
