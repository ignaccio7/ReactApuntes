import { useContext, useEffect, useState } from "react";
import { Header } from "./components/Tags";
import Movements from "./components/movements";
import Resume from "./components/resume";
import { ModalContext } from "./context/modal";
import Modal from "./components/modal";

export default function Home() {

  const { showModal } = useContext(ModalContext)

  const [showMovements, setShowMovements] = useState(false);

  const [movements, setMovements] = useState([
    {
      id: "1",
      title: "Compra en tienda",
      description: "Ropa",
      amount: -50.75,
      time: new Date("01-01-2024"),
    }, // de momento este no entra porque no esta entre el rango de fechas
    {
      id: "2",
      title: "Depósito",
      description: "Ingreso de salario",
      amount: 350.0,
      time: new Date("01-15-2024"),
    },
    {
      id: "3",
      title: "Retiro en cajero",
      description: "Retiro de efectivo",
      amount: -100.0,
      time: new Date("01-15-2024"),
    },
    {
      id: "4",
      title: "Pago de factura",
      description: "Electricidad",
      amount: -50.5,
      time: new Date("01-23-2024"),
    },
    {
      id: "5",
      title: "Transferencia",
      description: "Pago a amigo",
      amount: -200.0,
      time: new Date("01-25-2024"),
    },
    {
      id: "6",
      title: "Compra en línea",
      description: "Libros",
      amount: -45.99,
      time: new Date("02-03-2024"),
    },
    {
      id: "7",
      title: "Ingreso adicional",
      description: "Bonificación",
      amount: 200.0,
      time: new Date("02-08-2024"),
    },
    {
      id: "8",
      title: "Pago de préstamo",
      description: "Cuota mensual",
      amount: -75.0,
      time: new Date("02-10-2024"),
    },
    {
      id: "9",
      title: "Compra de alimentos",
      description: "Supermercado",
      amount: -65.25,
      time: new Date("02-11-2024"),
    },
    {
      id: "10",
      title: "Ingreso de reembolso",
      description: "Gastos médicos",
      amount: 50.0,
      time: new Date("02-12-2024"),
    },
    // { id: 11, title: 'Ingreso de reembolso', description: 'Gastos vGastGastosGastosGastosGastosGastosGastosGastosGastosGastosGastosGastosGastos mé', amount: 1000.0 }
  ]);

  const [totalAmount, setTotalAmount] = useState(0)

  const deleteMovement = ({ id }) => {
    const newMovementes = movements.filter((movement) => movement.id !== id);
    setMovements(newMovementes);
  };

  const createMovement = ({ title, description, amount }) => {
    const newMovement = {
      title,
      description,
      amount,
      id: crypto.randomUUID(),
      time: new Date(),
    };
    const newMovements = structuredClone(movements);
    newMovements.push(newMovement);
    setMovements(newMovements);
  };

  useEffect(()=>{
    let sum = 0
    movements.forEach(movement => {
      sum += movement.amount
    });
    sum = sum.toFixed(2)
    setTotalAmount(sum)
  },[movements])

  return (
    <>
      <div className="container">
        <header className="header">
          <Header />
        </header>
        <main className="resume">
          <div>
            <Resume totalAmount={totalAmount}/>
          </div>
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
