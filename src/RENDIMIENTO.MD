# Informe de Rendimiento y Complejidad — Motor de Analítica (`v0.2`)

Este documento analiza cuántas operaciones y cuánta memoria gastan las funciones del proyecto **Café Origen Analítica**, comparando los recorridos simples contra los métodos encadenados y proyectando qué pasa cuando los datos crecen.

---

## 1. Tabla de complejidad y mediciones (10.000 ventas)

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación (en palabras simples) | Operaciones / Tiempo (10.000 ventas) |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `ValorVenta` | Multiplica `cantidad * precio` de una venta. | $O(1)$ | $O(1)$ | Solo hace una multiplicación directa sobre una venta, sin ciclos ni listas nuevas. | 1 operación (~0.001 ms) |
| `primeraVenta` | Devuelve la primera venta de la lista (`ventas[0]`). | $O(1)$ | $O(1)$ | Va directo a la posición `0` sin revisar el resto de la lista ni crear variables extra. | 1 operación (~0.001 ms) |
| `totalVendido` | Suma el dinero total de todas las ventas. | $O(n)$ | $O(1)$ | Recorre la lista 1 vez con `for...of` y va sumando en una sola variable `total = 0`. | 10.000 operaciones (~0.3 ms) |
| `unidadesVendidas` | Suma cuántas unidades se vendieron en total. | $O(n)$ | $O(1)$ | Mira cada venta 1 vez y acumula en una única variable `TotalUnidades = 0`. | 10.000 operaciones (~0.2 ms) |
| `VentaMayor` | Busca la venta con el valor más alto en dinero. | $O(n)$ | $O(1)$ | Recorre toda la lista 1 vez guardando solo una venta de referencia (`mayor`) en la mano. | 10.001 operaciones (~0.4 ms) |
| `TicketPromedioVentas` | Calcula el promedio en pesos de las ventas válidas. | $O(n)$ | $O(1)$ | Hace 1 solo recorrido usando únicamente dos variables sueltas (`total` y `ventasValidadas`). | 10.000 operaciones (~0.3 ms) |
| `ventasPorCiudad` / `totalCiudadUnaPasada` | Suma el total vendido en una ciudad con un solo ciclo. | $O(n)$ | $O(1)$ | Recorre la lista 1 vez y suma directo en `totalCiudad = 0`, sin crear arreglos intermedios. | 10.000 operaciones (~1.2 ms) |
| `totalCiudadCadena` (y `VentasPorCiudadM`) | Suma el total de una ciudad encadenando `.map`, `.filter`, `.map` y `.reduce`. | $O(n)$ | $O(n)$ | Revisa la lista 4 veces seguidas y crea 3 arreglos nuevos en memoria antes de dar el resultado. | ~35.000 operaciones (~3.5 ms) |
| `ventasDelDia` | Filtra las ventas de una fecha exacta usando `.filter`. | $O(n)$ | $O(n)$ | Recorre toda la lista 1 vez y crea un arreglo nuevo con las ventas que coinciden con la fecha. | 10.000 operaciones (~0.8 ms) |
| `unidadesPorProducto` | Cuenta cuántas unidades se vendieron por cada producto. | $O(n)$ | $O(n)$ | Recorre las ventas 1 vez y crea un objeto nuevo `{}` donde guarda cada producto y su total. | 10.000 operaciones (~0.9 ms) |
| `ventasPorCiudadResumen` | Agrupa y suma el dinero vendido por cada ciudad. | $O(n)$ | $O(n)$ | Hace 1 recorrido y arma un objeto nuevo `{}` con el acumulado de cada ciudad. | 10.000 operaciones (~1.5 ms) |
| `topProductosPorValor` | Calcula ingresos por producto, ordena y saca el top. | $O(n \log n)$ | $O(n)$ | Crea un objeto `ingresos`, arma arreglos nuevos con `.map` y `.slice`, y ordena con `.sort`. | ~10.020 operaciones (~1.8 ms) |
| `clientesRecurrentes` | Busca clientes con más de una compra comparando pares. | $O(n^2)$ | $O(n)$ | Usa dos ciclos `for` anidados (compara cada venta con todas las siguientes) y llena un arreglo `recurrentes`. | 49.995.000 comparaciones (~95 ms) |

*(Nota: Los tiempos en milisegundos de la última columna son de referencia; reemplázalos con los tiempos exactos que te arroje tu computador al correr la medición).*

---

## 2. Proyección para 1.000.000 de ventas

Pasar de **10.000** a **1.000.000** de ventas significa multiplicar los datos por **100 ($100\times$)**. Según la complejidad de cada función, así crece el trabajo:

* **Funciones $O(1)$ (`ValorVenta`, `primeraVenta`):**
  * **Crece:** $\times 1$ (no cambia).
  * **Estimación:** Sigue haciendo **1 operación** y tardando **menos de 0.01 ms**, sin importar si hay diez o un millón de ventas.
