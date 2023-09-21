import { Text } from "react-native";
import MainLayout from "../../../components/MainLayout/MainLayout";
import SettingsNotice from "./SettingsNotice/SettingsNotice";
import SettingsAccess from "./SettingsAccess/SettingsAccess";

const NoticeAccessHomeScreen = () => {
  return (
    <MainLayout title="Уведомления и доступ">
  
        <Text style={{fontFamily:'geometria-regular'}} className="text-main-blue text-sm leading-4 mb-4 mt-3">Настройки уведомлений</Text>
        {/* настройки уведомлений */}
            <SettingsNotice text="Будильник 1" title="Тип сигнала" goTo="TypeOfSignalScreen"/>
            <SettingsNotice text="Время принять таблетку" title="Текст уведомления" goTo={'TextOfNotice'}/>
            <SettingsNotice text="Заход в приложение" title="Подтверждение" goTo={'Confirmation'}/>

        <Text style={{fontFamily:'geometria-regular'}} className="text-main-blue text-sm leading-4 mb-4 mt-8">Настройки доступа</Text>
        {/* настройки доступа */}
            <SettingsAccess title="Доступ к журналу мочеиспускания"/>
            <SettingsAccess title="Пропуск катетеризации"/>

    </MainLayout>
  );
};

export default NoticeAccessHomeScreen;
