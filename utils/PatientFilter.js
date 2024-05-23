class PatientFilter {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        const deleteArea = ["keyword", "page", "limit"]
        deleteArea.forEach(item => delete queryCopy[item])

        this.query = this.query.find(queryCopy)
        return this;
    }

    pagination(resultPerPage) {
        const activePage = this.queryStr.page || 1
        const skip = resultPerPage * (activePage - 1)
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this;
    }

}

module.exports = PatientFilter;