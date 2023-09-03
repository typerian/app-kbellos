import { useState } from "react";
const Hero = () => {
  const [scrolling, setScrolling] = useState(false);
  const handleButtonClick = () => {
    setScrolling(true);
    const windowHeight = window.innerHeight;
    const scrollToPosition = windowHeight / 1;

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth", // Opcional: agrega un desplazamiento suave
    });

    setTimeout(() => {
      setScrolling(false);
    }, 1000); // Restablece el estado después de 1 segundo (ajusta según tus necesidades)
  };
  return (
    <div
      className="hero min-h-screen shadow-2xl"
      style={{ backgroundImage: "url(images/hero.jpg)" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="fontStyle background-animate mb-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text p-4 text-7xl font-bold text-transparent">
            Kbellos & Styles
          </h1>
          <p className="mb-5">
            Kbellos & Styles ofrece cortes de pelo para hombre y mujer,
            aplicación tintes, peinados, tratamientos capilares y más. Lucy
            tiene más de 10 años de experiencia como estilista profesional y se
            especializa en crear looks personalizados para resaltar la belleza
            natural de cada cliente.
          </p>
          <button
            onClick={handleButtonClick}
            className={`btn btn-primary ${
              scrolling ? "cursor-wait" : "cursor-pointer"
            }`}
          >
            Ver Servicios
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