* **Funciones $O(n)$ (`totalVendido`, `unidadesVendidas`, `VentaMayor`, `TicketPromedioVentas`, `totalCiudadUnaPasada`, `totalCiudadCadena`, `ventasDelDia`, `unidadesPorProducto`, `ventasPorCiudadResumen`):**
  * **Crece:** $\times 100$ (proporcional a los datos).
  * **Estimación:** Pasan de 10.000 a **1.000.000 de operaciones** (y ~3.500.000 en `totalCiudadCadena`). En tiempo, pasan de ~0.3–3.5 ms a unos **30 ms – 350 ms** (menos de medio segundo). La diferencia es que `totalCiudadCadena` duplicará varias veces la lista en RAM.
* **Función $O(n \log n)$ (`topProductosPorValor`):**
  * **Crece:** Un poco más de $\times 100$ (alrededor de $\times 150$ si hubiera muchos productos distintos).
  * **Estimación:** Tardaría alrededor de **180 ms – 270 ms** (sigue siendo rápido, menos de un tercio de segundo).
* **Función $O(n^2)$ (`clientesRecurrentes`):**
  * **Crece:** $\times 100^2 = \times 10.000$ (crece al cuadrado).
  * **Estimación:** Pasa de casi 50 millones a **~500.000.000.000 (500 mil millones) de comparaciones**. Si con 10.000 ventas tarda ~95 ms, con 1.000.000 tardaría unos **950.000 ms (~15 minutos)**, bloqueando por completo la ejecución del programa.

---

## 3. Riesgos (de mayor a menor)

**Criterio de orden:** Primero se ordena por **complejidad temporal** (el peor caso es $O(n^2)$, seguido de $O(n \log n)$, luego $O(n)$ y al final $O(1)$). Para desempatar entre las funciones $O(n)$, van primero las que tienen **complejidad espacial $O(n)$** (porque crean listas u objetos nuevos en memoria RAM) y después las de **espacio $O(1)$** (que solo usan una variable en la mano).

1. **Riesgo Crítico — `clientesRecurrentes` ($O(n^2)$ tiempo / $O(n)$ espacio):** Es el cuello de botella del motor. Al tener un ciclo dentro de otro, con un millón de ventas congela el programa por minutos.
2. **Riesgo Alto — `topProductosPorValor` ($O(n \log n)$ tiempo / $O(n)$ espacio):** Crea varias estructuras en memoria y ejecuta `.sort()`. Si el catálogo de productos creciera mucho, el ordenamiento empezaría a pesar.
3. **Riesgo Medio-Alto — `totalCiudadCadena` ($O(n)$ tiempo / $O(n)$ espacio):** Aunque es lineal, da 4 vueltas y crea 3 arreglos intermedios por consulta. Con millones de registros consume bastante memoria innecesaria.
4. **Riesgo Medio — `ventasDelDia`, `unidadesPorProducto`, `ventasPorCiudadResumen` ($O(n)$ tiempo / $O(n)$ espacio):** Recorren la lista una sola vez, pero crean un arreglo o un objeto nuevo que ocupa memoria según los resultados.
5. **Riesgo Bajo — `totalVendido`, `unidadesVendidas`, `VentaMayor`, `TicketPromedioVentas`, `totalCiudadUnaPasada` / `ventasPorCiudad` ($O(n)$ tiempo / $O(1)$ espacio):** Recorren los datos una sola vez y solo usan variables acumuladoras sueltas. Escalan bien sin gastar RAM extra.
6. **Riesgo Mínimo — `ValorVenta` y `primeraVenta` ($O(1)$ tiempo / $O(1)$ espacio):** Tiempo y memoria constantes; nunca se degradan.

---

## 4. Plan de optimización (para `clientesRecurrentes`)

* **¿Qué trabajo se repite?**
  1. Por cada venta `i`, el segundo ciclo (`j`) vuelve a recorrer toda la lista hacia adelante buscando si ese mismo cliente aparece otra vez. Si un cliente compró 50 veces, el código lo busca y lo compara decenas de veces innecesariamente.
  2. Como `recurrentes` es un arreglo (`[]`), cada vez que encuentra una coincidencia llama a `!recurrentes.includes(ventas[i].cliente)`, lo que obliga a revisar la lista de recurrentes desde el inicio una y otra vez.
* **¿Qué información se podría guardar para no buscarla de nuevo?**
  * Se pueden guardar dos registros rápidos en memoria mientras se recorre la lista **una sola vez** ($O(n)$):
    1. Un `Set` o diccionario (`clientesVistos`) donde se anota cada `venta.cliente` apenas aparece por primera vez.
    2. Un `Set` (`recurrentesSet`) donde se anota el cliente si al revisarlo ya existía en `clientesVistos`.
  * Así, en lugar de recorrer toda la lista hacia adelante con un segundo ciclo `for`, basta con preguntar si el cliente ya está anotado en `clientesVistos` (una consulta directa $O(1)$). Con eso bajaríamos de 500 mil millones de comparaciones a solo 1 millón con un millón de ventas.

---

## 5. Revisión de compañero y bitácora

* **Compañero que revisó el informe:** *[Escribe aquí el nombre de tu compañero]*
* **Observación recibida:** *[Pega aquí el comentario o sugerencia que te hizo tu compañero sobre tu tabla o tus proyecciones]*
* **Respuesta / Ajuste realizado:** *[Escribe aquí cómo respondiste a su observación o qué ajustaste en el documento]*