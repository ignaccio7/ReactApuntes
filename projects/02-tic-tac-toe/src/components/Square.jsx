

export function Square ({ children, updateBoard, index, isSelected }) {


    const updateBoardSquare = () => {
      updateBoard(index);
    };
  
    const classSquare = isSelected ? "square is-selected" : "square"
  
    return (
      <div
        className={classSquare}
        onClick={updateBoardSquare}
      >
        {children}
      </div>
    )
  }

