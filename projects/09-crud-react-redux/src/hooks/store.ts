
import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// con esto ya tipamos con ayuda de react redux y ts y ya no usariamos useSelector sino useAppSelector en ListOfUsers y de esta manera
// nosotros estariamos añadiendo una capa de abstraccion mas a nuestra aplicacion
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch : () => AppDispatch = useDispatch

// si es que usaramos js igual lo deberiamos hacer
// export const useAppSelector = useSelector
// export const useAppDispatch = useDispatch

// porque si basicamente siemrep vamos usando el useSelector el useDispatch en nuestos
// componentes estariamos teniendo una dependencia muy bestia en nuestro comopnente y sera muy dificil pasar digamos de redux a zustand