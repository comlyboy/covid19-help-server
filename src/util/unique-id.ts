export function GenerateCustomId(length: number) {
    let _length = length;
    let timestamp = +new Date;
    let ts = timestamp.toString();
    let parts = ts.split("").reverse();
    let id = "";
    let _getRandomInt = function (min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (let i = 0; i < _length; ++i) {
        let index = _getRandomInt(0, parts.length - 1);
        id += parts[index];
    };

    return `NCDC${id}`;
};