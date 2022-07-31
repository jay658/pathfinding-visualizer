
// let anotherName: string
// let isStudent: boolean
// let age: number
// let hobbies: string[]
// let role: [number, string]

type Person = {
  name: string;
  age?: number
}

let person: Person

person = {
  name:'john'
}

let lotsOfPeople: Person[] //array of people with type Person


let ageExample: number | string //can be either types

let any:any //can be any type, but is not recommended to use this
let unknown:unknown //if we do not know the type, can be any type -- USE THIS.

let printName: (name:string) => void //VOID returns undefined, can use NEVER which doesnt return anything.

// function printName (name:string) {
//   console.log(name)
// }


export {}