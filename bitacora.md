# Bitacora

Aprendimos diferentes metodos para ordenar un array, con for, while y mas, yo investigue el metodo de la burbuja, lo comprendi, pero busque la manera mas sencilla de organizar los elementos y encontre la formula sort, que permite organizar los elementos de un array de menor a mayor, es mucho mas sencillo que hacerlo con un for, pero no lo utilizamos en el trabajo porque el profesor quiere que aprendamos a hacerlo con for, while y mas, para entender mejor como funcionan los algoritmos, de esta manera puedo entender mejor como funciona el algoritmo de la burbuja y como puedo aplicarlo en otros proyectos

const numeros = [3,2,7,1,0];
numeros.sort((a,b) => a - b); //numeros de menor a mayor
numeros.sort((a,b) => b - a); // numeros de mayor a menor

cosas que aprendi en el camino:
let es un estado = puede cambiar, const es una constante = no puede variar
For = para, le pido que lea la constante venta de ventas, venta son los valores individuales de toda la lista, mientras que ventas es la lista completa
El error de antes fue en el cierre de la funcion y colocar totalVendido en la sumatoria del total en ves de llamar a ValorVenta
Para ver el resultado en consola debo de llamar a la funcion, en este caso a unidadesVendidas, antes no salia porque estaba era llamando a la variable let TotalUnidades y esa variable solo vive adentro
¿Por qué daba NaN? en el ciclo puse ventas.cantidad con s, ventas en plural es la lista completa y los arreglos no tienen .cantidad sino .length entonces daba undefined, y cuando sumas 0 + undefined da NaN, tenia que ser venta.cantidad en singular
por que en elegirAlAzar(lista) uso lista si no existe afuera: lista es un parametro osea un comodin, no existe afuera sino que es el nombre que le doy a lo que le meta a la funcion entre parentesis, si le meto ciudades lista vale ciudades y si le meto PRODUCTOS lista vale PRODUCTOS, asi reutilizo la misma funcion y no hago dos iguales, ademas como esta funcion solo hace un calculo directo de Math.random y lee la posicion [posicion] no usa ningun for y no recorre nada, su trabajo siempre es 1 sola operacion sin importar si la lista tiene 4 o 100000 cosas, osea que es tiempo constante O(1)

La venta mayor con el ejemplo de la baraja:
Primero miramos si existen ventas con if(ventas.length === 0) si no devuelve null, si no fue el caso continua
en ves de ventas esto es una baraja y vamos a comparar la carta de mayor valor
para eso primero miramos si tenemos baraja con el if de antes, luego creamos una variable let mayor la cual tomara la primera carta y la usara de referencia
digamos que salio 1 en la primera carta bueno let mayor la tendra almacenada, luego mirar toda la baraja con el for of
si al mirar de nuevo la baraja sale una carta mayor al 1 digamos 4 let mayor cambia su valor de 1 a 4
y asi se repite hasta que la baraja se acabe y quedamos con la carta en este caso ventas de mayor valor


## Diccionario de datos
id: numero de cada venta
fecha: cuando se vendio en formato año-mes-dia como 2026-09-01
cliente: el codigo de la persona que compro como C01
producto: lo que compro, sea cafe como Origen Huila 500 g o accesorios como Prensa francesa
ciudad: donde se entrego, viene con errores de mayusculas como Medellín y medellín
cantidad: cuantas unidades llevo, puede venir en 0 si no compro nada
precio: cuanto vale cada unidad en pesos


## Casos borde
1. si filtramos un dia que no tiene ventas viene un array vacio [] y no se puede romper el codigo ni dar NaN tiene que dar 0
2. la venta que tiene cantidad 0 como la de cali id 8 esa no suma dinero y para el ticket promedio no se cuenta como venta efectiva
3. las ciudades que vienen escritas en minuscula o con espacios como medellín y Medellín


## Registro de errores de la gerente

Error 1: Bogota o Medellin salia dos veces
- Sintoma: en el resumen de ventas por ciudad aparecia la misma ciudad dos veces en la tabla
- Entrada que lo produce: las ventas donde una ciudad esta en mayuscula como Medellín y otra en minuscula como medellín
- Hipotesis: javascript compara las letras exactas entonces para el programa Medellín con M mayuscula y medellín con m minuscula son dos ciudades completamente distintas y las guarda por separado
- Prueba realizada: pasar una ciudad con espacios y minusculas por normalizarCiudad("  medellín ") y ver si devuelve Medellín arreglado
- Causa: estabamos agrupando las ventas usando el texto de la ciudad tal como venia sin limpiarlo antes
- Correccion: usamos normalizarCiudad que le hace trim para quitar espacios y toLowerCase y luego pone la primera letra en mayuscula antes de sumar la venta en el objeto resumen

