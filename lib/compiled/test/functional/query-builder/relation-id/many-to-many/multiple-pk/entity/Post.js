"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
const Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const JoinTable_1 = require("../../../../../../../src/decorator/relations/JoinTable");
const PrimaryColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryColumn");
const Category_1 = require("./Category");
let Post = class Post {
    constructor() {
        this.isRemoved = false;
    }
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "authorId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "isRemoved", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, (category) => category.posts),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "subcategories", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map