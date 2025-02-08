# Principios SOLID en React

Solid es un acronimo donde cada letra representa un principio con POO pero aunque en su dia estaba pensado para POO se ah podido llevar a otro tipo de diseño de software con progra funcional etc.

Nose lo lleva de la forma mas pura pero si que se puede

## Single responsibility principle (SRP)
Cada clase debe tener una sola responsabilidad. Lo que quiere decir esque aveces tenemos una clase que hace muchas cosas
Por ejemplo la clase user que se puede encargar de cambiar cuentas de los registros etc.
Tambien se puede ver con los componentes si tenemos un componente que haga muchas cosas.

## Open closed principle (OCP)
Basicamente las entidades que tengamos en nuestro software tienen que estar abiertas para extender pero cerradas para ser modificadas
Una cosa que tiene es que cuando queremos añadir que una parte de nuestro software un componente tenga que renderizar algo diferente
enves de modificar el componente y quiza provocar que deje de funcionar entonces esto se deberia poder extender desde fuera para asi
no modificar lo que tiene dentro.
Basicamente abierto a extension pero cerrado a modificacion

## Liskov substitution principle (LSP)
Basicamente es que un objeto que sea un subtipo de objeto deberia poder ser sustituible por un objeto del objeto que hereda. 
Si tenemos una clase animal o perro deberian poder ser intercambiables porque al final si la clase perro esta heredando de animal deberia funcionar.
El subtitpo se deberia poder sustituir con el tipo sin ningun problema.

## Interface segregation principle (ISP)
Los clientes no deberian depender de interfaces que no necesitan.
Podria darse un ejemplo de componentes que reciben todo el objeto entero pero si el componente no usa todas las propiedades del objeto
entonces no es necesario pasarselo. Asi el contrato que requiere el componente sera muy grande y cuando queramos cambiar tendriamos que pasar
todo tal cual y seria menos extensible.
En resumen es evitar enviar informacion que nose necesite.

## Dependency inversion principle (DIP)
Deberiamos hacer que nuestros componentes dependan de abstracciones y no de implementaciones concretas.
Lo que se quiere lograr esque tengamos clases o funciones o componentes que independientemente de cualquier lugar que pasemos
no importa de donde contal de que cumplamos el contrato no cambie la funcianlidad y no pete la aplicacion.
Basicamente es la inyeccion de dependencias

https://konstantinlebedev.com/solid-in-react/
https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898