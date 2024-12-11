from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pyswip import Prolog
from fastapi.middleware.cors import CORSMiddleware



# Inicializar FastAPI
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # * para cualquier origen, o sino la URL de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar Prolog
prolog = Prolog()
prolog.consult("sistema_expertoV2.pl")  # Asegúrate de que la ruta sea correcta

#hechos: juego(Nombre, Plataforma, Desarrolladora, Genero, Jugadores, EdadMinima, Año, CriticasPositivas, CriticasNeutrales, CriticasNegativas)

# Definir el esquema de datos que el endpoint recibirá
class RecomendacionRequest(BaseModel):
    plataforma: str  # Cadena de texto, corresponde a "playstation"
    genero: str      # Cadena de texto, corresponde a "aventura"
    calificacion: int  # Número entero, corresponde a "5"
    edad: str        # Cadena de texto, corresponde a "12+"
    year: int = 2012
    


#Se peuden agregar mas atributos demas como desarrolladora, criticas positivas, criticas neutrales y criticas negativas
#aunque no se estan usando porq la consulta de prolog no las usa igual
@app.get("/top-10-juegos/")
async def obtener_top_10_juegos():
    consulta = "top_10_juegos_mejores(ListaTop10)"
    try:
        # Ejecutar la consulta en Prolog
        resultados = list(prolog.query(consulta))
        if resultados:
            # Extraer la lista de juegos
            juegos_top_10 = resultados[0]["ListaTop10"]
            return {
                "top_10_juegos": juegos_top_10
            }
        else:
            return {
                "top_10_juegos": []
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar consulta: {str(e)}")

@app.post("/recomendar/")
async def recomendar_juego(datos: RecomendacionRequest):
    # Mapeo de edades
    edad_map = {
        'E (Todo público)': 0,
        '7+': 7,
        '10+': 10,
        '12+': 12,
        '16+': 16,
        '18+': 18
    }

    # Convertir la edad textual al valor numérico
    edad = edad_map.get(datos.edad, 0)

    # Construir la consulta para Prolog considerando todos los parámetros
    consulta = (f"recomendar_juego(Juego, '{datos.genero}', '{datos.plataforma}', "
                f"{datos.calificacion}, {edad}, {datos.year})")
    
    print(f"Consulta enviada a Prolog: {consulta}")

    try:
        # Ejecutar la consulta en Prolog
        resultados = list(prolog.query(consulta))

        if resultados:
            juegos = [res["Juego"] for res in resultados]
            juegos_unicos = list(set(juegos))  # Eliminar duplicados
            return {
                "criterios": datos.dict(),
                "juegos_recomendados": juegos_unicos
            }
        else:
            return {
                "criterios": datos.dict(),
                "juegos_recomendados": []
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al procesar consulta: {str(e)}")
