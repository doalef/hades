import chalk from 'chalk';
import onHeaders from 'on-headers';
import onFinished from 'on-finished';

let getStatusColor = (code) => {
    if (code >= 200 && code <= 299) return 'green';
    if (code >= 300 && code <= 399) return 'blue';
    if (code >= 500 && code <= 599) return 'red';
    return 'yellow'
}

export default (req, res, next) => {
    var starts = process.hrtime();
    let time, diff;

    onHeaders(res, function onHeaders () {
      diff = process.hrtime(starts)
      time = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2) + 'ms';
    })
    onFinished(res, function (err, res) {
        // data is read unless there is err
        let { statusCode } = res;
        let s = "   ";
        let cc = getStatusColor(statusCode);

        // console.log(
        //     chalk[cc](statusCode) +
        //     s +
        //     chalk.cyan(req.method) +
        //     " " +
        //     decodeURI(req.originalUrl) +
        //     " " +
        //     ".".repeat(90  - time.length  - req.method.length) +
        //     " " +
        //     time
        // );
      });
    next();
}