export const mapFormToICourse = (data) => {
    return {
        title: getString(data.get('title')),
        courseNr: getNumber(data.get('courseNr')),
        lengthDays: getNumber(data.get('lengthDays')),
        onSite: getBool(data.get('onSite')),
        remote: getBool(data.get('remote')),
        startDate: getNumber(data.get('startDate')),
        price: getNumber(data.get('price')),
        imgUrl: '../../src/assets/images/no-img.png',
    };
};
export const mapFormToIUser = (data) => {
    return {
        id: getString(data.get('email')),
        name: getString(data.get('name')),
        address: getString(data.get('address')),
        mobileNr: getString(data.get('mobile')),
    };
};
const getString = (str) => {
    return str ? str : '';
};
const getNumber = (nr) => {
    return nr ? nr : '0';
};
const getBool = (str) => {
    return str ? 'Ja' : 'Nej';
};
