import React, {useState} from 'react';
import {Formulario,Input,InputGrande,ContenedorBoton} from './../elementos/ElementosDeFormulario'
import { Header, Titulo } from '../elementos/Header';
import BtnRegresar from './../elementos/BtnRegresar';
// import { Link } from 'react-router-dom';
import { Boton } from '../elementos/Boton';
import {ReactComponent as  IconoPlus} from './../imagenes/plus.svg'
import {useAuth} from './../contextos/AuthContext'
import Alerta from './../elementos/Alerta'
// import { useNavigate } from 'react-router-dom';
import agregarIngreso from '../firebase/agregarIngreso';
import getUnixTime from 'date-fns/getUnixTime';
import DetalleIngresos from './DetalleIngresos'
import BarraIngresos from './BarraIngresos';

const FormularioIngresos = () => {
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [alerta, cambiarAlerta] = useState(false);
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    // const navigate = useNavigate();
    const {usuario} = useAuth();

    // const ingresos = useObtenerIngreso();
    // console.log(ingresos);

    const handleChange = (e) =>{
        if (e.target.name === 'descripcion') {
            cambiarInputDescripcion(e.target.value);
        }else if (e.target.name === 'cantidad'){
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g,''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let cantidad = parseFloat(inputCantidad).toFixed(3);

        if (inputDescripcion !== '' && inputCantidad !== '') {
            if(cantidad){                
                    agregarIngreso({
                        descripcion: inputDescripcion,
                        cantidad: Number(cantidad),
                        fecha:getUnixTime(new Date()),	
                        uidUsuario: usuario.uid       
                    })
                    .then(()=>{
                        cambiarInputDescripcion('');
                        cambiarInputCantidad('');                
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo:'exito', mensaje:'El ingreso fue agregado con éxito'})
                        // navigate('/')
                    })
                    .catch((error) =>{
                        console.log(error)
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo:'error', mensaje:'Hubo un problema al intentar agregar el ingreso'})
                    })
                }            
            
            else{
                cambiarEstadoAlerta(true);
                cambiarAlerta({tipo:'error', mensaje:'El valor que ingresaste no es correcto'})
            }
        }else{
            cambiarEstadoAlerta(true);
            cambiarAlerta({tipo:'error', mensaje:'Por favor completa todos los campos'})
        }
        
        
    }

return(
  
    <>   
    <Header>
        <BtnRegresar />
        <Titulo>Ingresos</Titulo>
    </Header>
    
    <Formulario onSubmit={handleSubmit}>
        <div>
            <Input
                type='text'
                name='descripcion'
                id='descripcion'
                placeholder='Descripcion'
                value={inputDescripcion}
                onChange={handleChange}
            />
                <InputGrande
                type='text'
                name='cantidad'
                id='cantidad'
                placeholder='$0'
                value={inputCantidad}
                onChange={handleChange}
                maxLength="8"
            />
        </div>
        <ContenedorBoton>
            <Boton as="button" primario="true" conicono="true" type='submit'>
               Agregar Ingreso<IconoPlus/>
            </Boton>
        </ContenedorBoton>
        <DetalleIngresos/>
        <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEstadoAlerta={cambiarEstadoAlerta}
            
        />
    </Formulario>
    <BarraIngresos/>
    </>
);


}

export default FormularioIngresos;