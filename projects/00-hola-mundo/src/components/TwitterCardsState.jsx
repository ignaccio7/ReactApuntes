
import { TwitterFollowCardState } from "./TwitterFollowCardState";

import { useState } from "react";

export function TwitterCardsState() {

    const formatUserName = (username) => `@${username}`;

    //cada vez que se reenderiza un componente se vuelve a renderizar el componente . Si es un padre reenderiza a todos los hijos
    let [ name, setName ] = useState("noe");
    let [ count, setCount ] = useState(0);

    const handleClick = () => {
        //ni bien cambie una variable en el estado del padre se renderiza todos los hijos
        //NOTA se puede apreciar que si bien se renderiza el componente hijo si react no detecta cambio en el VirtualDOM no renderiza este en el DOM real
        setCount(count+1);
        console.log("click",count);
        setName("midudev");
    };

    return (
        <section className="App">
            <h3 style={{ color: "#fff" }}>With State</h3>
            {/* <TwitterFollowCardState
                name="noe"
                username='noe'
                formatUserName={formatUserName}
                initialIsFollowing={false}
            >                        
            </TwitterFollowCardState>

            <TwitterFollowCardState
                name="judas"
                username='judas'
                formatUserName={formatUserName}
                initialIsFollowing
            >                        
            </TwitterFollowCardState> */}

            <TwitterFollowCardState
                name={name}
                username={name}
                formatUserName={formatUserName}
                initialIsFollowing={false}
            >
            </TwitterFollowCardState>

            <TwitterFollowCardState
                name="judas"
                username='judas'
                formatUserName={formatUserName}
                initialIsFollowing
            >
            </TwitterFollowCardState>

            <button style={{ cursor: "pointer" }} onClick={handleClick}>Change Noe to midudev</button>

        </section>
    );
}

