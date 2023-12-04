import { View, ScrollView} from "react-native";
import { useState } from "react";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Dropdown } from "react-native-element-dropdown";

import { DropDown } from "../../assets/images/icons";

import JournalRecord from "./JournalRecord/JournalRecord";
import DoubleButton from "../../components/DoubleButton/DoubleButton";
import JournalCalendar from "./JournalCalendar/JournalCalendar";
import { getCurrentMonth, months } from "../../utils/date";
import MainLayout from '../../Layouts/MainLayout/MainLayout';
import { iMonth } from "../../Types";
import { useAppSelector } from "../../store/hooks";

const JournalScreen = () => { // TODO что бы скачивать файл с помощью expo file sistem мне нужен url с бека, пока что так
  const [month, setSelectedMonth] = useState<iMonth>({
    month: months[getCurrentMonth].value,
    index: getCurrentMonth,
  });
  const userData = useAppSelector(user => user.user);

  const html = `
  <html lang="rus">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <meta http-equiv="Content-Disposition" content="attachment; filename="Мое.pdf">
    <title>Дневник мочеиспускания</title>
  </head>
  <body style="padding: 0; margin: 0; font-family: 'geometria-regular';">
    <div
      style="
        height: 20vh;
        padding: 140px;
        color: white;
        background: linear-gradient(90deg, #4baac5 0.16%, #7076b0 101.13%);
        position: relative;
      "
    >
      <div style="display: flex; align-items: center;">
        <div style="display: flex; flex-direction: column; gap: 30px;">
          <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
            Дата:
            <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
              >${userData.birthday}г.</b
            >
          </p>
          <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
            Фамилия И.О.:
            <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
              >${userData.nameSurname}</b
            >
          </p>
          <p style="padding: 0; margin: 0; font-size: 40px; line-height: 48px;">
            Дата рождения:
            <b style="margin-left: 30px; font-size: 40px; line-height: 48px;"
              >${userData.birthday}г.</b
            >
          </p>
        </div>
      </div>
      <div
        style="
          position: absolute;
          right: 10%;
          top: 0;
          display: flex;
          align-items: center;
          gap: 60px;
        "
      >
        <p>logo</p>
        <h1 style="font-size: 120px; line-height: 144px;">
          Uro <span>Control</span>
        </h1>
      </div>
    </div>
    <div style="color: #101010; padding: 100px 100px 120px 100px;">
      <h2 style="font-size: 80px; line-height: 96px; margin-bottom: 80px;">
        Дневник мочеиспускания
      </h2>
      <style>
        table.GeneratedTable {
          width: 100%;
          background-color: #ffffff;
          border-collapse: collapse;
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

      <table class="GeneratedTable">
        <thead style="font-size: 20px; line-height: 24px;">
          <tr>
            <th>Дата</th>
            <th>Время</th>
            <th>Тип катетера</th>
            <th>Скорость катетеризации, сек</th>
            <th>Объем выделенной мочи, мл</th>
            <th>Объем выпитой жидкости, мл</th>
            <th>Подтекание мочи (да/нет)</th>
            <th>Активность при подтекании (в покое, кашель, бег и.т.п.)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;

const printToFile = async () => {
  const { uri } = await Print.printToFileAsync({ html, width: 2480 });
  await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle:'Поделиться документом' });
};

  return (
    <MainLayout title="Дневник мочеиспускания">
      {/* Выбор месяца | Отображение нынешнего месяца */}
      <Dropdown
        data={months}
        style={{width:100, marginBottom:4}}
        fontFamily="geometria-regular"
        maxHeight={300}
        labelField="value"
        valueField="value"
        placeholder={month.month}
        searchPlaceholder="Поиск месяца"
        containerStyle={{width:210}}
        autoScroll
        search
        value={month.month}
        accessibilityLabel={month.month}
        renderRightIcon={() => <DropDown/>}
        onChange={item => {
          setSelectedMonth({month: item.value, index: item.index});
      }}
      />
      <JournalCalendar month={month} setSelectedMonth={setSelectedMonth} />
      {/* list */}
      <ScrollView className="flex-1 overflow-hidden" showsVerticalScrollIndicator={false}>
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <JournalRecord key={index} />
          ))}
      </ScrollView>
      <DoubleButton
        showIcon={false}
        textOfLeftButton="Отправить"
        textOfRightButton="Сохранить PDF"
        handlePressLeftButton={printToFile}
      />
    </MainLayout>
  );
};

export default JournalScreen;
