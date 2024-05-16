---
Estamos probando este workflow en el proyecto **17-pokeapi-cicd**
---
# Continous integration - deployement -> con Github Actions

Con esto buscamos la automatizacion, verificacion de los cambios de codigo de varios contribuidores en un unico proyecto.

Ya que en un proyecto podriamos tener varios programadores y ellos trabajaran en alguna parte del proyecto y lo que buscamos es integrar en la pieza de software que queda y que se integre de la mejor manera correcta.
Es continua porque es un progreso que no para. Ya que si digamos alguien haria una nueva caracteristica pues a partir de eso se hace la build el test notificaciones release que es un despliegue que puede ser un despliegue a produccion o desarrollo etc.

Los pasos podria ser
1. Pasar el Lint
2. Revisar los Commints correctamente
3. Normativa de nombres
4. Construir aplicacion
5. etc

> Los workflows deben estar en la carpeta raiz del repositorio ya que sino no los reconocera. Lo bueno esque puedes tener multiples workflows

# Github Actions Makertplaace

Las acciones se pueden componer de otras acciones a la vez.
Si nosotros quisieramos hacer un checkout de nuestro proyecto podriamos buscar estos pasos en el makertplace.

1. Checkout

[Link al makertplace de github actions](https://github.com/marketplace)

En este caso usaremos este: [Checkout](https://github.com/marketplace/actions/checkout)

Por ejemplo si quisieramos traer todo el historial de nuestro proyecto o de alguno publico o con acceso podriamos agregar en los **steps**:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

2. Node

Y ya que necesitamos node para hacer la construccion (build) de nuestro proyecto.

Asi usaremos esta: [Node](https://github.com/marketplace/actions/setup-node-js-environment)

Y revisando en la pagina podemos ver la configuracion basica que nos recomienda es:

```yaml
steps:
- uses: actions/checkout@v4
- uses: actions/setup-node@v4
  with:
    node-version: 18
- run: npm ci
- run: npm test
```

> Los procesos pueden salir con codigos. Cuando es 0 esque ah ido bien. Sino es 0 algo fue mal

## Para ejecutar test End to End

Como nosotros tenemos que levantar el servidor para que puedan correr estos tests entonces lo que deberiamos hacer es ejecutar una seria de comandos para luego poder utilizar esta funcion.

Como primer paso debemos levantar el servicio “run dev, start, etc” y luego indicarle que debe esperar a que el servicio este levantado esto gracias al “wait”. 

Tenemos 2 maneras:

> Podria ser de esta manera con playwright pero necesitamos configurar mas cosas en la action no es solo hacer correr el test
> 
- De esta manera ejecutando 2 comandos o instrucciones gracias al |

```yaml
- name: Start dev React project
	run: |
    npm run dev &
    npx wait-on http://localhost:5173/
  env:
    PORT: 5173
- name: Run Playwright tests
  run: npx playwright test
```

- O tambien si lo tendriamos configurado de otra forma en el package.json y usando una action de github makertplace

De igual manera al command sera el comando que ejecutara. El start nos sirve para indicar con que comando iniciara. Y de igual manera le decimos donde esta el servidor y que espere que se levante.

```yaml
- name: E2E test
  uses: cypress-io/github-action@v2
  with:
	  command: npm run test:e2e
	  start: npm run start-test
	  wait-on: http://localhost:5000  
```

## Instalacion de dependencias

Como nosotros ya sabemos npm tiene el comando npm install para la instalacion de dependencias. Sabemos que tenemos el package-lock.json que este es un registro de las dependencias que se podria decir que esta hipervitaminado ya que contiene las versiones el orden el hash de integridad etcetera. 

Pero en Continuous integration se usa “ci” lo que hara que se base en la referencia del package-lock y porsupuesto ira mas rapido. Con menos comprobaciones ya que no tendra que calcular lo que tiene el arbol de dependencias.

```yaml
- name: Install dependencies
    run: npm install
```

```yaml
- name: Install dependencies
    run: npm ci
```
## Variables secrets and environment

Tenemos 2 maneras de tener variables en nuestro repositorio y usar estas en nuestra git action.

1. Environment 

Secretos que pueda ser por entorno. Ya que podriamos tener variables de entorno para produccion y para desarrollo

1. Repository

Secretos que puedan ser de manera general

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/e57a3346-dda6-4942-9988-415ba7d6e702/Untitled.png)

Repository secret

### Configurando una variable secreta normal

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/a58fff98-5a33-4dde-8bdb-4242c570e59b/Untitled.png)

### Configurando una variable secreta por environment

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/7210abde-c9fa-4a7c-b572-88ab82ebe64c/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/1501d076-6fbb-4cba-9d9c-8bf3ef847d40/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/f5c4c730-c498-4178-97d5-06a276ccc051/Untitled.png)

