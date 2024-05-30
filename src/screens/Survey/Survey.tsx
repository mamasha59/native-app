import { ScrollView, Text, View } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';

import MainLayout from "../../Layouts/MainLayout/MainLayout";
import InputData from "../../components/InputData/InputData";
import { useForm } from "react-hook-form";
import { Keyboard } from "../../utils/enums";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import QuestionItem from "./QuestionItem/QuestionItem";

const Survey = () => {

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            difficulties : '',
            additional: '',
        }
    });

    const inputsValue = watch();        // состояние инпута при его изменении
  return (
    <MainLayout title="Catheterization Satisfaction Questionnaire">
        <ScrollView>
            <QuestionItem
                number={1}
                question="Как часто вы испытываете боль или дискомфорт во время катетеризации?"
                options={[
                    { Icon: FontAwesome6, name:"face-tired", color: "red", label: "Постоянно" },
                    { Icon: FontAwesome6, name:"face-frown-open", color: "#c0392b", label: "Часто" },
                    { Icon: FontAwesome6, name:"face-meh", color: "#d35400", label: "Иногда" },
                    { Icon: FontAwesome6,  name:'face-grin', color: "#f39c12", label: "Редко" },
                    { Icon: FontAwesome6, name:'face-laugh-beam', color: "#f1c40f", label: "Никогда" }
                ]}
                key={'1'}   
            />
            <View className="mb-4">
                <Text style={{fontFamily:'geometria-regular'}}>2. Сталкивались ли вы с трудностями при введении катетера? Если да, опишите, какие именно трудности возникали.</Text>
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
            <QuestionItem
                number={3}
                question="Были ли случаи кровотечения после процедуры катетеризации?"
                options={[
                    { Icon: FontAwesome6, name:"face-tired", color: "red", label: "Да" },
                    { Icon: FontAwesome6, name:"face-frown-open", color: "#c0392b", label: "Нет" },
                    { Icon: FontAwesome6, name:'face-laugh-beam', color: "#f1c40f", label: "Никогда"}
                ]}
                key={3}
            />
            <QuestionItem
                number={4}
                question="Наблюдались ли у вас признаки инфекции после катетеризации, такие как жар, учащенное мочеиспускание, боль или жжение?"
                options={[
                    { Icon: FontAwesome6, name:"face-tired", color: "red", label: "Да" },
                    { Icon: FontAwesome6, name:"face-frown-open", color: "#c0392b", label: "Нет" },
                    { Icon: FontAwesome6, name:'face-laugh-beam', color: "#f1c40f", label: "Никогда"}
                ]}
                key={4}
            />
            <QuestionItem
                number={5}
                question="Испытывали ли вы аллергические реакции или раздражение кожи, вызванное использованием катетера или смазочных материалов?"
                options={[
                    { Icon: FontAwesome6, name:"face-tired", color: "red", label: "Да" },
                    { Icon: FontAwesome6, name:"face-frown-open", color: "#c0392b", label: "Нет" },
                    { Icon: FontAwesome6, name:'face-laugh-beam', color: "#f1c40f", label: "Никогда"}
                ]}
                key={5}
            />
            <QuestionItem
                number={6}
                question="Как вы оцениваете удобство использования применяемого катетера и смазочных материалов?"
                options={[
                    { Icon: FontAwesome6, name:"face-tired", color: "red", label: "Постоянно" },
                    { Icon: FontAwesome6, name:"face-frown-open", color: "#c0392b", label: "Часто" },
                    { Icon: FontAwesome6, name:"face-meh", color: "#d35400", label: "Иногда" },
                    { Icon: FontAwesome6,  name:'face-grin', color: "#f39c12", label: "Редко" },
                    { Icon: FontAwesome6, name:'face-laugh-beam', color: "#f1c40f", label: "Никогда" }
                ]}
                key={'6'}   
            />
            <QuestionItem
                number={7}
                question="Вы испытывали затруднения с катетеризацией, которые могли быть связаны с недостаточным обучением по этой процедуре?"
                options={[
                    { Icon: FontAwesome6, name:"face-tired", color: "red", label: "Да" },
                    { Icon: FontAwesome6, name:"face-frown-open", color: "#c0392b", label: "Нет" },
                    { Icon: FontAwesome6, name:'face-laugh-beam', color: "#f1c40f", label: "Никогда"}
                ]}
                key={7}
            />
            <QuestionItem
                number={8}
                question="Были ли случаи, когда катетеризация не удалась и требовалось экстренное обращение за медицинской помощью?"
                options={[
                    { Icon: FontAwesome6, name:"face-tired", color: "red", label: "Да" },
                    { Icon: FontAwesome6, name:"face-frown-open", color: "#c0392b", label: "Нет" },
                    { Icon: FontAwesome6, name:'face-laugh-beam', color: "#f1c40f", label: "Никогда"}
                ]}
                key={8}
            />
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