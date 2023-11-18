
import { TwitterCardStateFor } from "./TwitterCardStateFor";

export function TwitterCardsStateFor() {

    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Ángel Durán',
            isFollowing: true
        },
        {
            userName: 'pheralb',
            name: 'Pablo H.',
            isFollowing: false
        },
        {
            userName: 'PacoHdezs',
            name: 'Paco Hdez',
            isFollowing: true
        },
        {
            userName: 'TMChein',
            name: 'Tomas',
            isFollowing: false
        }
    ]

    return (
        <>
            <h3 style={{ color: "#fff" }}>With For</h3>
            <section className="App">
                {/* <TwitterCardStateFor
                    username="abc"
                    name="abc"
                    initialIsFollowing={false}
                ></TwitterCardStateFor>
                <TwitterCardStateFor
                    username="utf"
                    name="utf"
                    initialIsFollowing={true}
                ></TwitterCardStateFor> */}
                {users.map(user => {
                    return (
                        <TwitterCardStateFor
                            key={user.userName}
                            username={user.userName}
                            name={user.name}
                            initialIsFollowing={user.isFollowing}
                        ></TwitterCardStateFor>
                    )
                })}
            </section>
        </>
    );
}

