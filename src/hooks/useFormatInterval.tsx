import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useFormatInterval = ({intervalInSeconds}:{intervalInSeconds:number}) => {
  const {t} = useTranslation();
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const hours = Math.floor(intervalInSeconds / 3600);
    const minutes = Math.floor((intervalInSeconds % 3600) / 60);
    setTimeString(`${hours} ${t("hour")} ${minutes} ${t("min")}`);
  }, [intervalInSeconds]);

  return timeString;
}