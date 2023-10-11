import { Text } from "react-native";

const InputError = ({errorText}:{errorText:string | undefined}) => {
  return (
      <Text style={{fontFamily:'geometria-regular'}} className="text-error absolute -bottom-5">{errorText}</Text>
  );
};

export default InputError;
