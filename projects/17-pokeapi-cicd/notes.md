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