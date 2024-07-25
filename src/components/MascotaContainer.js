export const MascotaContainer = ({ edad, nombre, goToInfo, setCkecker }) => {
    return (
        <div className="frame-2" onClick={setCkecker}>
            <div className="text-wrapper-3">{edad} años</div>
            <div className="text-wrapper-4">{nombre}</div>
            <button onClick={goToInfo}>ver datos</button>
        </div>
    );
}