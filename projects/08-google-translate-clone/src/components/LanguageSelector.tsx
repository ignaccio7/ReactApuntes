
import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type Language, SectionType, type fromLanguage } from '../types.d'
import React, { type FC } from 'react'
// FC -> Function Component
// De esta manera lo que estamos haciendo que es propio de react 
// es decirle que el componente los parametros que esta usando son los que colocamos en Props
// es como colocar -> const numbers: Array<number> = [1,2,3]
// interface Props {
//     onChange: (language: Language) => void
// }

// type Props =
//     | { type: 'from', value: fromLanguage, onChange: (language: fromLanguage) => void }
//     | { type: 'to', value: Language, onChange: (language: Language) => void }

type Props =
    | { type: SectionType.From, value: fromLanguage, onChange: (language: fromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>

            {/* {type === 'from' && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>} */}
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}

            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, language]) => {
                    return (<option value={key} key={key}>
                        {
                            language
                        }
                    </option>)
                })
            }
        </Form.Select>
    )
}