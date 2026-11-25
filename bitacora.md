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
