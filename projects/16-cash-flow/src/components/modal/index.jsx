import { useContext } from "react";
import { IconClose, IconCoins } from "../../icons";
import { ModalContext } from "../../context/modal";
import { Button } from "../Tags";

export default function Modal({ create }) {
  const { toggleModal } = useContext(ModalContext);

  const closeModal = () => {
    toggleModal();
  };

  const createMovement = (event) => {
    event.preventDefault()
    // const entries = Object.entries(event.target)
    // console.log(event.target.titulo.value);
    const movement = {
      title: event.target.titulo.value,
      description: event.target.description.value,
      amount: event.target.tipo.value === 'Ingreso' ? + event.target.amount.value : - event.target.amount.value
    }
    create({ ...movement })
    toggleModal()
  }

  return (
    <div className="modal">
      <header>
        <h2>Agregar nuevo movimiento</h2>
        <a onClick={closeModal}>
          <IconClose />
        </a>
      </header>
      <div className="body">
        <form onSubmit={createMovement}>
          <label className="field">
            Titulo:
            <input
              type="text"
              placeholder="Compra, Deposito, Retiro, ..."
              autoFocus
              required
              name="titulo"
              id="titulo"
            />
          </label>
          <label className="field">
            Monto:
            <input
              type="number"
              placeholder="..., 1000, 500, 200, 100"
              required
              name="amount"
            />
          </label>
          <label className="field">
            Descripcion:
            <textarea
              rows="5"
              placeholder="Deposito a nombre de en lugar de ..."
              name="description"
            ></textarea>
          </label>
          <div className="field field--radio">
            <label>
              <input type="radio" value="Ingreso" name="tipo" defaultChecked/>
              <span>Ingreso</span>
            </label>
            <label>
              <input type="radio" value="Gasto" name="tipo" />
              <span>Gasto</span>
            </label>
          </div>
          <Button class="btn">
            <IconCoins />
            Registrar Movimiento
          </Button>
        </form>
      </div>
    </div>
  );
}
