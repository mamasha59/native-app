import {useEffect} from "react";
import Toast from "react-native-root-toast";

interface iShowToast {
    show: boolean;
    setShowToast: (event:boolean) => void;
    text: string;
}

const ShowToast = ({show, setShowToast, text}:iShowToast) => {

    useEffect(() => {
        if (show) {
          const timeout = setInterval(() => {
            setShowToast(!show);
          }, 2000);
          return () => clearTimeout(timeout);
        }
      },[show])

  return (
    <Toast
        visible={show}
        position={50}
        shadow={true}
        animation={true}
        hideOnPress={true}
        delay={10}
    >
        {text}
    </Toast>
  );
};

export default ShowToast;
