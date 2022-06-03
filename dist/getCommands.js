export var ECmds;
(function (ECmds) {
    ECmds["SET_CITY"] = "-c";
    ECmds["SET_TOKEN"] = "-t";
    ECmds["HELP"] = "-h";
    ECmds["SET_LANG"] = "-l";
})(ECmds || (ECmds = {}));
export function getCommands() {
    const res = {
        [ECmds.SET_CITY]: null,
        [ECmds.HELP]: null,
        [ECmds.SET_TOKEN]: null,
        [ECmds.SET_LANG]: null,
    };
    const [executer, file, ...rest] = process.argv;
    rest.forEach((value, index, array) => {
        if (Object.prototype.hasOwnProperty.call(res, value)) {
            if (array[index + 1]) {
                res[value] = array[index + 1];
            }
            else {
                if (value !== ECmds.HELP) {
                    res[value] = undefined;
                }
            }
        }
        else {
            res[value] = undefined;
        }
    });
    return res;
}
