export class UtilsService {
    public dateToMyString(date: Date): string {
        let result = date.getFullYear().toString();
        let month = date.getMonth() + 1;
        result += month < 10 ? '0' + month : month;
        let day = date.getDate();
        result += day < 10 ? '0' + day : day;
        let hour = date.getHours()
        result += hour < 10 ? '0' + hour : hour;
        let minute = date.getMinutes()
        result += minute < 10 ? '0' + minute : minute;
        let second = date.getSeconds()
        result += second < 10 ? '0' + second : second;
        return result;
    }

    public nowToMyString(): string {
        return this.dateToMyString(new Date());
    }

    public dateFromMyString(value: string): Date {
        while (value.length < 14) {
            value += "0";
        }
        let year = +value.substr(0,4);
        let month = +value.substr(4,2);
        let day = +value.substr(6,2);
        let hour = +value.substr(8,2);
        let minute = +value.substr(10,2);
        let second = +value.substr(12,2);
        return new Date(year, month-1, day, hour, minute, second);
    }

}