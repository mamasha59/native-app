import { useEffect, useState } from "react";

export const useFormatInterval = ({intervalInSeconds}:{intervalInSeconds:number}) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const hours = Math.floor(intervalInSeconds / 3600);
    const minutes = Math.floor((intervalInSeconds % 3600) / 60);
    setTimeString(`${hours} ч. ${minutes} мин.`);
  }, [intervalInSeconds]);

  return timeString;
}