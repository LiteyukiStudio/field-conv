# field-conv

[简体中文](./README.md) | [English](./README_EN.md)

A field converter written in TypeScript

Solves the inconsistency between API field styles and Node field styles.

Developed especially for code perfectionists.

## Installation

```bash
npm install field-conv
# or
pnpm add field-conv
# or
yarn add field-conv
```

## Usage

### String Conversion

```typescript
import { snakeToCamelStr, camelToSnakeStr } from 'field-conv';

const camelCase = snakeToCamelStr('hello_world'); // 'helloWorld'
const snakeCase = camelToSnakeStr('helloWorld'); // 'hello_world'
```

### Object Conversion (supports nested recursive conversion)

```typescript
import { snakeToCamelObj, camelToSnakeObj } from 'field-conv';

const camelCaseObj = snakeToCamelObj({ hello_world: 'value' }); // { helloWorld: 'value' }
const snakeCaseObj = camelToSnakeObj({ helloWorld: 'value' }); // { hello_world: 'value' }
```

## Best Practices

### On the client side, wrap your axios client to avoid tedious manual conversion

```typescript
import axios from "axios";
import { camelToSnakeObj, snakeToCamelObj } from "field-conv";

const axiosInstance = axios.create({
    baseURL: "https://api.example.com",
    timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
    if (config.data && typeof config.data === "object") {
        config.data = camelToSnakeObj(config.data);
    }
    if (config.params && typeof config.params === "object") {
        config.params = camelToSnakeObj(config.params);
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data && typeof response.data === "object") {
            response.data = snakeToCamelObj(response.data);
        }
        return response;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
```

### On the server side, use middleware for conversion

```typescript
import { Request, Response, NextFunction } from 'express';
import { camelToSnakeObj, snakeToCamelObj } from 'field-conv';

export function convertRequestFields(req: Request, res: Response, next: NextFunction) {
    if (req.body && typeof req.body === 'object') {
        req.body = camelToSnakeObj(req.body);
    }
    if (req.query && typeof req.query === 'object') {
        req.query = camelToSnakeObj(req.query);
    }
    next();
}
export function convertResponseFields(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send.bind(res);
    res.send = (body: any) => {
        if (typeof body === 'object') {
            body = snakeToCamelObj(body);
        }
        return originalSend(body);
    };
    next();
}
```

## Others

Some common conversion examples

```bash
# camelCase -> snake_case
HtmlContent -> html_content
UserId -> user_id

# snake_case -> camelCase
html_content -> htmlContent
user_id -> userId
```