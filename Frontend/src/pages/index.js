import { useState } from "react";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [formData, setFormData] = useState({
    plataforma: "PlayStation",
    genero: "Aventura/RPG",
    calificacion: 5,
    edad: "E (Todo público)",
    year: 2012,
  });
  const [resultados, setResultados] = useState([]);
  const [top10, setTop10] = useState([]);
  const [showTop10, setShowTop10] = useState(false);

  const plataformas = ["nintendo", "pc", "playstation", "xbox"];
  const generos = [
    "accion",
    "aventura",
    "ciencia_ficcion",
    "competencia",
    "deportes",
    "estrategia",
    "juego_de_cartas",
    "juegos_de_fantasia",
    "miscelaneos",
    "rompecabezas",
    "rpgs",
    "simulacion",
  ];
  const edades = ["E (Todo público)", "7+", "12+", "16+", "18+"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/recomendar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResultados(data.juegos_recomendados || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const fetchTop10 = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/top-10-juegos/");
      const data = await response.json();
      setTop10(data.top_10_juegos || []);
      setShowTop10(true);
    } catch (error) {
      console.error("Error fetching top 10 games:", error);
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && !showTop10 && (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col items-center justify-center px-4">
          <h1 className="text-6xl font-extrabold text-white mb-8 font-fascinate">
            Recomendador de Videojuegos
          </h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow-2xl rounded-xl max-w-lg w-full space-y-6 border-4 border-pink-500"
          >
            {/* Plataforma */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Plataforma
              </label>
              <select
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {plataformas.map((plataforma) => (
                  <option key={plataforma} value={plataforma}>
                    {plataforma}
                  </option>
                ))}
              </select>
            </div>

            {/* Género */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Género
              </label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {generos.map((genero) => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>
            </div>

            {/* Calificación */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Calificación
              </label>
              <input
                type="number"
                name="calificacion"
                value={formData.calificacion}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                min="0"
                max="100"
              />
            </div>

            {/* Edad */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Edad
              </label>
              <select
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {edades.map((edad) => (
                  <option key={edad} value={edad}>
                    {edad}
                  </option>
                ))}
              </select>
            </div>

            {/* Año */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Año
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Recomendar
            </button>
          </form>

          {resultados.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resultados.map((juego, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-blue-50 p-4 shadow-md rounded-lg text-center"
                >
                  <h3 className="text-lg font-bold text-gray-800">{juego}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <button
        onClick={fetchTop10}
        className="mt-8 w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg shadow-lg hover:from-green-700 hover:to-teal-700 transition-all"
      >
        Ver Top 10 Mejores Juegos
      </button>
      <br></br>
      {showTop10 && (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-extrabold text-white mb-8 font-fascinate">
            Top 10 Mejores Juegos
          </h1>
          <div className="bg-white p-8 shadow-2xl rounded-xl max-w-lg w-full space-y-4 border-4 border-blue-500">
            {top10.map((juego, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-100 p-4 shadow-md rounded-lg text-center"
              >
                <h3 className="text-lg font-bold text-gray-800">{juego}</h3>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowTop10(false)}
            className="mt-8 w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg shadow-lg hover:from-red-700 hover:to-pink-700 transition-all"
          >
            Volver
          </button>
        </div>
      )}
    </>
  );
}
