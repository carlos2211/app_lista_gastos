const formatearCantidad = (cantidad) => {
    return new Intl.NumberFormat(
        'en-US',
        {style:'currency', currency:'USD', minimumFractionDigits:2}
    )
}
 
export default formatearCantidad;

export const formatMoney = (money) => {
    console.log(money)
   return money.toLocaleString('es-CL',{
        style:"currency",
        currency: "CLP"
    })
}