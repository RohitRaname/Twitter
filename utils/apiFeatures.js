class QueryMethods {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //   remember one thing you can do anything you just need to start you are badass rohit just start you win

  countDocuments() {
    this.countDocument = this.query.countDocuments();
    return this;
  }

  filter() {
    // just simply filter the data
    const queryObj = { ...this.queryString };

    if (Object.keys(queryObj).length === 0) return this;

    const nonFilter = ['page', 'limit', 'sort', 'fields'];

    nonFilter.forEach((el) => delete queryObj[el]);

    let add$ToQueryObj = queryObj;

    // this is e escape as i dont know how to do regex
    add$ToQueryObj = JSON.stringify(queryObj);
    add$ToQueryObj = add$ToQueryObj.replace(
      // (/\bsmall\b/g, "test"
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );
    add$ToQueryObj = JSON.parse(add$ToQueryObj);

    this.query = this.query.find(add$ToQueryObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortFilter = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(`${sortFilter}`);
    } else {
      this.query = this.query.sort('-createAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  pagination() {
    const limit = Number(this.queryString.limit) || Number(process.env.LIMIT);
    const page = Number(this.queryString.page) || Number(process.env.PAGE);
    const skipDocs = (page - 1) * limit;

    this.query = this.query.skip(skipDocs).limit(limit);
    return this;
  }
}

module.exports = QueryMethods;
