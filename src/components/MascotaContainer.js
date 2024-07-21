export const MascotaContainer = ({ edad, nombre }) => {
    return (
        <div className="frame-2">
            <div className="text-wrapper-3">{edad} años</div>
            <div className="text-wrapper-4">{nombre}</div>
        </div>
    );
}