from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pyswip import Prolog

# Inicializar FastAPI
app = FastAPI()

# Inicializar Prolog
prolog = Prolog()
prolog.consult("sistema_experto.pl")  # Asegúrate de que la ruta sea correcta

#hechos: juego(Nombre, Plataforma, Desarrolladora, Genero, Jugadores, EdadMinima, Año, CriticasPositivas, CriticasNeutrales, CriticasNegativas)

# Definir el esquema de datos que el endpoint recibirá
class RecomendacionRequest(BaseModel):
    plataforma: str
    genero: str
    jugadores: int
    edad: str
    desarrolladora: str = None
    year: int = 2024
    criticas_positivas: int = None
    criticas_neutrales: int = None
    criticas_negativas: int = None

#Se peuden agregar mas atributos demas como desarrolladora, criticas positivas, criticas neutrales y criticas negativas
#aunque no se estan usando porq la consulta de prolog no las usa igual

@app.post("/recomendar/")
async def recomendar_juego(datos: RecomendacionRequest):
    # Mapeo de edades
    edad_map = {
        'E (Todo público)': 0,
        '7+': 7,
        '12+': 12,
        '16+': 16,
        '18+': 18
    }

    # Convertir la edad textual al valor numérico
    edad = edad_map.get(datos.edad, 0)
   

    # Construir la consulta para Prolog considerando todos los parámetros
    consulta = (f"recomendar_juego(Juego, '{datos.plataforma}', '{datos.genero}', "
                f"{datos.jugadores}, {edad}, {datos.year})")
    print(consulta)
    try:
        # Ejecutar la consulta en Prolog
        resultados = list(prolog.query(consulta))

        if resultados:
            juegos = [res["Juego"] for res in resultados]
            return {
                "criterios": datos.dict(),
                "juegos_recomendados": juegos
            }
        else:
            return {
                "criterios": datos.dict(),
                "juegos_recomendados": []
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar consulta: {str(e)}")
