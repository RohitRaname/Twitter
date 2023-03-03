/* eslint-disable camelcase */
module.exports =
  (fn,return_back) =>
 async (...args) => {
    try {
     return await fn(...args);
    } catch (err) {
      if(return_back) return false;
       throw err;
    }
  };
