export class Checker {
    static checkString(value) {
        return (value && value.length);
    }

    static checkStrings(values) {
        return Array.isArray(values) && values.length > 0 && !values.includes('') && !values.includes(null) && !values.includes(undefined);
    }

    static checkGmail(value) {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(value);
      }
}