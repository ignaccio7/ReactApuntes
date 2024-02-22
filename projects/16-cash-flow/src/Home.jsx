import { useContext, useEffect, useState } from "react";
import { Header } from "./components/Tags";
import Movements from "./components/movements";
import Resume from "./components/resume";
import { ModalContext } from "./context/modal";
import Modal from "./components/modal";
import { useMovements } from "./hooks/useMovements";

export default function Home() {
  const { showModal } = useContext(ModalContext);

  const [showMovements, setShowMovements] = useState(false);

  const { movements, totalAmount, deleteMovement, createMovement } =
    useMovements();

  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    // console.log(movements);
    // return movements.map(mov=>mov.amount)

    // con esto obtenemos los movimientos de los ultimos 30 dias
    const lastDays = movements
      .filter((movement) => {
        // sacamos la fecha de hoy
        const today = new Date();
        // sacamos la fecha hace 30 dias atras -> con getDate obtenemos el numero del dia de la fecha
        const oldDay = today.setDate(today.getDate() - 30);
        return movement.time > oldDay;
      })
      .map((movement) => movement.amount);

    // lo que tendria que pasar esque si nosotros tenemos un gasto el dia1 de -100 y dia2 de -200 entonces para la grafica debemos pasar como si el dia2 fuera -300
    // asi tenemos que ir sumando los valores
    const results = [];
    lastDays.forEach((mov, index) => {
      let sum = results[index - 1] || 0;
      results[index] = mov + sum;
    });

    setAmounts(results)

  }, [movements]);

  const [indiceAmount, setIndiceAmount] = useState()
  const [amountLabel, setAmountLabel] = useState('')

  const selectedDay = ({ indiceAmount, amountLabel }) => {
    setIndiceAmount(indiceAmount)
    setAmountLabel(amountLabel)
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <Header />
        </header>
        <main className="resume">
          <Resume totalAmount={totalAmount} amounts={amounts} indiceAmount={indiceAmount} amountlabel={amountLabel} selectedDay={selectedDay} movements={movements}/>
        </main>
        <section className={`movements ${showMovements ? "show" : ""}`}>
          <div
            className="grip"
            onClick={() => {
              setShowMovements(!showMovements);
            }}
          ></div>
          <Movements movements={movements} deleteMovement={deleteMovement} />
        </section>
      </div>
      {showModal && <Modal create={createMovement} />}
    </>
  );
}
