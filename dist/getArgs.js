export default function getArgs() {
    const res = {
        "-s": null,
        "-h": null
    };
    const [executer, file, ...rest] = process.argv;
    rest.forEach((value, index, array) => {
        if (res.hasOwnProperty(value)) {
            if (array[index + 1]) {
                res[value] = array[index + 1];
            }
            else {
                res[value] = undefined;
            }
        }
    });
    return res;
}
