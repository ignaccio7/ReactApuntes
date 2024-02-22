import { useContext } from "react";
import { IconCoins } from "../../icons";
import { Button } from "../Tags";
import { ModalContext } from "../../context/modal";
import Graphic from "./Graphic";
import { useMovements } from "../../hooks/useMovements";

export default function Resume({ totalAmount, amounts, amountlabel, indiceAmount, selectedDay }) {
  const { toggleModal } = useContext(ModalContext);
  const handleClick = () => {
    toggleModal();
  };

  const { movements } = useMovements()

  const label = indiceAmount >= 0 ? movements[indiceAmount].time.toLocaleDateString()+"" : 'Total de ahorros'
  const amount = amountlabel ? amountlabel : totalAmount

  return (
    <div className="resumec">
      <header>
        <p>{label}</p>
        <h1>{amount}</h1>
      </header>
      <div className="graphic">
        <Graphic amounts={amounts} selectedDay={selectedDay}/>
      </div>
      <Button action={handleClick}>
        <IconCoins />
        Registrar Movimiento
      </Button>
    </div>
  );
}
