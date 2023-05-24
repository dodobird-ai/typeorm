"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Feature_1 = require("./entity/Feature");
describe("column kinds > geometry column", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mssql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("geometry column with SRID defined should be saved without error for valid WKT input", () => Promise.all(connections.map(async (connection) => {
        const featureRepository = connection.getRepository(Feature_1.FeatureWithSRID);
        // save a new feature
        const feature = new Feature_1.FeatureWithSRID();
        feature.name = "feature";
        feature.shape = "POINT (828365.16700000037 823377.14699999988)";
        await featureRepository.save(feature);
        // load and check if createdAt was a value set by us
        const loadedfeature = await featureRepository.findOneBy({
            id: feature.id,
        });
        (0, chai_1.expect)(loadedfeature).to.be.not.empty;
        (0, chai_1.expect)(loadedfeature.name).to.be.eql("feature");
        (0, chai_1.expect)(loadedfeature.shape).to.be.eql("POINT (828365.16700000037 823377.14699999988)");
    })));
    it("geometry column with SRID defined should be updated without error for valid WKT input", () => Promise.all(connections.map(async (connection) => {
        const featureRepository = connection.getRepository(Feature_1.FeatureWithSRID);
        // save a new feature
        const feature = new Feature_1.FeatureWithSRID();
        feature.name = "feature";
        feature.shape = "POINT (828365.16700000037 823377.14699999988)";
        await featureRepository.save(feature);
        // load and check if createdAt was a value set by us
        const loadedfeature = await featureRepository.findOneBy({
            id: feature.id,
        });
        (0, chai_1.expect)(loadedfeature).to.be.not.empty;
        (0, chai_1.expect)(loadedfeature.name).to.be.eql("feature");
        (0, chai_1.expect)(loadedfeature.shape).to.be.eql("POINT (828365.16700000037 823377.14699999988)");
        feature.shape = "POINT (728365.16700000037 723377.14699999988)";
        await featureRepository.save(feature);
        // load and check if createdAt is a date (generated by db)
        const updatedfeature = await featureRepository.findOneBy({
            id: feature.id,
        });
        (0, chai_1.expect)(updatedfeature).to.be.not.empty;
        (0, chai_1.expect)(updatedfeature.name).to.be.eql("feature");
        (0, chai_1.expect)(updatedfeature.shape).to.be.eql("POINT (728365.16700000037 723377.14699999988)");
    })));
    it("geometry column with no SRID should be saved without error for valid WKT input", () => Promise.all(connections.map(async (connection) => {
        const featureRepository = connection.getRepository(Feature_1.FeatureWithoutSRID);
        // save a new feature
        const feature = new Feature_1.FeatureWithoutSRID();
        feature.name = "feature";
        feature.shape = "POINT (0 0)";
        await featureRepository.save(feature);
        // load and check if createdAt is a date (generated by db)
        const loadedfeature = await featureRepository.findOneBy({
            id: feature.id,
        });
        (0, chai_1.expect)(loadedfeature).to.be.not.empty;
        (0, chai_1.expect)(loadedfeature.name).to.be.eql("feature");
        (0, chai_1.expect)(loadedfeature.shape).to.be.eql("POINT (0 0)");
    })));
    it("geometry column with no SRID should be updated without error for valid WKT input", () => Promise.all(connections.map(async (connection) => {
        const featureRepository = connection.getRepository(Feature_1.FeatureWithoutSRID);
        // save a new feature
        const feature = new Feature_1.FeatureWithoutSRID();
        feature.name = "feature";
        feature.shape = "POINT (0 0)";
        await featureRepository.save(feature);
        // load and check if createdAt is a date (generated by db)
        const loadedfeature = await featureRepository.findOneBy({
            id: feature.id,
        });
        (0, chai_1.expect)(loadedfeature).to.be.not.empty;
        (0, chai_1.expect)(loadedfeature.name).to.be.eql("feature");
        (0, chai_1.expect)(loadedfeature.shape).to.be.eql("POINT (0 0)");
        feature.shape = "POINT (0.5 0.5)";
        await featureRepository.save(feature);
        // load and check if createdAt is a date (generated by db)
        const updatedfeature = await featureRepository.findOneBy({
            id: feature.id,
        });
        (0, chai_1.expect)(updatedfeature).to.be.not.empty;
        (0, chai_1.expect)(updatedfeature.name).to.be.eql("feature");
        (0, chai_1.expect)(updatedfeature.shape).to.be.eql("POINT (0.5 0.5)");
    })));
});
//# sourceMappingURL=geometry-column.js.map