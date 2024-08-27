    // Массив вопросов
import i18next from "i18next";
   export const generateQuestions  = () => {
        return [
            { 
                id: 1, 
                text: i18next.t("questionnaireScreen.question_one"),
                answers: [
                    {id:1, iconName:'face-tired', text: i18next.t("questionnaireScreen.always"), iconColor:'#ff1900'},
                    {id:2, iconName:'face-frown-open', text: i18next.t("questionnaireScreen.often"), iconColor:'#c0392b'},
                    {id:3, iconName:'face-meh',text: i18next.t("questionnaireScreen.sometimes"), iconColor:'#d35400'},
                    {id:4, iconName:'face-grin', text: i18next.t("questionnaireScreen.never"), iconColor:'#f39c12'},
                    {id:5, iconName:'face-laugh-beam', text: i18next.t("questionnaireScreen.rarely"), iconColor:'#01c91f'}] 
            },
            {
                id: 2,
                text: i18next.t("questionnaireScreen.question_two"),
                answers: [
                    {id:1, iconName: 'face-tired', text: i18next.t("yes"), iconColor:'#ff1900'},
                    {id:2, iconName: 'face-grin', text: i18next.t("no"), iconColor:'#f1c40f'},
                    {id:3, iconName: 'face-laugh-beam', text: i18next.t("questionnaireScreen.rarely"), iconColor:'#01c91f'}]
            },
            {
                id: 3,
                text: i18next.t("questionnaireScreen.question_three"),
                answers: [
                    {id:1, iconName: 'face-tired', text: i18next.t("yes"), iconColor:'#ff1900'},
                    {id:2, iconName: 'face-grin', text: i18next.t("no"), iconColor:'#f1c40f'},
                    {id:3, iconName: 'face-laugh-beam', text: i18next.t("questionnaireScreen.rarely"), iconColor:'#01c91f'}]
            },
            {
                id: 4,
                text: i18next.t("questionnaireScreen.question_four"),
                answers: [
                    {id:1, iconName: 'face-tired', text: i18next.t("yes"), iconColor:'#ff1900'},
                    {id:2, iconName: 'face-grin', text: i18next.t("no"), iconColor:'#f1c40f'},
                    {id:3, iconName: 'face-laugh-beam', text: i18next.t("questionnaireScreen.rarely"), iconColor:'#01c91f'}]
            },
            {
                id: 5,
                text: i18next.t("questionnaireScreen.question_five"),
                answers: [
                    {id:1, iconName:'face-laugh-beam', text: i18next.t("questionnaireScreen.very_convenient"), iconColor:'#01c91f'},
                    {id:2, iconName:'face-grin', text: i18next.t("questionnaireScreen.convenient"), iconColor:'#f1c40f'},
                    {id:3, iconName:'face-meh',text: i18next.t("questionnaireScreen.neutral"), iconColor:'#f39c12'},
                    {id:4, iconName:'face-frown-open', text: i18next.t("questionnaireScreen.inconvenient"), iconColor:'#d35400'},
                    {id:5, iconName:'face-tired', text: i18next.t("questionnaireScreen.very_inconvenient"), iconColor:'#ff1900'}] 
            },
            {
                id: 6,
                text: i18next.t("questionnaireScreen.question_six"),
                            answers: [
                    {id:1, iconName: 'face-tired', text: i18next.t("yes"), iconColor:'#ff1900'},
                    {id:2, iconName: 'face-grin', text: i18next.t("no"), iconColor:'#f1c40f'},
                    {id:3, iconName: 'face-laugh-beam', text: i18next.t("questionnaireScreen.rarely"), iconColor:'#01c91f'}]
            },
            {
                id: 7,
                text: i18next.t("questionnaireScreen.question_seven"),
                            answers: [
                    {id:1, iconName: 'face-tired', text: i18next.t("yes"), iconColor:'#ff1900'},
                    {id:2, iconName: 'face-grin', text: i18next.t("no"), iconColor:'#f1c40f'},
                    {id:3, iconName: 'face-laugh-beam', text: i18next.t("questionnaireScreen.rarely"), iconColor:'#01c91f'}]
            }
        ]
    }