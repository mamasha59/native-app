import { useEffect, useState } from "react";

export const useFormatInterval = ({newInterval}:{newInterval:string}) => {
    const [newIntervalText, setNewIntervalText] = useState<string>('');

    // useEffect(() => { 
    //     if (newInterval) {
    //       const interval = newInterval.split('.');
    //       const hours = +interval[0] === 0 ? '' : `${interval[0]} ч. `;
    //       const minutes = +interval[1] === 0 ? '' : `${interval[1]} мин.`;
    //       const connectedString = hours + minutes;
    //       setNewIntervalText(connectedString);
    //     }
    // },[newInterval]);

    return newIntervalText;
};
