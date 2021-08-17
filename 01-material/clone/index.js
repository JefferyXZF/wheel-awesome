/**
 * 深拷贝
 * @param {*} target 
 * @param {*} map 
 * @returns 
 */
function deepClone (target, map = new WeakMap()) {

  if (target !== null && typeof target === 'object') {
      const type = Object.prototype.toString.call(target).replace(/\[object (\S+)]$/, '$1')
      const baseType = ['Number', 'Boolean', 'String', 'Arguments', 'RegExp', 'Date']
      const constuct = target.constructor

      if (baseType.includes(type)) {
          return new target.constructor(target.valueOf())
      }

      if (map.get(target)) {
          return target
      }
      map.set(target, true)

      const copyTarget = new target.constructor()

      switch(type) {
          case 'Array':
              target.forEach((item) => {
                  copyTarget.push(deepClone(item, map))
              })
              break;
          case 'Object': 
              Object.keys(target).forEach(key => {
                  copyTarget[key] = deepClone(target[key], map)
              })
              break;
          case 'Set':
              target.forEach(item => {
                  copyTarget.add(deepClone(item, map))
              })
              break;
          case 'Map':
              target.forEach((value, key) => {
                  copyTarget.set(key, deepClone(value, map))
              })
              break;
          default:
          return target
      }
      return copyTarget
  } else {
      return target
  }
}

let map = new Map()
map.set('232', 233)
map.set('ewe', 23)

let set = new Set()
set.add(323)
set.add(3223)
set.add(3123)

let test = {
a: null,
b: undefined,
num: 33,
num1: new Number(32),
str: 'ss',
str1: new String('ss'),
boo: false,
boo1: new Boolean(true),
symbol: Symbol(22),
fn: function () {console.log(33)},
obj: {
  a: 32,
  b: 323
},
set,
big: BigInt(33),
map,
date: new Date(),
reg: /[a-z]/ig,
}

test.o = test

console.log(deepClone(test))