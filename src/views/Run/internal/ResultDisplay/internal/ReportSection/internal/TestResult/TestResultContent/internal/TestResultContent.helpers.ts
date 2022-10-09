import { TestPredicate } from '@/benchttp/tests'

export const getPredicateSymbol = (predicate: TestPredicate): string => {
  switch (predicate) {
    case 'EQ':
      return '='
    case 'GT':
      return '>'
    case 'GTE':
      return '>='
    case 'LT':
      return '<'
    case 'LTE':
      return '<='
    case 'NEQ':
      return '!='
  }
}
