import React, {useState, useEffect} from 'react';
import {ContenedorFiltros,Formulario,Input,InputGrande,ContenedorBoton} from './../elementos/ElementosDeFormulario'
import { Boton } from '../elementos/Boton';
import {ReactComponent as  IconoPlus} from './../imagenes/plus.svg'
import SelectCategorias from './SelectCategorias';
import DatePicker from './DatePicker';
import agregarGasto from '../firebase/agregarGasto';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import {useAuth} from './../contextos/AuthContext'
import Alerta from './../elementos/Alerta'
import editarGasto from '../firebase/editarGasto';
import { useNavigate } from 'react-router-dom';



const FormularioGasto = ({gasto}) => {
    const [inputDescripcion,cambiarInputDescripcion] = useState('');
    const [inputCantidad,cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('hogar');
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState(false);
    const navigate = useNavigate();
    const {usuario} = useAuth();

    useEffect(() => {
        //comprobamos si ya hay algun gasto
        //si ya hay gasto , se establece el state con los valores del gasto
        if (gasto) {
            //comprobar si el gasto es del usuario actual
            if (gasto.data().uidUsuario === usuario.uid) {
                cambiarCategoria(gasto.data().categoria);
                cambiarFecha(fromUnixTime(gasto.data().fecha));
                cambiarInputDescripcion(gasto.data().descripcion);
                cambiarInputCantidad(gasto.data().cantidad);
            }
        }
    }, [gasto,usuario]);


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
                if (gasto) {
                    editarGasto({
                       id:gasto.id,
                       categoria:categoria,
                       descripcion:inputDescripcion,
                       cantidad: inputCantidad,
                       fecha: getUnixTime(fecha)
                   }).then(()=>{
                    navigate('/lista')
                   })
                }else{
                    agregarGasto({
                        categoria:categoria,
                        descripcion:inputDescripcion,
                        cantidad: inputCantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid            
                    })
                    .then(()=>{
                        cambiarCategoria('hogar');
                        cambiarInputDescripcion('');
                        cambiarInputCantidad('');
                        cambiarFecha(new Date());
    
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo:'exito', mensaje:'El gasto fue agregado con éxito'})
                    })
                    .catch((error) =>{
                        cambiarEstadoAlerta(true);
                        cambiarAlerta({tipo:'error', mensaje:'Hubo un problema al intentar agregar el gasto'})
                    })
                }
               

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

    return ( 
        <>
        
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={categoria}
                    cambiarCategoria={cambiarCategoria}
                ></SelectCategorias>
                <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}></DatePicker>
            </ContenedorFiltros>
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
                    {gasto ? 'Editar Gasto' : ' Agregar Gasto' } <IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />
        </Formulario>
        
        </>
        );
}
 
export default FormularioGasto;