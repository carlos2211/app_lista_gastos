const useFormatLocalMoney = (money) => {
const formatedMoney = money.toLocaleString('es-CL',{
    style:"currency",
    currency: "CLP"
})

const formatedMoneyEUR = (money/1000).toLocaleString('de-DE',{
    style:"currency",
    currency: "EUR"
})

    return (
        {formatedMoney, formatedMoneyEUR}
    );
}
 
export default useFormatLocalMoney;