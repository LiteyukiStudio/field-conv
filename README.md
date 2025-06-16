# field-conv

使用TypeScript编写的字段转换器

解决API字段风格和Node字段风格不一致的问题。

专为代码洁癖症患者开发

## 安装

```bash
npm install field-conv
# or
pnpm add field-conv
# or
yarn add field-conv
```

## 使用

字符转换

```typescript
import {snakeToCamelStr, camelToSnakeStr} from 'field-conv';

const camelCase = snakeToCamelStr('hello_world'); // 'helloWorld'
const snakeCase = camelToSnakeStr('helloWorld'); // 'hello_world'
```

对象转换(支持嵌套递归转换)

```typescript
import {snakeToCamelObj, camelToSnakeObj} from 'field-conv';
const camelCaseObj = snakeToCamelObj({hello_world: 'value'}); // {helloWorld: 'value'}
const snakeCaseObj = camelToSnakeObj({helloWorld: 'value'}); // {hello_world: 'value'}
```

## 最佳实践

在客户端，对axios client进行封装，从而避免繁琐的手动转换

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

在服务端，使用中间件进行转换

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

## 其他

一些常见的转换用例

```bash
# camelCase -> snake_case
HtmlContent -> html_content
UserId -> user_id

# snake_case -> camelCase
html_content -> htmlContent
user_id -> userId
```