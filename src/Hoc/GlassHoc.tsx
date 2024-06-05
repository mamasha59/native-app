import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Glass from '../screens/HomeScreen/ModalLiquidAmount/Glass/Glass';

interface iGlassHoc {
  setLiquidValue: () => void,
}

const GlassHoc = gestureHandlerRootHOC(() => (
    <>
      <Glass/>
    </>
  )
);

export default GlassHoc;