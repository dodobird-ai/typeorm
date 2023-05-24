"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomColumnType = void 0;
function isCustomColumnType(type) {
    return !!(type &&
        typeof type === "object" &&
        typeof type.getDatabaseIdentifier === "function");
}
exports.isCustomColumnType = isCustomColumnType;
//# sourceMappingURL=IsCustomColumnType.js.map