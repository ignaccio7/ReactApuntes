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