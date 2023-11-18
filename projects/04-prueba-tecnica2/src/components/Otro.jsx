
// que pasaria si solo quisieramos usar el customHook del image

import { useCatImage } from "../hooks/useCatImage"

export function Otro(){
    const {urlImage} = useCatImage({ fact:'Aleatorio lorem ipsum ab' })
    return(
        <div>
        {
            urlImage !== '' &&
            <img src={urlImage} alt="otro" style={{maxWidth:'100%'}}/>
        }         
        </div>
    )
}

