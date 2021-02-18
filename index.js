const { getOptions } = require("loader-utils");

function extractString(value, content, map, meta) {
    return new Promise((resolve, reject) => {
        if (typeof value === "string") {
            resolve(value);
        } else if (value === null || value === undefined) {
            resolve("");
        } else if (typeof value.then === "function") {
            value.then(x => extractString(x, content, map, meta).then(resolve).catch(reject));
            if (typeof value.catch === "function") {
                value.catch(reject);
            }
        } else if (typeof value === "function") {
            const output = value(content, map, meta, (err, x) => {
                if (err) {
                    reject(err);
                } else {
                    extractString(x, content, map, meta).then(resolve).catch(reject);
                }
            });
            if (output !== undefined) {
                extractString(output, content, map, meta).then(resolve).catch(reject);
            }
        } else {
            resolve(JSON.stringify(value));
        }
    });
}

module.exports = function(content, map, meta) {
    const callback = this.async();
	const options = getOptions(this);

	const { prepend, append } = options;
    Promise.all([
        extractString(prepend, content, map, meta),
        extractString(append, content, map, meta),
    ])
    .then(([prepend, append]) => callback(null, prepend + content + append, map, meta))
    .catch(err => callback(err));
}