"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeToCamelStr = snakeToCamelStr;
exports.camelToSnakeStr = camelToSnakeStr;
exports.snakeToCamelObj = snakeToCamelObj;
exports.camelToSnakeObj = camelToSnakeObj;
/**
 * 字符串：snake_case => camelCase
 */
function snakeToCamelStr(str) {
    return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}
/**
 * 字符串：camelCase => snake_case
 */
function camelToSnakeStr(str) {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}
/**
 * 对象所有 key：snake_case => camelCase
 */
function snakeToCamelObj(input) {
    if (Array.isArray(input)) {
        return input.map(snakeToCamelObj);
    }
    else if (input !== null && typeof input === "object") {
        return Object.fromEntries(Object.entries(input).map(([key, value]) => [
            snakeToCamelStr(key),
            snakeToCamelObj(value),
        ]));
    }
    return input;
}
/**
 * 对象所有 key：camelCase => snake_case
 */
function camelToSnakeObj(input) {
    if (Array.isArray(input)) {
        return input.map(camelToSnakeObj);
    }
    else if (input !== null && typeof input === "object") {
        return Object.fromEntries(Object.entries(input).map(([key, value]) => [
            camelToSnakeStr(key),
            camelToSnakeObj(value),
        ]));
    }
    return input;
}
