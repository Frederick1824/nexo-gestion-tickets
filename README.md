# NEXO — Gestión y trazabilidad de solicitudes

Simulador académico desarrollado para **Sistemas y Organizaciones, ISPC 2026**, por Ctrl+Estudio (Comisión A). Centraliza el circuito ficticio de solicitudes de soporte de Trama Soluciones Digitales y demuestra controles, roles, trazabilidad e indicadores.

## Ejecutar localmente

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Vite mostrará la URL local (normalmente `http://localhost:5173`). Para producción:

```bash
npm run build
npm run preview
```

## Funcionalidad

- Landing institucional responsive en `/`.
- Simulador en `/demo` con panel, alta, listado, trazabilidad, áreas y reportes.
- 12 tickets ficticios precargados y persistencia mediante `localStorage`.
- Búsqueda, filtros y orden por prioridad/antigüedad.
- Reglas para asignación, inicio, documentación de resolución, cierre y reapertura.
- Roles simulados sin autenticación real.
- Recorrido guiado persistente sobre una copia independiente del escenario normal.
- Restablecimiento explícitamente confirmado.

## Datos locales

El escenario operativo se guarda en `nexo:v1:tickets`; la práctica guiada se guarda por separado en `nexo:v1:tour`.

## Limitaciones

No incluye backend, API, base de datos remota, autenticación, notificaciones, portal de clientes, inventario, exportación CSV ni integraciones. Los permisos son demostrativos y no constituyen seguridad real. Todos los tickets y nombres son ficticios.
