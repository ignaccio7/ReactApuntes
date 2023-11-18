
export function TwitterFollowCard({formatUserName, username="unknow", name="unknow", isFollowing, element}){
    const imageSrc = `https://unavatar.io/${username}`;
    //mutar las props es una mala practica por defecto las props deberian ser inmutables

    return (
        <article className='tw-followCard'> 
            <header className='tw-followCard-header'>
                {/* <img src="https://unavatar.io/midudev" alt="midu" className='tw-followCard-avatar'/> */}
                <img src={imageSrc} alt={`imagen de: ${name}`} className='tw-followCard-avatar'/>
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    {/* <span className='tw-followCard-infoUserName'>@{username}</span> */}
                    <span className='tw-followCard-infoUserName'>{formatUserName(username)}</span>
                    { element }
                </div>
            </header>

            <aside>
                <button className='tw-followCard-button'>Seguir</button>
            </aside>
        </article>
    );
}
