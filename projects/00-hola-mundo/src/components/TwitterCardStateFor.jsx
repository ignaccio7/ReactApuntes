
import { useState } from "react";

export function TwitterCardStateFor({ username = "unknow",  name="unknow", initialIsFollowing}) {

    const imageSrc = `https://unavatar.io/${username}`;
    const formatUserName = (user)=>`@${user}`;
    
    const [ isFollowing, setIstFollowing ] = useState(initialIsFollowing);

    let text = isFollowing ? "Siguiendo" : "Seguir";
    const classButton = isFollowing ? "tw-followCard-button-followed" : "tw-followCard-button-follow";

    const handleClick = ()=>{
        setIstFollowing(!isFollowing);
    };


    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img src={imageSrc} alt={`imagen de: ${name}`} className='tw-followCard-avatar'/>
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-infoUserName'>{formatUserName(username)}</span>                    
                </div>
            </header>

            <aside>
                <button className={ classButton }
                    onClick={handleClick}
                >
                    <span className="tw-followCard-button-text">{ text }</span>
                    <span className="tw-followCard-button-text-stop">Dejar de seguir</span>
                </button>
            </aside>
        </article>

    );
}

