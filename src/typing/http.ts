import { Digit } from './digit'

export type HTTPCode = `${Extract<Digit, 1 | 2 | 3 | 4 | 5>}${Digit}${Digit}`
