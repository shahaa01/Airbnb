class ExpressErr extends Error {
    constructor(status = 500, message = "Something went wrong, we are extemely sorry!", redirectLink = "/airbnbClone") {
        super();
        this.message = message;
        this.status = status;
        this.redirectLink = redirectLink;
    }
}

module.exports = ExpressErr;