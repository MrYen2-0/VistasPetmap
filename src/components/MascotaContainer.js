export const MascotaContainer = ({ edad, nombre, goToInfo }) => {
    return (
        <div className="frame-2" onClick={goToInfo}>
            <div className="text-wrapper-3">{edad} años</div>
            <div className="text-wrapper-4">{nombre}</div>
        </div>
    );
}