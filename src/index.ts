/**
 * 字符串：snake_case => camelCase
 */
export function snakeToCamelStr(str: string): string {
    return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * 字符串：camelCase => snake_case
 */
export function camelToSnakeStr(str: string): string {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

/**
 * 对象所有 key：snake_case => camelCase
 */
export function snakeToCamelObj<T>(input: T): T {
    if (Array.isArray(input)) {
        return input.map(snakeToCamelObj) as unknown as T;
    } else if (input !== null && typeof input === "object") {
        return Object.fromEntries(
            Object.entries(input).map(([key, value]) => [
                snakeToCamelStr(key),
                snakeToCamelObj(value),
            ])
        ) as T;
    }
    return input;
}

/**
 * 对象所有 key：camelCase => snake_case
 */
export function camelToSnakeObj<T>(input: T): T {
    if (Array.isArray(input)) {
        return input.map(camelToSnakeObj) as unknown as T;
    } else if (input !== null && typeof input === "object") {
        return Object.fromEntries(
            Object.entries(input).map(([key, value]) => [
                camelToSnakeStr(key),
                camelToSnakeObj(value),
            ])
        ) as T;
    }
    return input;
}