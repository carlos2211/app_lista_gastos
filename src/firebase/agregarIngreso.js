import {db} from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const agregarIngreso = ({descripcion, cantidad,fecha, uidUsuario}) => {
	return addDoc(collection(db, 'ingresos'), {
		descripcion: descripcion,
		cantidad: Number(cantidad),	
		fecha:fecha,
		uidUsuario: uidUsuario
	});
}

export default agregarIngreso;