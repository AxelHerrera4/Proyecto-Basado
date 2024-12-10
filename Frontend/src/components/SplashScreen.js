import { useState, useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Esto activa el efecto de desvanecimiento
      setTimeout(() => onFinish(), 600); // Después del desvanecimiento, se ejecuta onFinish
    }, 2600); // Mantener el splash screen por 2.6 segundos

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white animate-pulse">
          Recomendador de Videojuegos
        </h1>
        <p className="mt-4 text-2xl text-white opacity-90">
          Descubre tus juegos favoritos
        </p>
        <div className="mt-6">
          <div className="w-20 h-20 border-4 border-white border-dashed rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
