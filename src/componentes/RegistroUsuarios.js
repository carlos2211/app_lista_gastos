import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Header,Titulo,ContenedorHeader} from '../elementos/Header';
import { Boton } from '../elementos/Boton';
import {Formulario,Input,ContenedorBoton} from '../elementos/ElementosDeFormulario';
import { ReactComponent as SvgLogin } from './../imagenes/registro.svg';
import styled from 'styled-components';
import {auth} from './../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Alerta from '../elementos/Alerta';


const Svg = styled(SvgLogin)`
width : 100%;
max-height: 6.25rem;
margin-bottom: 1.25rem;
`;

const RegistroUsuarios = () => {
    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');
    const [password2, establecerPassword2] = useState('');
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const handleChange = (e) =>{
        // console.log(e.target.name)
        switch (e.target.name) {
            case 'email':
                establecerCorreo(e.target.value);
                break;
            case 'password':
                establecerPassword(e.target.value);
                break;
            case 'password2':
                establecerPassword2(e.target.value);
                break;            
            default:
                break;
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});

        //comprobar que el correo sea valido
        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if(!expresionRegular.test(correo)){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:"error",
                mensaje:"Favor ingresa un correo electrónico válido"
            })
            return;
        }  
        
        if(correo === '' || password ==='' || password2 ===''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:"error",
                mensaje:"Favor rellena todos los campos"
            })
            return;
        }

        if(password !== password2){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:"error",
                mensaje:"Las contraseñas no son iguales"
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, correo, password);
            console.log('El usuario se creo con exito');
            navigate('/');
        } catch (error) {
            cambiarEstadoAlerta(true);
            let mensaje;
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                break;
            }
            cambiarAlerta({tipo:"error", mensaje:mensaje});
        }
    }

    return ( 
       <>
        <Helmet>
            <title>Crear Cuenta</title>
        </Helmet>

        <Header>
            <ContenedorHeader>
                <Titulo>Crear Cuenta</Titulo>
                <div>
                    <Boton to="/iniciar-sesion">Iniciar Sesión</Boton>
                </div>
            </ContenedorHeader>
        </Header>
        <Formulario onSubmit={handleSubmit}>
            <Svg/>
            <Input type='text'name='email'placeholder='Correo Electronico' value={correo} onChange={handleChange}/>
            <Input type='password'name='password'placeholder='Contraseña' value={password} onChange={handleChange}/>
            <Input type='password'name='password2'placeholder='Repetir la contraseña' value={password2} onChange={handleChange}/>
            <ContenedorBoton>
                <Boton as="button" type='submit' primario="true">Crear Cuenta</Boton>
            </ContenedorBoton>
        </Formulario>
        <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEstadoAlerta={cambiarEstadoAlerta}
            
        />
       </>
     );
}
 
export default RegistroUsuarios;