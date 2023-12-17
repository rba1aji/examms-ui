export const APP_LOGO = 'https://cdn-icons-png.flaticon.com/512/5511/5511365.png';

export function displayDDMMYYYHHMMSS(time) {
    if (time) {
        const isoString = new Date(time)?.toISOString();
        const isoDate = isoString.split('T')[0];
        const isoTime = isoString.split('T')[1]?.split('.')[0];
        const [y, m, d] = isoDate.split('-');
        const formattedDate = `${d}-${m}-${y}`;
        const formattedDateTime = `${formattedDate} ${isoTime}`;
        return formattedDateTime;
    }
}

export function displayDDMMYYY(time) {
    if (time) {
        const isoString = new Date(time)?.toISOString();
        const isoDate = isoString.split('T')[0];
        const [y, m, d] = isoDate.split('-');
        const formattedDate = `${d}-${m}-${y}`;
        return formattedDate;
    }
}

export const attendanceConfig = {
    P: { value: 'Present', color: 'green' },
    A: { value: 'Absent', color: 'red' },
    O: { value: 'On Duty', color: 'blue' },
    W: { value: 'Withdraw', color: 'darkblue' },
    '-': { value: 'Nil', color: 'black' }
};


export const numToRoman = (num) => {
    if (num) {
        const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        return roman[num];
    }
}

export function formateDob(dob) {
    dob = new Date(dob);
    return ('0' + dob.getDate()).slice(-2) + "/" + ('0' + (dob.getMonth() + 1)).slice(-2) + "/" + dob.getFullYear();
}


export const inputFormateDateTime = (val) => {
    // 1679713380000 to yyyy-mm-ddThh:mm
    const date = new Date(val - 19800000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
}

export const outputFormateDateTime = (val) => {
    // minus 5.5 hours
    //1679713380000 to dd-mm-yyyy, hh:mm AM/PM
    const date = new Date(val - 19800000);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    let hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return day + "/" + month + "/" + year + ", " + hour + ":" + minute + " " + ampm;
}

export const outputFormateTime = (val) => {
    // 1679713380000 to hh:mm AM/PM
    const date = new Date(val - 19800000);
    let hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return hour + ":" + minute + " " + ampm;
}

export const outputFormateStartEndDateTime = (start, end) => {
    if (outputFormateDateTime(start) === outputFormateDateTime(end))
        return outputFormateDateTime(start) + " - " + outputFormateTime(end);
    else
        return outputFormateDateTime(start) + " - " + outputFormateDateTime(end);
}

export const numbersToWords = (n) => {
    if (n) {
        const marksInWords = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN"]
        return (n + "").split("")?.map((i) => marksInWords[i] + " ")
    }
    return '-';
}
