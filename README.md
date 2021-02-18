# append-prepend-loader

[![npm: append-prepend-loader][1]][2]
[![License][3]][4]

Loader for Webpack to append and prepend text to files. The only one that still works.

## Installation

- With `npm`:
```cmd
npm i --save-dev append-prepend-loader
```

- With `yarn`:
```cmd
yarn add --dev append-prepend-loader
```

## Usage

**webpack.config.js**

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "append-prepend-loader",
                        options: {
                            prepend: "console.log('Top');",
                            append: "console.log('Bottom');",
                        }
                    },
                ]
            },
        ]
    }
};
```

`append` and `prepend` can be one of the `T`:

 - `string`
 - function: `(content: string, map: SourceMap, meta: Meta) => T`
 - asynchronous function: `(content: string, map: SourceMap, meta: Meta) => Thenable<T>`
 - callback function: `(content: string, map: SourceMap, meta: Meta, callback: (error, result) => void) => void`
 - `Thenable<T>`
 - `object` (which will be converted to json)

 **More complex example:**
 ```js
{
    loader: "append-prepend-loader",
    options: {
        prepend: async (content) => {
            const header = await foo(content);
            return header.trim();
        },
        append: (content, map, meta, callback) => {
            baz(content, footer => callback(null, footer.trim()))
        },
    }
}
 ```


[1]: https://img.shields.io/npm/v/append-prepend-loader?cacheSeconds=3600
[2]: https://www.npmjs.com/package/append-prepend-loader

[3]: https://img.shields.io/github/license/Kir-Antipov/append-prepend-loader.svg?style=flat&label=License&cacheSeconds=3600
[4]: https://raw.githubusercontent.com/Kir-Antipov/append-prepend-loader/master/LICENSE.md