Error 2: El ticket promedio daba NaN cuando filtraba un dia sin ventas
- Sintoma: la consola mostraba NaN en el promedio cuando buscabas una fecha donde no se vendio nada
- Entrada que lo produce: pasarle un array vacio [] como cuando buscas el dia 2026-09-15
- Hipotesis: si no hubo ventas entonces ventasValidadas vale 0 y total vale 0, al final la formula hace total dividido ventasValidadas osea 0 dividido 0 y en javascript cualquier division de cero entre cero da NaN
- Prueba realizada: llamar a TicketPromedioVentas([]) con un array vacio a ver que botaba
- Causa: no habia ningun if que frenara la division cuando no habian ventas validas
- Correccion: le agregamos if (ventasValidadas === 0) return 0; y asi si no hay ventas devuelve 0 directo en ves de hacer la division y no da NaN


## Medicion de Big O y predicciones antes de medir
si multiplicamos los datos n por 10 (ejemplo pasar de 100 a 1000 ventas, o de 1000 a 10000):
- totalVendido: tiene un for of que recorre la lista completa, si hay 10 veces mas ventas hace 10 veces mas vueltas y operaciones, osea que el trabajo se multiplica por 10, es O(n) lineal
- ventaMayor: tambien recorre todo el array de inicio a fin comparando carta por carta, si hay 10 veces mas datos se multiplica por 10 el trabajo, es O(n) lineal
- totalPorCiudad: igual, revisa cada venta con el for of para ver si coincide con la ciudad, hace 10 veces mas operaciones, es O(n) lineal
- primeraVenta(ventas): solo mira ventas[0] directo, no le importa si la lista tiene 10 o 100000 cosas siempre hace 1 sola operacion fija, no crece nada, es O(1) constante


Predicción antes de medir:
Según las pruebas que hice con 5 ventas (totalVendido hizo 5 operaciones, ventaMayor hizo 11 y totalPorCiudad hizo 10), mi predicción es que si n se multiplica por 10, el número de operaciones de las tres funciones también se va a multiplicar por 10 (en ventaMayor será prácticamente por 10, solo sumando 1 más por la revisión inicial de si la lista está vacía).

Esto ocurre porque las tres funciones usan un solo ciclo for...of que recorre la lista de ventas de principio a fin una única vez. Como no hay ciclos dentro de otros ciclos, si la cantidad de datos crece 10 veces, cada función tendrá que dar 10 veces más vueltas.


Comparación con los resultados medidos y clasificación Big O:
Al correr node src/medir.js obtuve esta tabla:
- n = 100 -> totalVendido: 100 | ventaMayor: 201 | totalPorCiudad: 200 | primeraVenta: 1
- n = 1000 -> totalVendido: 1000 | ventaMayor: 2001 | totalPorCiudad: 2000 | primeraVenta: 1
- n = 10000 -> totalVendido: 10000 | ventaMayor: 20001 | totalPorCiudad: 20000 | primeraVenta: 1
- n = 100000 -> totalVendido: 100000 | ventaMayor: 200001 | totalPorCiudad: 200000 | primeraVenta: 1

Mi predicción se cumplió exacta: cuando n se multiplicó por 10 (de 100 a 1000, luego a 10000 y luego a 100000), las operaciones de totalVendido, ventaMayor y totalPorCiudad también se multiplicaron por 10 (en ventaMayor siempre quedó el +1 inicial del if que revisa si el array está vacío, y en totalPorCiudad fueron 2 por vuelta porque primero lee/limpia la ciudad y luego compara). En cambio primeraVenta siempre se quedó en 1 sin importar si n era 100 o 100000.


1. totalVendido(ventas, contador): O(n) lineal. Justificación: en el código tiene un único ciclo for...of que recorre toda la lista una vez y en los números pasó de 100 a 1000, 10000 y 100000 operaciones (crece exactamente igual que n).
2. ventaMayor(ventas, contador): O(n) lineal. Justificación: aunque hace 2 operaciones por vuelta más 1 al inicio (2n + 1: 201, 2001, 20001, 200001), solo recorre el arreglo con un único ciclo for...of sin ciclos anidados, por lo que al multiplicar n por 10 el trabajo también crece 10 veces.
3. totalPorCiudad(ventas, ciudad, contador): O(n) lineal. Justificación: hace 2 operaciones por cada venta visitada (2n: 200, 2000, 20000, 200000) dentro de un único for...of, creciendo proporcionalmente x10 cada vez que n se multiplica por 10.
4. primeraVenta(ventas, contador): O(1) constante. Justificación: no tiene ningún ciclo for en el código, solo lee directo ventas[0], y en los números marcó 1 operación tanto con 100 ventas como con 100000 ventas.
(Ninguna de las cuatro funciones es O(n²) porque ninguna tiene un ciclo for metido dentro de otro ciclo for).

