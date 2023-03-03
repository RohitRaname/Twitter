export const findEl = (className) => document.querySelector(`.${className}`);

export const contains = (target, className) => {
  return target.classList.contains(className);
};
export const closest = (target, className) => {
  return target.closest(`.${className}`);
};

export const addClass = (target, className) => {
  target.classList.add(className);
};
export const removeClass = (target, className) => {
  target.classList.remove(className);
};

export const replaceClass = (target, class1, class2) => {
  target.classList.replace(class1, class2);
};

export const removeArrAllElClass = (arr, className) => {
  arr.forEach((mov) => mov.classList.remove(className));
};
export const addClassToArrAllEl = (arr, className) => {
  arr.forEach((mov) => mov.classList.add(className));
};

export const toggleClass = (target, className) => {
  target.classList.toggle(className);
};

export const setActiveElInArr = (elementArr, target, className) => {
  elementArr.forEach((mov) => mov.classList.remove(className));
  target.classList.add(className);
};

export const findActiveElInArr = (arr, activeClass) => {
  return arr.find((mov) => contains(mov, activeClass));
};

export const removeAllActiveElClassInArr = (elementArr, activeClass) => {
  elementArr.forEach((mov) => mov.classList.remove(activeClass));
};
