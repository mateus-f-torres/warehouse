function sortList(list, key) {
  if (key.startsWith('!')) {
    list.sort(fromHighestToLowest(key.slice(1)))
  } else {
    list.sort(fromLowestToHighest(key))
  }
}

function fromLowestToHighest(key) {
  return function (a, b) {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

function fromHighestToLowest(key) {
  return function (a, b) {
    if (a[key] > b[key]) {
      return -1
    } else if (a[key] < b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

export default sortList