## Big o explicacion y normalización

Paso 1 (totalCiudadCadena):
Aquí hacemos la tarea por partes. Primero el .map agarra toda la lista y limpia los nombres de las ciudades. Después el .filter saca solo las de Medellín. Luego otro .map multiplica cantidad por precio para saber cuánta plata fue cada venta. Y al final el .reduce suma toda esa plata. El detalle es que en cada paso va creando una lista nueva en memoria.

Paso 2 (totalCiudadUnaPasada):
Aquí no damos tanta vuelta. Creamos una sola variable totalCiudad = 0, miramos la lista una única vez con un for...of, y cada vez que vemos una venta de Medellín le sumamos la plata directo a esa variable.

Paso 3 (Prueba con 10.000 ventas):
Le metemos 10.000 ventas al azar a las dos funciones y ambas dan exactamente lo mismo (393201000). O sea, las dos hacen bien la cuenta, aunque por dentro trabajen distinto.

Paso 4 (Cuántas vueltas dan y cuánta memoria gastan):totalCiudadCadena: Revisa la lista 4 veces (una por cada método) y va creando 3 listas nuevas antes de dar el resultado. Como entre más ventas entren más grandes son esas listas nuevas y más se demora, queda como $O(n)$ en tiempo y $O(n)$ en espacio (memoria).totalCiudadUnaPasada: Revisa la lista 1 sola vez y no crea ninguna lista nueva, solo usa la variable totalCiudad donde va sumando. Por eso es $O(n)$ en tiempo (igual tiene que mirar toda la lista), pero $O(1)$ en espacio (siempre usa la misma variable, así entren 10 o 10.000 ventas).

Paso 5 (Por qué ambas son $O(n)$ en tiempo):
Aunque una dé 4 vueltas y la otra 1, en Big O los números fijos como ese 4 no se cuentan. Lo que importa es que si mañana entran 10 veces más ventas, las dos se van a demorar 10 veces más. Por eso ambas se marcan como $O(n)$.

Paso 6 (Memoria de las otras funciones):
La regla fácil es: si la función solo usa variables sueltas para ir guardando un dato, es $O(1)$; si va armando una lista ([]) o un objeto ({}) nuevo que crece con los datos, es $O(n)$:Solo usan variables sueltas — $O(1)$: totalVendido, unidadesVendidas, TicketPromedioVentas, ventasPorCiudad y VentaMayor (solo guardan un número o una venta de referencia y lo van cambiando).Crean listas u objetos nuevos — $O(n)$: ventasDelDia (usa .filter y saca una lista nueva), unidadesPorProducto y ventasPorCiudadResumen (arman un objeto {} nuevo), topProductosPorValor (arma objeto y listas nuevas), y clientesRecurrentes (va llenando una lista con .push).

## MiniReto 9 – Paso 1: Método de resolución

**Entender**
- *Entrada*: arreglo `ventas` (objetos con id, fecha, cliente, producto, ciudad, cantidad, precio).
- *Salida*: conjunto de códigos de clientes que aparecen más de una vez.
- *Restricciones*: debe procesarse en < 1 s para 100 000 ventas; uso de `Set` y `Map` sin librerías externas; mantener nombres en español.

**Ejemplos y casos borde**
- Caso típico: `[ {cliente:'C01'}, {cliente:'C02'}, {cliente:'C01'} ] → ['C01']`.
- Borde 1: venta con `cantidad:0` – se cuenta aun cuando no genera dinero.
- Borde 2: ciudad con mayúsculas/minúsculas distintas – irrelevante para este reto.
- Borde 3: lista vacía → result → `[]`.

**Fuerza bruta**
- Recorrer el arreglo y, por cada venta, comparar su cliente con todos los anteriores (`O(n²)`).
- Complejidad temporal: cuadrática; para 100 000 ventas se vuelve impráctico (minutos).

**Optimización**
- Usar un `Set` `vistos` para registrar clientes ya vistos y otro `Set` `recurrentes` para aquellos que aparecen ≥2 veces → `O(n)` tiempo, `O(k)` memoria (k = número de clientes únicos).
- Alternativamente, un `Map` `conteo` que almacena cuántas compras hizo cada cliente y extraer los que tengan `>1`.

**Implementar**
- Definir `clientesRecurrentesSet(ventas)` y `comprasPorCliente(ventas)` según lo anterior.

**Probar**
- Comparar resultados (ordenados) con la versión original y con datos generados (5 000 ventas).
