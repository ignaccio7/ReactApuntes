const Button = ({ children, color, size }) => {
  return <button 
  style={{ color, 
    fontSize: size === 'xl' ? '32px' : '16px' }} 
  >
    {children}
  </button>
}

// sino siguieramos el principio de Liskov un problema seria 
// que enves de size le ponemos isBig
// export const RedButton = ({ children, isBig })=>{
//   return(
//     <Button color='red' size={isBig ? 'xl' : 'md'} >
//       {children}
//     </Button>
//   )
// }

// // imaginemos un componente
// <div>
//   <RedButton isBig={true}>
//     Mi Boton que funciona
//   </RedButton>
//   // que pasa si queremos poner 
//   <Button isBig={true}> entonces aqui petaria
//     Mi Boton que funciona
//   </Button>
// </div>


export const RedButton = ({ children, size })=>{
  return(
    <Button color='red' size={size} >
      {children}
    </Button>
  )
}

de esta manera si funcionaria
asi si cambiamos el Button por RedButton entonces sabemos que 
si no petaria
