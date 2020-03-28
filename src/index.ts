import * as P from 'parser-ts/lib/Parser'
import * as C from 'parser-ts/lib/char'
import * as S from 'parser-ts/lib/string'
import { run } from 'parser-ts/lib/code-frame'
import { pipe } from 'fp-ts/lib/pipeable'

function isLetter(c: string) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
}

function isOneNine(c: string) {
  return c >= '1' && c <= '9'
}

function isDigit(c: string) {
  return c >= '0' && c <= '9'
}

function isHexDigit(c: string) {
  return isDigit(c) || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F')
}

const letter = P.expected(P.sat(isLetter), 'a letter')

const digit: P.Parser<C.Char, C.Char> = P.expected(P.sat(isDigit), 'a digit')

const onenine: P.Parser<C.Char, C.Char> = P.expected(P.sat(isOneNine), 'a number between 1-9')

const hexDigit: P.Parser<C.Char, C.Char> = P.expected(P.sat(isHexDigit), 'a hex digit')

const escapeCharacter = P.expected(
  C.oneOf('/\\ntubfr"') as P.Parser<string, '/' | '\\' | 'b' | 'f' | 'n' | 'r' | 't' | 'u' | '"'>,
  'a valid escape character'
)

const doubleQuote = P.expected(C.char('"'), 'a double quote')

const notDoubleQuote = P.expected(C.notChar('"'), 'not a double quote')

const unicode = pipe(
  P.many(hexDigit),
  P.chain(a => (a.length === 4 ? P.succeed(a) : P.cut<string, never>(P.expected(P.fail(), 'a hex digit')))),
  P.chain(x => {
    let n: number
    let r = 0
    for (let i = 0; i < x.length; ++i) {
      n = parseInt(x[i], 16)
      r = (r << 4) | n
    }
    return P.succeed(String.fromCharCode(r))
  })
)

const escape: P.Parser<string, string> = pipe(
  C.char('\\'),
  P.chain(() => P.cut(escapeCharacter)),
  P.chain(a => {
    switch (a) {
      case '"':
        return P.succeed('"')
      case 'b':
        return P.succeed('\b')
      case 'f':
        return P.succeed('\f')
      case 'n':
        return P.succeed('\n')
      case 'r':
        return P.succeed('\r')
      case 't':
        return P.succeed('\t')
      case 'u':
        return unicode
      default:
        return P.succeed(a)
    }
  })
)

const characters = P.many(P.either(escape, () => notDoubleQuote))

const string = pipe(
  doubleQuote,
  P.chain(() => characters),
  P.chain(s => P.parser.chain(doubleQuote, () => P.succeed(s)))
)

const digits: P.Parser<C.Char, string> = P.expected(
  P.either(S.fold([digit, C.many1(digit)]), () => digit),
  'digits'
)

const integer = P.expected(pipe(S.fold([S.maybe(C.char('-')), digits])), 'an integer')

const sign = P.expected(S.maybe(C.oneOf('+-')), 'a sign')

const exponent = S.maybe(S.fold([C.oneOf('eE'), sign, digits]))

const fraction = S.maybe(S.fold([C.char('.'), digits]))

const number = P.parser.map(S.fold([integer, fraction, exponent]), s => +s)

import * as E from 'fp-ts/lib/Either'

E.fold(console.error, s => console.log(s))(run(number, '00'))
E.fold(console.error, s => console.log(s))(run(number, '0.55'))
E.fold(console.error, s => console.log(s))(run(number, '0.055'))
E.fold(console.error, s => console.log(s))(run(number, '0.00000155'))
E.fold(console.error, s => console.log(s))(run(number, '0.000001550'))
E.fold(console.error, s => console.log(s))(run(number, '-0'))
E.fold(console.error, s => console.log(s))(run(number, '1e5'))
E.fold(console.error, s => console.log(s))(run(number, '1e-005'))
E.fold(console.error, s => console.log(s))(run(number, '123.456e-789'))
