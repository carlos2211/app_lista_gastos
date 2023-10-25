import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

//hook para acceder al contexto
const useAuth = () =>{
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();
    
    //se crea state para saber cuando termina de cargara la comprobacion de onAuthStateChanged
    const [cargando, cambiarCargando] = useState(true);
    
    //efecto para ejecutar la comprobacion una sola vez
    useEffect(()=>{
            //comprobamos si hay un usuario
            const cancelarSuscripcion = onAuthStateChanged(auth,(usuario)=>{
                cambiarUsuario(usuario);
                cambiarCargando(false);
            });

        return cancelarSuscripcion;

    }, []);

    return ( 
        <AuthContext.Provider value ={{usuario:usuario}}>
            {/* solamenmte se retorna la app si no esta cargando la comprobacion de usuario */}
            {!cargando && children}
        </AuthContext.Provider>
     );
}
 
export {AuthProvider,AuthContext,useAuth} ;