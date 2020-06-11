import normalize from './normalize'

function normalizeList(list) {
  return list.map((item) => ({...item, normalized: normalize(item.product)}))
}

export default normalizeList