Y ya aqui configurar para evitar que cualquier persona pueda hacer un push al workflow y que se ejecute en ese entorno y crear una nueva varible ahi si quisieramos una variable x netamente para producccion.

Y podriamos sobreescribir el que creamos anteriormente.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/f25f488a-6468-4a81-b161-e0f9221ab7d6/Untitled.png)

Y ya por ultimo usar nuestras variables en nuestro workflow para que use estas para el correcto despliegue. ejem heroku.

```yaml
name: Deploy to Heroku
	uses: akhileshns/heroku-deploy@v3.12.12
	with:
		heroku_api_key: ${{secrets.HEROKU_API_KEY}}
		heroku_app_name: ${{secrets.HEROKU_APP}}
		heroku_email: ${{secrets.HEROKU_API_EMAIL}}
		healthcheck: "[https://$](https://$/){{secrets.HEROKU_APP}}.herokuapp.com/health" <- esta linea que verificara si esta corriendo
		rollbackonhealthcheckfailed: true <- y esta haria el rollback pero este es un ejemplo en heroku
```

- Esta linea de codigo: rollbackonhealthcheckfailed se llama healt check
    
    Basicamente es una ruta que basicamente lo que respondera esque funciona correctamente.
    
    Incluso cuando no funcione podriamos hacer un rollback y nos evita problemas de produccion.
    
    ```
    // esto en el app.js
    const { version } = require('./package.json')
    
    app.get('/health', (req, res) => {
    res.send('ok')
    })
    
    app.get('/version', (req, res) => {
    res.send(version)
    })
    ```
    

### Ejecutar el workflow tambien en las pull request PR

Deberiamos añadir en el escucha para la accion y los eventos en los cuales tendria que ejecutarse.

```yaml
on:
	push:
		branches: [main]
	pull_request:
		branches: [main]
		types: [opened, synchronize]
```

### Evitar que se despliegue en las pull request PR

Ahora por si cualquier motivo nosotros queremos que se ejectute el workflow pero no queremos que se realice el despliegue a produccion como podriamos cambiar eso.

Para eso existe en github actions una variable que tiene informacion acerca del evento que esta realizando.

Que es el contexto:

[Contexts - GitHub Docs](https://docs.github.com/en/actions/learn-github-actions/contexts)

```yaml
name: Deploy to Heroku
	if: ${{ github.event_name == 'push' }} <- agregamos esta linea
	uses: akhileshns/heroku-deploy@v3.12.12
	with:
		heroku_api_key: ${{secrets.HEROKU_API_KEY}}
		heroku_app_name: ${{secrets.HEROKU_APP}}
		heroku_email: ${{secrets.HEROKU_API_EMAIL}}
		healthcheck: "[https://$](https://$/){{secrets.HEROKU_APP}}.herokuapp.com/health"
		rollbackonhealthcheckfailed: true 
```

### Proteger master

Otro punto importante en las gitactions es proteger la rama principal sea **master** o main.

Tendríamos que ir a la pestaña de branches y crear una nueva regla.

1. Requerimos que el status check haya pasado antes de hacer un merge.
2. Requerir que la rama este actualizada antes de mergear.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/ba53e6b5-b657-4cbf-95aa-542e7fe08be1/Untitled.png)

