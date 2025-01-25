export const mapFormToICourse = (data) => {
    return {
        title: getString(data.get('title')),
        courseNr: getNumber(data.get('courseNr')),
        lengthDays: getNumber(data.get('lengthDays')),
        onSite: getBool(data.get('onSite')),
        remote: getBool(data.get('remote')),
        startDate: getNumber(data.get('startDate')),
        price: getNumber(data.get('price')),
        imgUrl: '../src/assets/images/no-img.png',
    };
};
const getString = (str) => {
    return str !== null ? str : '';
};
const getNumber = (nr) => {
    return nr !== null ? nr : '0';
};
const getBool = (str) => {
    return str !== null ? 'Ja' : 'Nej';
};
