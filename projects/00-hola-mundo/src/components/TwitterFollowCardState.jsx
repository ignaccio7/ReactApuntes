
/*para darle funcionalidad al boton de seguir entonces creamos un estado 
que nos ayudara a definir la accion a realizar segun den o no click al boton*/
import { useState } from "react";

export function TwitterFollowCardState({ name="unknow", username="unknow", formatUserName, initialIsFollowing }){
    // console.log("Initial:",initialIsFollowing);
    //el valor inicial solo se renderiza una vez que se CREA el componente si cambiamos el valor en el componente padre este no afectara para la renderizacion -- React, el valor inicial proporcionado es solo relevante durante el primer renderizado del componente.
    //creamos nuestro estado
    const [ isFollowing, setIsFollowing ] = useState(initialIsFollowing);

    const imageSrc = `https://unavatar.io/${username}`;
    
    const text = isFollowing ? "Siguiendo" : "Seguir";
    const classButton = isFollowing ? "tw-followCard-button-followed" : "tw-followCard-button-follow";
    
    const handleClick = ()=>{
        setIsFollowing(!isFollowing);
    };
    // console.log("componentCard:"+isFollowing);
    console.log("RenderComponent",username);

    return (
        <article className="tw-followCard">
            <header className='tw-followCard-header'>
                <img src={imageSrc} alt={`imagen de: ${name}`} className='tw-followCard-avatar'/>
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-infoUserName'>{formatUserName(username)}</span>
                </div>
            </header>

            <aside>
                {/* <button className={ isFollowing ? "tw-followCard-button-followed" : "tw-followCard-button-follow" } onClick={ handleClick }>{ text }</button> */}
                <button className={ classButton } onClick={ handleClick }>
                    <span className="tw-followCard-button-text">{ text }</span>
                    <span className="tw-followCard-button-text-stop">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    );

}


