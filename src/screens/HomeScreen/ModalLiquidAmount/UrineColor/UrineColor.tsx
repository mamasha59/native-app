import { View, Text, Dimensions, FlatList, TouchableOpacity } from "react-native";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setUrineColor } from "../../../../store/slices/journalDataSlice";
import { iUrineColor } from "../../../../types";

const screen = Dimensions.get('screen');

const UrineColor = () => {
    const {urineColor} = useAppSelector(state => state.journal);
    const dispatch = useAppDispatch();

    const urineColors: iUrineColor[] = [
        {color:'#FFFFE0', title: 'Прозрачная или светло-желтая'},
        {color:'#FFFACD', title: 'Светло-желтая'},
        {color:'#FFD700', title: 'Темно-желтая'},
        {color:'#FF8C00', title: 'Янтарная'},
        {color:'#8B4513', title: 'Коричневатая'},
        {color:'#FF6347', title: 'Розовая или красная'}
    ];

    const handleSelectedColorOfUrine = (selectedColor:{title: string, color: string}) => {
        dispatch(setUrineColor(selectedColor));
    }

  return (
    <View className="flex-1 justify-center px-3">
      <Text style={{fontFamily:'geometria-bold'}} className="text-lg mb-4">Цвет мочи</Text>
      <View>
        <FlatList
            data={urineColors}
            keyExtractor={item => item.color}
            horizontal
            contentContainerStyle={{justifyContent:'space-between', flex: 1}}
            renderItem={({item}) =>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() => handleSelectedColorOfUrine(item)}
                    className={`border w-full h-full ${urineColor && urineColor.color === item.color && 'border-main-blue border-[3px]'}`}
                    style={{height: screen.width / 9, width: screen.width /  9, backgroundColor: item.color}}/>
            }
        />
      </View>
    </View>
  );
};

export default UrineColor;
