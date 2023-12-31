
import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

// con ?: indicamos que puede ser una propiedad de tipo opcional y los valores que puede tomar es en el From undefinedn y en el To un booleano
// type Props = 
//   | { type: SectionType.From, loading ?: undefined, onChange: (value: string) => void, value:string }
//   | { type: SectionType.To, loading ?: boolean, onChange: (value: string) => void, value: string}

interface Props {
    type: SectionType
    loading?: boolean,
    onChange: (value: string) => void,
    value: string
}

const commonStyles = { height: '200px', resize: 'none' }
const getPlaceholder = ({type, loading} : { type: SectionType, loading ?: boolean }) => {
    if(type === SectionType.From) return 'Introducir Texto'
    if(loading === true) return 'Cargando...'
    return 'Traduccion'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {

    const styles = type === SectionType.From
        ? commonStyles
        : { ...commonStyles, backgroundColor: '#f5f5f5' }

    const handleChange = ( event: React.ChangeEvent<HTMLTextAreaElement> )=>{    
        onChange(event.target.value)
    }

    return (
        <Form.Control
            as='textarea' // Que elemento quiero renderizar que es de ReactBootstrap
            autoFocus={type === SectionType.From ? true : false}
            placeholder={getPlaceholder({ type, loading })}
            style={styles}
            disabled={type === SectionType.To}
            value={value}
            onChange={handleChange}
        />
    )
}