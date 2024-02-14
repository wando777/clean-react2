import './main/config/module-alias'
import { Person } from '@/application/controller'

const person = new Person()
person.speak('Wando')
person.speak()
