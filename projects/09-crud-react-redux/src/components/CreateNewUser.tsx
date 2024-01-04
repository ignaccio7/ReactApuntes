
import { Button, Card, TextInput, Title, Badge } from "@tremor/react";
import { useUsersActions } from "../hooks/useUsersActions";
import { useEffect, useState } from "react";

export function CreateNewUser() {

    const { handleCreate } = useUsersActions()

    const [result, setResult] = useState<"ok" | "ko" | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form as HTMLFormElement)

        setResult(null)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        //las validaciones que quieras
        if (!name || !email || !github) {
            return setResult("ko")
        }

        handleCreate({ name, email, github })
        setResult("ok")
        form.reset()
    }

    useEffect(()=>{
      if (result === 'ok') {
        setTimeout(() => {
            setResult(null)
        }, 1500);
      }
    },[result])

    return (
        <Card>
            <Title> Create New User </Title>

            <form onSubmit={handleSubmit} className="mt-4">
                <TextInput
                    placeholder="Aqui el nombre"
                    name="name"
                />
                <TextInput
                    placeholder="Aqui el email"
                    name="email"
                />
                <TextInput
                    placeholder="Aqui el usuario de github"
                    name="github"
                />

                <div>
                    <Button
                        type="submit"
                        className="mt-4"
                    >
                        Crear el usuario
                    </Button>
                    <span>
                        { result === 'ok' && <Badge color='green'>Guardado Correctamente</Badge> }
                        { result === 'ko' && <Badge color="red">Faltan datos</Badge>}
                    </span>
                </div>

            </form>
        </Card>
    )
}
