import { useEffect, useState } from "react";
import { amountToPixel } from "../../libs/utils.js";

export default function Graphic({ amounts, selectedDay }) {  

  const [points, setPoints] = useState("");
  const [zero, setZero] = useState(0)    

  useEffect(() => {
    const total = amounts.length;
    const newPoints =  '0,100 ' + amounts.map((_, index) => {
        // este calculo es para saber la posicion inicial que tendra en X cada valor de los montos que tomemos
        // 300 porque definimos 300 el ancho del svg que estamos utilizando
        const x = ((300 / total) * (index + 1)).toFixed(2)
        // para el calculo en Y
        const y = amountToPixel(amounts[index], amounts)

        return `${x},${y}`
      })
      .join(' ')
    setPoints(newPoints)    

    // para el zero
    const newZero = amountToPixel(0, amounts) || 0
    setZero(newZero)
  }, [amounts]);


  const [showPointer, setShowPointer] = useState(false)
  const [pointerLine, setPointerLine] = useState(0)

  const untap = () => {
    setShowPointer(false)
  }
  
  const tap = (event) => {
    event.stopPropagation()
  
    // de event nos importara 2 valores target para el elemento html y manipularlo el segundo touches una lista de los eventos touch que sucedieron
    const { target, touches } = event
    setShowPointer(true)
    // console.log(target , touches);
    // para obtener el tamaño del svg
    // console.log(target.getBoundingClientRect());
    const elementWidth = target.getBoundingClientRect().width // con esto el ancho del elemento
    // console.log("ancho del elemento ",elementWidth)
    const elementX = target.getBoundingClientRect().x // con esto la posicion en x desde la que comienza el elemento ya que tiene un padding en linea  
    // console.log("inicio del elemento en X ",elementX)
    const touchX = touches[0].clientX // esto nos revolvera el valor en X que clickeamos pero en toda la pantalla
    // console.log("Touch en la pantalla ",touchX)
    // ahora para que nos de el valor en escala del svg multiplicamos por 300 porque es el ancho de la grafica y dividimos por el ancho del elemento
    // nota: el ancho del elemento en getBoundingClient no es exactamente 300 ya que este ancho toma medidas como puede ser el scroll bar margenes rellenos etc
    // multiplicamos por 300 para que vaya de 0 a 300 y dividimos por el ancho del elemento obtenido por el getBoundingClientReact para que sea esa escala y luego posicionamos ese punto en la linea
    const newPointerLine = ((touchX - elementX) * 300) / elementWidth
    setPointerLine(newPointerLine)
  }

  useEffect(()=>{
    // dividimos entre 300 porque es el ancho del svg
    // y multiplicamos por la longitud de los montos ya que es la division que estamos tomando sobre los 30 ultimos montos que tomamos en cuenta
    const index = Math.abs(Math.ceil((pointerLine / 300) * amounts.length))
    if (index <= 0 || index >= amounts.length + 1) return
    const amountLabel = amounts[index - 1]    
    const amountSelected = amountLabel.toFixed(2)
    selectedDay({ indiceAmount: (index - 1), amountLabel: amountSelected })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pointerLine])

  return (
    <div className="graphicsvg">
      {/* <!-- {{ pointerLine }} --> 
    <!--inicia en 0 0 y tiene 300 de ancho y 200 final-->  @touchstart="tap" v-on:touchmove="tap" @touchend="untap"  */}
      <svg viewBox="0 0 300 200" 
        onTouchStart={tap}
        onTouchEnd={untap}
        onTouchMove={tap}
      >
        {/* // <!--Esta seria la linea central gris en medio del grafico -> usamos la funcion computada para mostrar el valor en el eje y en el que tengamos 0 Bs --> x1="0" v-bind:y1="zero" x2="300" :y2="zero"*/}
        <line
          stroke="#c6c6c6"
          strokeWidth="2"
          x1="0"
          y1={zero}
          x2="300"
          y2={zero}          
        />
        {/* <!--Esta seria la linea que mostrara la grafica sobre las ganancias--> */}
        {/* <polyline
          fill="none"
          stroke="#006666 "
          strokeWidth="2"
          points="0,0 100,100 200,100 300,200"
        /> */}
        <polyline fill="none" stroke="#006666 " strokeWidth="2" points={points} />
        {/* <!--Esta seria la linea vertical que se mostrara si seleccionamos en algun lugar del grafico--> v-show="showPointer"*/}
        {
          showPointer && (
            <line
              stroke="#638D25 "
              strokeWidth="2"
              x1={pointerLine}
              y1="0"
              x2={pointerLine}
              y2="200"
            />
          )
        }
      </svg>
      <p>Ultimos 30 dias</p>
    </div>
  );
}
