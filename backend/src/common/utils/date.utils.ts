export class DateUtils {
    static toMysqlDateTime (jsDateTime = new Date()) : string {
        const pad = (n: number) => n.toString().padStart(2, '0');
        
        const mysqlYearFormat = `${jsDateTime.getFullYear()}-${pad(jsDateTime.getMonth() + 1)}-${pad(jsDateTime.getDate())}`;
        const mysqlTimeFormat = `${pad(jsDateTime.getHours())}:${pad(jsDateTime.getMinutes())}:${pad(jsDateTime.getSeconds())}`;

        return `${mysqlYearFormat} ${mysqlTimeFormat}`;
    }
}