# json-parser-ts

**WIP**

# Links

- [The JavaScript Object Notation (JSON) Data Interchange Format (RFC7159)](https://tools.ietf.org/html/rfc7159)
- [JSON.org](https://www.json.org/json-en.html)
- [JSON grammar in McKeenan form](https://www.crockford.com/mckeeman.html)

# TODO

- [ ] `json`

  - [ ] `element`

- [ ] `value`

  - [ ] `object`
  - [ ] `array`
  - [ ] `string`
  - [ ] `number`
  - [ ] `"true"`
  - [ ] `"false"`
  - [ ] `"null"`

- [ ] `object`

  - [ ] `'{' ws '}'`
  - [ ] `'{' members '}'`

- [ ] `members`

  - [ ] `member`
  - [ ] `member ',' members`

- [ ] `member`

  - [ ] `ws string ws ':' element`

- [ ] `array`

  - [ ] `'[' ws ']'`
  - [ ] `'[' elements ']'`

- [ ] `elements`

  - [ ] `element`
  - [ ] `element ',' elements`

- [ ] `element`

  - [ ] `ws value ws`

- [x] `string`

  - [x] `'"' characters '"'`

- [x] `characters`

  - [x] `""`
  - [x] `character characters`

- [x] `character`

  - [x] `'0020' . '10FFFF' - '"' - '\'`
  - [x] `'\' escape`

- [x] `escape`

  - [x] `'"'`
  - [x] `'\'`
  - [x] `'/'`
  - [x] `'b'`
  - [x] `'f'`
  - [x] `'n'`
  - [x] `'r'`
  - [x] `'t'`
  - [x] `'u' hex hex hex hex`

- [x] `hex`

  - [x] `digit`
  - [x] `'A' . 'F'`
  - [x] `'a' . 'f'`

- [x] `number`

  - [x] `integer fraction exponent`

- [x] `integer`

  - [x] `digit`
  - [x] `onenine digits`
  - [x] `'-' digit`
  - [x] `'-' onenine digits`

- [x] `digits`

  - [x] `digit`
  - [x] `digit digits`

- [x] `digit`

  - [x] `'0'`
  - [x] `onenine`

- [x] `onenine`

  - [x] `'1' . '9'`

- [x] `fraction`

  - [x] `""`
  - [x] `'.' digits`

- [x] `exponent`

  - [x] `""`
  - [x] `'E' sign digits`
  - [x] `'e' sign digits`

- [x] `sign`

  - [x] `""`
  - [x] `'+'`
  - [x] `'-'`

- [ ] `ws`
  - [ ] `""`
  - [ ] `'0020' ws`
  - [ ] `'000A' ws`
  - [ ] `'000D' ws`
  - [ ] `'0009' ws`
