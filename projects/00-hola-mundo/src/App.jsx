
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

import { ChildrenComponent } from './components/ChildrenComponent';
import { TwitterCardsState } from './components/TwitterCardsState';
import { TwitterCardsStateFor } from './components/TwitterCardsStateFor';

const format = (username) => `@${username}`;

let elementProp = <span>{"el" + "em"}</span>;

const objectProp = {
    username: "hola",
    name: "hola",
    formatUserName: format
};

export function App() {
    return (
        // <article style={{display:'flex', color:'#fff', alignItems:'center'}}>
        // <article className='tw-followCard'> 
        //     <header className='tw-followCard-header'>
        //         <img src="https://unavatar.io/midudev" alt="midu"className='tw-followCard-avatar'/>
        //         <div className='tw-followCard-info'>
        //             <strong>Miguel Angel Duran</strong>
        //             <span className='tw-followCard-infoUserName'>@midudev</span>
        //         </div>
        //     </header>

        //     <aside>
        //         <button className='tw-followCard-button'>Seguir</button>
        //     </aside>
        // </article>


        // <>
        //     <TwitterFollowCard username="midudev" name="Miguel Duran" />
        //     <TwitterFollowCard username="pheralb" name="Pablo Hernandez" />
        //     <TwitterFollowCard username="elonmusk" name="Elon Musk" />
        //     <TwitterFollowCard username="vxender" name="Vander Hert" />
        // </>

        /* isFollowing es un booleano */
        // <section className='App'>
        //     <TwitterFollowCard username="midudev" name="Miguel Duran" isFollowing={true} />
        //     <TwitterFollowCard username="pheralb" name="Pablo Hernandez" isFollowing={false} />
        //     <TwitterFollowCard username="elonmusk" name="Elon Musk" />
        //     <TwitterFollowCard username="vxender" name="Vander Hert" />
        // </section>

        /*podemos enviar de una manera mas corta asi enviamos el valor true como prop*/
        // <section className='App'>
        //     <TwitterFollowCard username="midudev" name="Miguel Duran" isFollowing />
        //     <TwitterFollowCard username="pheralb" name="Pablo Hernandez" isFollowing={false} />
        //     <TwitterFollowCard username="elonmusk" name="Elon Musk" isFollowing />
        //     <TwitterFollowCard username="vxender" name="Vander Hert" isFollowing />
        // </section>

        /* como enviar funciones a travez de props arriba ya la declaramos antes del return */
        // <section className='App'>
        //     <TwitterFollowCard 
        //         formatUserName={format} 
        //         username="midudev" 
        //         name="Miguel Duran" 
        //         isFollowing 
        //     />
        //     <TwitterFollowCard 
        //         formatUserName={format} 
        //         username="pheralb" 
        //         name="Pablo Hernandez" 
        //         isFollowing={false} 
        //     />
        //     <TwitterFollowCard 
        //         formatUserName={format} 
        //         username="elonmusk"
        //          name="Elon Musk" 
        //          isFollowing 
        //     />
        //     <TwitterFollowCard 
        //         formatUserName={format} 
        //         username="vxender" 
        //         name="Vander Hert"
        //         isFollowing 
        //     />
        // </section>

        //tambien podemos pasar elementos ya que react renderiza elementos y los componentes son funciones que nos devuelven un elemento
        <section className='App'>
            <TwitterFollowCard
                formatUserName={format}
                username="midudev"
                name="Miguel Duran"
                isFollowing
                element={<span>elem</span>}
            />
            <TwitterFollowCard
                formatUserName={format}
                username="pheralb"
                name="Pablo Hernandez"
                isFollowing={false}
                element={elementProp}
            />
            <TwitterFollowCard
                formatUserName={format}
                username="elonmusk"
                name="Elon Musk"
                isFollowing
            />
            <TwitterFollowCard
                formatUserName={format}
                username="vxender"
                name="Vander Hert"
                isFollowing
            />

            <TwitterFollowCard
                {...objectProp}
            >
            </TwitterFollowCard>

            <ChildrenComponent>
                <span style={{ color: "white", fontSize: "15px" }}>Children</span>
                <TwitterFollowCard
                    formatUserName={format}
                >
                </TwitterFollowCard>
            </ChildrenComponent>

            <TwitterCardsState></TwitterCardsState>

            <TwitterCardsStateFor></TwitterCardsStateFor>

        </section>

    )
}