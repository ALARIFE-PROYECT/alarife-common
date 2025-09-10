# alarife-common (Resumen)

Librería y utilidades CLI compartidas del ecosistema ALARIFE. Cada subcarpeta o script posee (o tendrá) su propio README detallado; aquí solo se listan funciones clave.

## Estructura principal

- `alarife-common/` Paquete NPM `@alarife/common` (CLI principal: comando `common`).
- `_documentation/` Plantillas y guías internas.

## Scripts (src)

- `add-license.js` Inserta automáticamente el bloque de licencia al inicio de archivos (`--path`, `--ext`, detecta autor/nombre/licencia de package.json o argumentos).
- `copy.js` Copia un archivo de origen a destino (uso simple: `node src/copy.js <origen> <destino>`).
- `deployment.yalc.js` Recorre proyectos Node y ejecuta `npm install` y/o `npm run yalc:publish` según flags (`install`, `publish`).

## Instalación rápida

```bash
npm install @alarife/common --save-dev
# o global
npm install -g @alarife/common
```

## Ejemplo rápido (add-license)

```bash
common add-license --path=./ --ext=.ts
```
