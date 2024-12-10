import { useState } from "react";
import SplashScreen from "../components/SplashScreen";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [formData, setFormData] = useState({
    plataforma: "PlayStation",
    genero: "Aventura/RPG",
    jugadores: "1",
    edad: "E (Todo público)",
  });
  const [resultados, setResultados] = useState([]);

  const plataformas = ["PlayStation", "Multiplataforma", "PC", "Xbox", "Nintendo"];
  const generos = ["Aventura/RPG", "Sandbox", "Deportes", "Aventura/Acción", "Social/Deducción"];
  const jugadoresOpciones = ["1", "2", "3", "4", "5", "10"];
  const edades = ["E (Todo público)", "7+", "12+", "16+", "18+"];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recomendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResultados(data.resultados || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
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

            {/* Número de jugadores */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Jugadores
              </label>
              <select
                name="jugadores"
                value={formData.jugadores}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-md p-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {jugadoresOpciones.map((jugadores) => (
                  <option key={jugadores} value={jugadores}>
                    {jugadores}
                  </option>
                ))}
              </select>
            </div>

            {/* Edad */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Edad</label>
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Recomendar
            </button>
          </form>

          {/* Resultados */}
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
    </>
  );
}
