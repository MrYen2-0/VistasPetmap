export default class Blurrer {
    static blur(ref) {
        if (ref.current) {
            ref.current.style.filter = 'blur(5px';
        }
    }

    static unBlur(ref) {
        if (ref.current) {
            ref.current.style.filter = 'none';
        }
    }
}