# Bitácora – Mini‑Retos Día 3 y Refactorización

**Corregí** el proyecto porque tenía funciones y variables repetidas y desorganizadas, lo que impedía importar y exportar adecuadamente los mini‑retos del día 3 (medición). 

- Unifiqué la lógica de cálculo de ventas y unidades en funciones únicas y bien nombradas.
- Eliminé duplicados y bloques de código sin cerrar que producían `SyntaxError` y referencias a funciones inexistentes.
- Añadí envoltorios (`VentasPorCiudadM`) para mantener compatibilidad con los imports previos.
- Actualicé el objeto de exportación para que todas las claves coincidieran con los nombres reales de las funciones.
- Verifiqué que `node src/medir.js` genera la tabla de tiempos sin errores.

**Aprendizaje**: Mantener una única fuente de verdad por función y alinear los nombres de exportación evita errores de referencia y facilita el mantenimiento del código.
