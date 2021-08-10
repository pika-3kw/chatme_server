# Setup project

## Cài đặt thư viện cần thiết

```
$ yarn add express cors dotenv morgan socket.io

$ yarn add --dev nodemon @babel/cli @babel/core @babel/node @babel/preset-env babel-plugin-module-resolver

$ yarn add --dev --exact prettier
```

Giải thích các thư viện

## Cấu trúc project

```
chatme_server
├── node_modules
├── docs
|   └── setup.MD
├── src
|   ├── configs
|   |   └── constants.js
|   └── server.js
├── .babelrc.js
├── .env
├── .env.default
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── jsconfig.json
├── nodemon.json
├── package.json
├── README.MD
└── yarn.lock
```

## Cấu hình các công cụ

1. Prettier

Prettier là công cụ format code

```
.prettierrc.json

{
  "semi": false,
  "singleQuote": true,
  "endOfLine": "crlf",
  "overrides": [
    {
      "files": "**/*.html",
      "options": {
        "tabWidth": 4,
        "parser": "html"
      }
    }
  ]
}
```

```
.prettierignore

node_modules
build
.husky
```

```
.gitattributes

* text=auto eol=lf
```

2. Babel + jsconfig + absolute path

```
.babelrc.js

const path = require('path')
const jsConfig = require('./jsconfig.json')

module.exports = {
  presets: ['@babel/preset-env'],
  sourceMaps: true,
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(jsConfig.compilerOptions.baseUrl)],
      },
    ],
  ],
}
```

```
.jsconfig.json

{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "baseUrl": "src"
  },
  "exclude": ["node_modules"],
  "include": ["src"]
}
```

3. Nodemon

```
nodemon.json

{
  "watch": ["src"],
  "ext": ".js",
  "ignore": [],
  "exec": "babel-node ./src/server.js"
}
```

4. Dotenv

```
.env.default

PORT=4000
```

```
.configs/constants.js

import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
```

## Thiết lập script trong package.json

```
"scripts": {
  "dev": "nodemon",
  "start": "node build/server.js",
  "build": "babel ./src -d ./build",
  "format:all": "prettier --config .prettierrc.json --write src/",
  "format": "prettier --config .prettierrc.json --write"
}
```

## Code file server

```
server.js

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { PORT } from 'configs/constants'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' })
})

app.listen(PORT, () => {
  console.log('Server is running at PORT', PORT)
})
```
