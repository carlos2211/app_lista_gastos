import { db } from "./firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const borrarIngreso = async(id) => {
 await deleteDoc(doc(db,'ingresos',id));
}
 
export default borrarIngreso;