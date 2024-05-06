export function getCurrentDate() {
    let date = new Date();
    return (
        [
            padTwoDigits(date.getHours()),
            padTwoDigits(date.getMinutes()),
            padTwoDigits(date.getSeconds()),
        ].join(":") + " " +
        [
            date.getFullYear(),
            padTwoDigits(date.getMonth() + 1),
            padTwoDigits(date.getDate()),
        ].join("/")
    );
}

function padTwoDigits(num: number) {
    return num.toString().padStart(2, "0");
}