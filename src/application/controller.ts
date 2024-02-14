export class Person {
  speak(name?: string): void {
    console.log(`Hello, ${name?.toUpperCase() ?? 'World'} !!!`)
  }
}