### Como eliminamos builds redundantes

Tendriamos que configurar otro punto en la action. Y tambien usaremos uno de la makertplace de github actions.

[Cancel Workflow Action - GitHub Marketplace](https://github.com/marketplace/actions/cancel-workflow-action)

Asi añadiriamos el trabajo de “Cancel previous redundan builds”. Y ese token lo estaria sacando del contexto que mencionamos anteriormente.

```yaml
jobs:
  deploy:
    runs-on: ubuntu-22.04
    steps:
        - uses: actions/checkout@v4
          with:
            fetch-depth: 0
        - uses: actions/setup-node@v4
          with:
            node-version: 18
        - name: Cancel previous redundan builds
	        uses: styfle/cancel-workflow-action@0.9.1
					with:
						access-token: ${{ github.token }
```

### Como hacemos jobs en paralelo

De este codigo realizado con multiples trabajos “jobs”. Podemos realizar trabajos en paralelo e incluso esperar que algunos esperen a otros para ejecutar los siguientes.

De esta manera pasaremos de tener un workflow de esta forma:

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/a4947c89-929c-4204-bf37-e33b387338de/Untitled.png)

A pasar a uno que se asemejaria al de una arbol

El workflow sobre el que explicaremos es este:

```yaml
name: Deployment Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
    types: [opened, synchronize]

jobs:

  avoid_reduncy:
    runs-on: ubuntu-18.04
    steps:
      - name: Cancel Previous Redundant Builds
        uses: styfle/cancel-workflow-action@0.9.1
        with:
          access_token: ${{ github.token }}

  lint:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v2
        with:
          cache: 'npm'
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - name: Lint
        run: npm run eslint

  build:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v2
        with:
          cache: 'npm'
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: dist
          path: dist

  test:
    needs: [lint, build]
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v2
        with:
          cache: 'npm'
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - uses: actions/download-artifact@v2
        with:
          name: dist
          path: dist
      - name: Test
        run: npm test

  e2e:
    needs: [lint, build]
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v2
        with:
          cache: 'npm'
          node-version: '14'
      - name: Install dependencies
        run: npm ci
      - uses: actions/download-artifact@v2
        with:
          name: dist
          path: dist
      - name: E2E tests
        uses: cypress-io/github-action@v2
        with:
          command: npm run test:e2e
          start: npm run start-test
          wait-on: http://localhost:5000

  deploy:
    needs: [test, e2e]
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Deploy to Heroku
        if: ${{ github.event_name == 'push' }}
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: ${{secrets.HEROKU_APP}}
          heroku_email: ${{secrets.HEROKU_API_EMAIL}}
          healthcheck: "https://${{secrets.HEROKU_APP}}.herokuapp.com/health"
          rollbackonhealthcheckfailed: true
```

Para ver como trabajaria es de esta forma

![gitactions.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/59e8db25-e9c1-459f-ae26-0fb440c51e86/gitactions.jpg)

Y ahora ya el workflow trabajaria de esta forma

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/e3d34d6f-1878-4291-8fb3-fe54745fb023/772b6379-46b6-4d75-a417-0be5ec180da7/Untitled.png)

# Para el proyecto usaremos linter eslint

```bash
    npm i eslint -D <- este ya no es necesario ya que vite viene ya con eslint
    npm i standard -D -E  
```

Y añadimos la extension 'standard' al archivo **.eslintrc.cjs**

# Para el enrutador
```bash
    npm install react-router-dom -E
```

# Para el testing
```bash
    npm init playwright@latest
```
> Para ejecutar
```bash
    npx playwright test
```