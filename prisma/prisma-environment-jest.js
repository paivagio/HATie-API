const NodeEnvironment = require("jest-environment-node").default;
const { execSync } = require("child_process");
const { resolve } = require("path");

require("dotenv").config({
    path: resolve(__dirname, "..", ".env.test"),
});

class CustomEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
        this.connectionString = `${process.env.DATABASE_URL}`;
    }

    setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;

        //execSync(`yarn prisma migrate dev`);
    }

    async teardown() { }
}

module.exports = CustomEnvironment;