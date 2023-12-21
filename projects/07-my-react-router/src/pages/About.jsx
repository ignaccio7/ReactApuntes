
import { Link } from "../Link"

const i18n = {
    es: {
        title: 'Sobre Nosotros',
        button: 'Ir a inicio',
        description: '!Hola Mi nombres es Nestor y te mando un abrazo'
    },
    en: {
        title: 'About us',
        button: 'Go to home page',
        description: '!Hi My name is Nestor'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.es
}


console.log("about.jsx");

export default function AboutPage({ routeParams }) {

    const i18n = useI18n(routeParams.lang ?? 'es')

    return (
        <>
            <h1>{i18n.title}</h1>
            <p>{i18n.description}</p>
            <Link to='/'>{i18n.button}</Link>
        </>
    )
}