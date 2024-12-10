from pyswip import Prolog
import tkinter as tk
from tkinter import messagebox

# Cargar el sistema experto en Prolog
prolog = Prolog()
prolog.consult("sistema_experto.pl")  # Asegúrate de que este archivo existe y tiene los hechos y reglas

# Función para obtener recomendaciones
def recomendar():
    plataforma = plataforma_var.get()
    genero = genero_var.get()
    jugadores = int(jugadores_var.get())
    edad_texto = edad_var.get()
    
    # Mapeo de edades
    edad_map = {
        'E (Todo público)': 0,   # Sin restricción de edad
        '7+': 7,
        '12+': 12,
        '16+': 16,
        '18+': 18
    }

    # Obtener la edad mínima recomendada
    edad = edad_map.get(edad_texto, 0)  # Si no encuentra, toma 0 como valor por defecto
    
    anio_actual = 2010  # Suponemos el año actual
    
    # Consulta a Prolog
    query = f"recomendar_juego(Juego, '{plataforma}', '{genero}', {jugadores}, {edad}, {anio_actual})"
    resultados = list(prolog.query(query))
    
    if resultados:
        juegos = "\n".join([res["Juego"] for res in resultados])
        messagebox.showinfo("Recomendación", f"Juegos recomendados:\n{juegos}")
    else:
        messagebox.showinfo("Recomendación", "No se encontraron juegos que cumplan los criterios.")


# Interfaz gráfica
ventana = tk.Tk()
ventana.title("Recomendador de Videojuegos")

# Etiquetas y menús de selección para la plataforma
tk.Label(ventana, text="¿En qué plataforma prefieres jugar?").pack()
plataforma_var = tk.StringVar()
plataforma_var.set("PlayStation")  # Valor por defecto
plataformas = ['PlayStation', 'Multiplataforma', 'PC', 'Xbox', 'Nintendo']
tk.OptionMenu(ventana, plataforma_var, *plataformas).pack()

# Etiquetas y menús de selección para el género
tk.Label(ventana, text="¿Qué tipo de género prefieres?").pack()
genero_var = tk.StringVar()
genero_var.set("Aventura/RPG")  # Valor por defecto
generos = ['Aventura/RPG', 'Sandbox', 'Deportes', 'Aventura/Acción', 'Social/Deducción']
tk.OptionMenu(ventana, genero_var, *generos).pack()

# Etiquetas y menús de selección para la cantidad de jugadores
tk.Label(ventana, text="¿Cuántos jugadores van a jugar?").pack()
jugadores_var = tk.StringVar()
jugadores_var.set("1")  # Valor por defecto
jugadores_opciones = ['1', '2', '3', '4', '5', '10']
tk.OptionMenu(ventana, jugadores_var, *jugadores_opciones).pack()

# Etiquetas y menús de selección para la edad mínima recomendada
tk.Label(ventana, text="¿Qué rango de edad prefieres?").pack()
edad_var = tk.StringVar()
edad_var.set("E (Todo público)")  # Valor por defecto
edades = ['E (Todo público)', '7+', '12+', '16+', '18+']
tk.OptionMenu(ventana, edad_var, *edades).pack()

# Botón para recomendar el juego
tk.Button(ventana, text="Recomendar", command=recomendar).pack()

# Ejecutar la interfaz gráfica
ventana.mainloop()
