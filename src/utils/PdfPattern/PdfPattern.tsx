import { iDairyRecord, iStatisticsPerDay, iUser } from "../../types";

interface igenetatePdfPattern{
    filtredRecordByDate: iDairyRecord[],
    statisticsPerDay: iStatisticsPerDay,
    selectedCalendareDate: string,
    userData: iUser,
}

export const genetatePdfPattern = async ({filtredRecordByDate,selectedCalendareDate,statisticsPerDay,userData}:igenetatePdfPattern) => {

    return `
        <html lang="rus">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <meta http-equiv="Content-Disposition" content="attachment; filename="Мое.pdf">
        <title>Дневник мочеиспускания</title>
        </head>
        <body style="padding: 0; font-family: 'geometria-regular'; margin: 0">
            <div
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
                    Ф.И.О:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.name} ${userData.surname}
                    </b>
                </p>`
            }
            ${userData.age &&
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    Возраст:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.age}
                    </b>
                </p>`
            }
            ${userData.sex &&
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    Пол:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.sex}
                    </b>
                </p>`
            }
            ${userData.volume && 
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    Обьем мочевого пузыря:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.volume} мл
                    </b>
                </p>`
            }
            ${userData.catheterSize &&             
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    Размер катетора:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.catheterSize}
                    </b>
                </p>`
            }
            ${userData.catheterType &&
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    Каким катетором пользуетесь. <br/>
                    Название / Производитель:
                    <b style="margin-left: 10px; font-size: 15px;">
                        ${userData.catheterType}
                    </b>
                </p>`
            }
            ${userData.additionalInfo && 
                `<p style="padding: 0; margin: 0; font-size: 15px;">
                    Дополнительно для врача:
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
            </div>
            <div>
                <h2 style="font-size: 40px; margin: 0; text-align: center;">
                    Дневник мочеиспускания
                </h2>
                <div style="margin-top: 20px; justify-content: start; padding: 0 20px;">
                    <p style="padding: 0; margin: 0; font-size: 20px;">
                        Дата:
                        <b style="margin-left: 10px; font-size: 20px;">
                            ${selectedCalendareDate}
                        </b>
                    </p>
                    <div>
                        <p style="font-size: 20px;">Катетеризаций: ${statisticsPerDay.cannulation}</p>
                        <p style="font-size: 20px;">Подтеканий: ${statisticsPerDay.leakage}</p>
                        <p style="font-size: 20px;">Выпито жидкости: ${statisticsPerDay.amountOfDrankFluids} мл</p>
                        <p style="font-size: 20px;">Выделенно жидкости: ${statisticsPerDay.amountOfReleasedUrine} мл</p>
                    </div>
                </div>
            </div>
            <div style="color: #101010; padding: 20px; display: flex; flex-direction: column; align-items: center;">
                <table class="GeneratedTable">
                    <thead style="font-size: 20px; line-height: 24px;">
                        <tr>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Действие</th>
                        <th>Объем выпитой жидкости, мл</th>
                        <th>Обьем выеделенной мочи, мл</th>
                        <th>Состояние при подтекании</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filtredRecordByDate.map((e, index) => `
                            <tr key=${index}>
                            <td style="text-align: center;">${e.timeStamp?.slice(0, 10) || ''}</td>
                            <td style="text-align: center;">${e.whenWasCanulisation || ''}</td>
                            <td style="text-align: center;">${e.catheterType ? `Катетеризация` : e.amountOfDrankFluids ? 'Выпито жидкости' : e.leakageReason ? 'Подтекание' : ''} </td>
                            <td style="text-align: center;">${e.amountOfDrankFluids|| ''}</td>
                            <td style="text-align: center;">${e.amountOfReleasedUrine || ''}</td>
                            <td style="text-align: center;">${e.leakageReason || ''}</td>
                            </tr>
                            `).join('')
                        }
                    </tbody>
                </table>
                <p style="text-align: end; width: 100%;">Созданно в приложении Use Nelaton Easily</p>
            </div>
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