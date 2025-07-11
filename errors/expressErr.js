class ExpressErr extends Error {
    constructor(status = 500, message = "Something went wrong, we are extremely sorry!", redirectLink = "/listing") {
        super();
        this.message = message;
        this.status = status;
        this.redirectLink = redirectLink;
    }
}

module.exports = ExpressErr;