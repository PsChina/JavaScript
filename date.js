function getDayWithDate(input) {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (isLeapYear(year)) {
                return 29;
            }
            return 28;
        default:
            return undefined;
    }
}

function isLeapYear(year) {
    if ((year % 4 === 0) && (year % 100 !== 0)) {
        return true;
    } else if (year % 400 === 0) {
        return true;
    }
}

function makeAllDaysWithTimeRange(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const A_DAY = 1000 * 3600 * 24;
    const res = []
    if (endDate < startDate) {
        return res
    }
    if (endDate - startDate <= A_DAY) {
        res.push(`${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`)
        return res
    }
    const startDateTime = startDate.getTime();
    const endDateTime = endDate.getTime();
    for (let temp = 0; startDateTime + temp <= endDateTime; temp += A_DAY) {
        const time = new Date(startDateTime + temp);
        res.push(`${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`)
    }
    return res;
}

