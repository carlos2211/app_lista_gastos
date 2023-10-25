const formatearCantidad = (cantidad) => {
    return new Intl.NumberFormat(
        'en-US',
        {style:'currency', currency:'USD', minimumFractionDigits:2}
    )
}
 
export default formatearCantidad;