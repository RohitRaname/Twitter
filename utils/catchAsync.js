module.exports = (fn) => (req, res, next,pass=false) => {
  // fn is async function which return promise
  // function execution is same as synchronous code due to use of await

  fn(req, res, next).catch(next);
};
