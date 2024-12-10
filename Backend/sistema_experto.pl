% hechos: juego(Nombre, Plataforma, Desarrolladora, Genero, Jugadores, EdadMinima, Año, CriticasPositivas, CriticasNeutrales, CriticasNegativas)

juego('The Last of Us', 'PlayStation', 'Naughty Dog', 'Aventura/RPG', 1, 17, 2013, 95, 4, 1).
juego('Minecraft', 'Multiplataforma', 'Mojang Studios', 'Sandbox', 10, 3, 2011, 90, 7, 3).
juego('FIFA 24', 'Multiplataforma', 'EA Sports', 'Deportes', 4, 3, 2024, 80, 15, 5).
juego('God of War', 'PlayStation', 'Santa Monica Studio', 'Aventura/Acción', 1, 18, 2018, 92, 5, 3).
juego('Among Us', 'Multiplataforma', 'Innersloth', 'Social/Deducción', 10, 7, 2018, 85, 10, 5).


%Consulta de prueba:
%recomendar_juego(Juego, 'PlayStation', 'Aventura/RPG', 1, 17, 2012).

% Regla para buscar juegos según plataforma
es_para_plataforma(Juego, Plataforma) :-
    juego(Juego, Plataforma, _, _, _, _, _, _, _, _).

% Regla para buscar juegos según género
es_del_genero(Juego, Genero) :-
    juego(Juego, _, _, Genero, _, _, _, _, _, _).

% Regla para buscar juegos según la cantidad de jugadores
es_para_jugadores(Juego, JugadoresDeseados) :-
    juego(Juego, _, _, _, Jugadores, _, _, _, _, _),
    Jugadores >= JugadoresDeseados.

% Regla principal que combina criterios para recomendar un juego
recomendar_juego(Juego, Plataforma, Genero, Jugadores, Edad, Anio) :-
    es_para_plataforma(Juego, Plataforma),
    es_del_genero(Juego, Genero),
    es_para_jugadores(Juego, Jugadores),
    juego(Juego, _, _, _, _, EdadMinima, AnioJuego, _, _, _),
    Edad >= EdadMinima,
    Anio - AnioJuego =< 5. % Juegos lanzados en los últimos 5 años
