import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants"

// con esto decimos que de este objeto tenemos las llaves de los lenguajes soportados en nuestra constante
export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE

// de esta manera le decimos al fromLanguage que puede ser auto|es|en|.... -> ya que el texto que escribimos al inicio el idioma puede ser detectable
export type fromLanguage = Language | AutoLanguage

export interface State {
    fromLanguage: fromLanguage,
    toLanguage: Language,
    fromText: string,
    result: string,
    loading: boolean
}

// export type Action = {
//     type : string,
//     payload: any
// }

export type Action =
  |  { type : 'SET_FROM_LANGUAGE', payload: fromLanguage }
  |  { type : 'INTERCHANGE_LANGUAGES' }
  |  { type : 'SET_TO_LANGUAGE', payload: Language }
  |  { type : 'SET_FROM_TEXT', payload: string }
  |  { type : 'SET_RESULT', payload: string }


// el enum seria como una forma como si fuera un diccionario al cual nos vamos a poder referir en cualquier parte y es una constante
export enum SectionType {
  From = 'from',
  To = 'to'
}
