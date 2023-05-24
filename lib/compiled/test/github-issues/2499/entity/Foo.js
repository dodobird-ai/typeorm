"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "description", void 0);
Foo = tslib_1.__decorate([
    (0, Entity_1.Entity)("foo")
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map