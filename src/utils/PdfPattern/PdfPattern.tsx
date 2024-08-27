import { FilteredRecords } from "../../screens/JournalScreen/ModalCustomizePdf/ModalCustomizePdf";
import { iUnits, iUser } from "../../types";
import { generateQuestions } from "../SurveyQuestions/SurveyQuestions";

import i18next from "i18next";

interface iGeneratePdfPattern{
    filteredRecordByDate: FilteredRecords | null,
    userData: iUser,
    answers?: { [key: number]: number | undefined };
    showSurvey: boolean,
    units?: iUnits
}

export const generatePdfPattern = async ({answers, filteredRecordByDate,userData, showSurvey, units}:iGeneratePdfPattern) => {
    const questions = generateQuestions();

    return `
    <html lang="rus">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <meta http-equiv="Content-Disposition" content="attachment; filename="Urine-diary.pdf">
    <title>${i18next.t("pdfPattern.urine_diary")}</title>
    </head>
    <body style="padding: 0; font-family: 'geometria-regular'; margin: 0">
        <header
            style="
            padding: 1.75rem;
            margin: 0px;
            color: white;
            background: linear-gradient(90deg, #4baac5 0.16%, #7076b0 101.13%);
            position: relative;
            "
        >
            <div style="display: flex; flex-direction: column;">
            ${userData.name && 
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    ${i18next.t("pdfPattern.full_name")}:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.name} ${userData.surname}
                    </b>
                </p>`
            }
            ${userData.age &&
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    ${i18next.t("personalizationScreen.your_age")}:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.age}
                    </b>
                </p>`
            }
            ${userData.sex &&
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    ${i18next.t("personalizationScreen.your_gender")}:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.sex}
                    </b>
                </p>`
            }
            ${userData.volume && 
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    ${i18next.t("personalizationScreen.bladder_volume")}:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.volume} ${units && units.title}
                    </b>
                </p>`
            }
            ${userData.catheterSize &&             
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    ${i18next.t("personalizationScreen.catheter_size")}:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.catheterSize}
                    </b>
                </p>`
            }
            ${userData.catheterType &&
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    ${i18next.t("personalizationScreen.which_catheter_do_you_use")}
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.catheterType}
                    </b>
                </p>`
            }
            ${userData.additionalInfo && 
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    ${i18next.t("personalizationScreen.additional")}
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.additionalInfo}
                    </b>
                </p>`
            }
            </div>
            <div style="position: absolute; right: 10px; top: 5%; display: flex; align-items: center;">
                <h1 style="font-size: 40px; line-height: 30px;">
                    <p style="font-size: 2rem; font-weight: 300;">Use</p>
                    <p style="font-weight: 700;">Nelaton</p>
                    <p style="text-align: end; font-size: 2rem; font-weight: 300;">easily</p>
                </h1>
            </div>
        </header>
        <h2 style="font-size: 40px; margin: 5px 0; text-align: center;">
            ${i18next.t("pdfPattern.urine_diary")}
        </h2>

        ${filteredRecordByDate && Object.entries(filteredRecordByDate).map(([date, records]) => (
            records.length > 0 ? (
                `<section style="padding: 0 20px;">
                    <div style="margin-top: 20px; justify-content: start;">
                        <p style="padding: 0; margin: 0; font-size: 20px;">
                            ${i18next.t("pdfPattern.date")}:
                            <b style="margin-left: 10px; font-size: 20px;">
                                ${date}
                            </b>
                        </p>
                        <div>
                            <p style="font-size: 20px;">${i18next.t("journalScreen.filters.catheterizations")}: ${records.filter(e => e.catheterType).length}</p>
                            <p style="font-size: 20px;">${i18next.t("journalScreen.filters.urine_leakage")}: ${records.filter(e => e.leakageReason).length}</p>
                            <p style="font-size: 20px;">${i18next.t("journalScreen.filters.fluid_intake")}: ${records.map((e) => e.amountOfDrankFluids).reduce((acc,e) => acc! + (e || 0), 0)} ${units && units.title}</p>
                            <p style="font-size: 20px;">${i18next.t("journalScreen.filters.urine_output")}: ${records.map((e) => e.amountOfReleasedUrine).reduce((acc,e) => acc! + (e || 0), 0)} ${units && units.title}</p>
                        </div>
                    </div>
                </section>
                <section style="color: #101010; padding: 20px; display: flex; flex-direction: column; align-items: center;">
                    <table class="GeneratedTable">
                        <thead style="font-size: 20px; line-height: 24px;">
                            <tr>
                            <th>${i18next.t("pdfPattern.date")}</th>
                            <th>${i18next.t("journalScreen.recordTitles.time")}</th>
                            <th>${i18next.t("pdfPattern.action")}</th>
                            <th>${i18next.t("journalScreen.filters.fluid_intake")}, ${units && units.title}</th>
                            <th>${i18next.t("journalScreen.filters.urine_output")}, ${units && units.title}</th>
                            <th>${i18next.t("pdfPattern.leaking_condition")}</th>
                            </tr>
                        </thead>
                        ${filteredRecordByDate &&
                        `<tbody>
                            ${records.map((e, index) => `
                                <tr key=${index}>
                                <td style="text-align: center; width: fit-content; width: 100%;">${e.timeStamp?.slice(0, 10) || ''}</td>
                                <td style="text-align: center;">${e.whenWasCanulisation || ''}</td>
                                <td style="text-align: center;">${e.catheterType ? i18next.t("journalScreen.filters.catheterizations") : e.amountOfDrankFluids ? i18next.t("journalScreen.filters.fluid_intake") : e.leakageReason ? i18next.t("journalScreen.filters.urine_leakage") : ''} </td>
                                <td style="text-align: center; width: fit-content; width: 100%;">${e.amountOfDrankFluids|| ''}</td>
                                <td style="text-align: center; width: fit-content; width: 100%;">${e.amountOfReleasedUrine || ''}</td>
                                <td style="text-align: center;">${e.leakageReason || ''}</td>
                                </tr>
                                `).join('')
                            }
                        </tbody>`}
                    </table>
                    <footer>
                        <p style="text-align: end; width: 100%;">Создано в приложении Use Nelaton Easily</p>
                    </footer>
                </section>`
            ) : null
        )).join('')}
       ${showSurvey ?
            `<section style="padding: 0 20px;">
                <h2>Catheterization Satisfaction Questionnaire</h2>
                ${questions.map(question => `
                    <div key=${question.id}>
                        <p>${question.text}</p>
                        ${question.answers.map(answer => `
                            <div style="padding-left: 10px; max-width: fit-content;">
                                <p style="font-weight: 700; color: ${answer.iconColor}; ${answers && answers[question.id] === answer.id ? 'background-color: #bdc3c77d;' : ''}">
                                    ${answer.text}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </section>` : ''}
    </body>
</html>
<style>
    @page {
    size: A4 portrait;
    }
    *{
    margin: 0;
    padding: 0;
    }
    body {
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    }
    img {
    max-width: 100%;
    display: block;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    table.GeneratedTable {
    width: 100%;
    margin: 10px 0;
    background-color: #ffffff;
    border-width: 2px;
    border-color: #4baac5;
    border-style: solid;
    color: #101010;  
    }
    table.GeneratedTable td,
    table.GeneratedTable th {
    border-width: 2px;
    border-color: #4baac5;
    border-style: solid;
    padding: 3px;
    }
    table.GeneratedTable thead {
    background-color: #ffffff;
    }
</style>
</html>  
    `
}