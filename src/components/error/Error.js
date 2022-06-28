import error from "./error.gif"

const Error = () => {
    return (
        <div>
            <img style={{display: "block", width: "250px", height: "250px", objectFit: "contain", margin: "0 auto"}} src={error} alt="Ошибка" />
        </div>
    );
};

export default Error;