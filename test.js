function deepCopy(target, map = new Map()) {
  if (target !== null && typeof target === 'object') {
    let cloneTarget = map.get(target);
    if (cloneTarget) {
      return cloneTarget;
    }
    cloneTarget = Array.isArray(target) ? [] : {};
    map.set(target, cloneTarget);
    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = deepCopy(target[key], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
const obj = {
  a: { name: 'a' },
};
// const o = {};
obj.a = '2';
const res = deepCopy(obj);
console.log(res);
