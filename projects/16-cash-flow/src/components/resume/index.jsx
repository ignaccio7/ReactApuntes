import { useContext } from "react";
import { IconCoins } from "../../icons";
import { Button } from "../Tags";
import { ModalContext } from "../../context/modal";

export default function Resume({ totalAmount }) {

  const { toggleModal } = useContext(ModalContext)
  const handleClick = () => {    
    toggleModal()
  }

  return (
    <div className="resumec">
      <header>
        <p>Total de ahorros</p>
        <h1>{totalAmount}</h1>
      </header>
      <div className="graphic">Grafico</div>
      <div className="action-register">
        <Button action={handleClick}>
          <IconCoins/>
          Agregar movimiento
        </Button>
      </div>
    </div>
  );
}
