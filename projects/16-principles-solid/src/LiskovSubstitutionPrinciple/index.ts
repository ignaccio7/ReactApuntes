export class Animal{
  swim(distance: number) {
    console.log(`${distance} mts desde la orilla.`);
  }
}

export class Dog extends Animal{
  swim(distance: number): void {
    console.log(`${distance} soy un perro y nade esto`);   
  }
}

export class Cat extends Animal{
  swim(): void {
    new Error('Soy un gato y no me gusta nadar')
  }
}