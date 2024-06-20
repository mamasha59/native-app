import { useEffect, useState } from "react";

import SwitchToggle from "../SwitchToggle/SwitchToggle";
import { setWhetherCountUrine } from "../../store/slices/appStateSlicer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const ToggleIsCountUrine = () => {
    const settings = useAppSelector((state) => state.appStateSlice); // берем из стейта то что выбрал юзер на стартовых экранах (Да/Нет)
    const dispatch = useAppDispatch();

    const [isEnabled, setIsEnabled] = useState<boolean>(settings.urineMeasure);

    useEffect(() => {
      setIsEnabled(settings.urineMeasure);
    },[settings.urineMeasure]);

    const handleIsCountUrine = () => { // функция при выборе селекта Измерение кол-ва мочи
        const newIsEnabled = !isEnabled;
        setIsEnabled(newIsEnabled);

        dispatch(setWhetherCountUrine(newIsEnabled));
    }

  return (
    <SwitchToggle key={'counturine'} title="Измерение кол-ва выделяемой мочи" onValueChange={handleIsCountUrine} isEnabled={isEnabled}/>
  );
};

export default ToggleIsCountUrine;
