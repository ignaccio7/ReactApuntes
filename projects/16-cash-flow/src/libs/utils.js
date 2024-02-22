
// este calculo ll tenemos explicado en la carpeta public como png
export const amountToPixel = (amount, amounts) => {
  // el alto del svg que usamos es de 200
  // Sacamos el monto minimo y maximo de los ultimos 30 montos que hayamos tenido
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);
  // hayamos el monto pero en una escala de 0 a 100 por eso sumanos el minimo monto tanto en el minmax como el amountvalue
  const amountValue = Math.abs(min) + amount;
  const minmax = Math.abs(max) + Math.abs(min);
  // calculamos el resultado del valor en pixeles multiplicando por 2 ya que el tamaño del svg es de 200 y redondeamos a 2 decimales
  const res = (((amountValue * 100) / minmax) * 2);
  // restamos el valor a 200 ya que los valores en el grafico el valor mas alto deberia ser 0 en este caso y el mas bajo 200
  return Math.round(200 - res);
};