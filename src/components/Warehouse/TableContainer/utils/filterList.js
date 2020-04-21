import normalize from './normalize'

/* NOTE:
    since I'm from Brazil my alphabet has accentuated characters
    therefore the filter is aware of it and behaves to accordingly

    Instead of removing non-matching items I separate them
    So whoever uses this fn can choose to ignore or use them

    e.g.
    'a' will match 'a', 'á', 'à', 'ã', etc...
    'ã' will only match 'ã'
 */

function filterList(list, value = '.') {
  const key = value == normalize(value) ? 'normalized' : 'product'
  const regex = new RegExp(value, 'ig')
  const filteredIn = []
  const filteredOut = []

  for (const i of list) {
    i[key].search(regex) >= 0 ? filteredIn.push(i) : filteredOut.push(i)
  }

  return [filteredIn, filteredOut]
}

export default filterList
