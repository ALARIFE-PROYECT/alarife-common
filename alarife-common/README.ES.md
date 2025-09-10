# alarife-common

Colección de utilidades CLI para monorepos / workspaces Node.js: añadir licencias, copiar estructuras y desplegar paquetes localmente con `yalc`.

## Instalación

```bash
npm i -D alarife-common
```

Uso sin instalación previa:
```bash
npx alarife-common <comando> [args]
# o
npx common <comando> [args]
```

Comandos soportados: `add-license`, `copy`, `deployment-yalc`.

---
## add-license
Inserta una cabecera de licencia estándar al inicio de archivos de uno o varios proyectos. Solo la añade si todavía no está presente.

Flags:
- `--path=<ruta>` Ruta contenedora de múltiples proyectos (busca subdirectorios con `package.json`).
- `--project-name=<nombre>` Nombre del paquete (obligatorio si usas una ruta sin **package.json**).
- `--project-author=<author>` Nombre del autor (obligatorio si usas una ruta sin **package.json**).
- `--project-license=<license>` Licencia (obligatorio si usas una ruta sin **package.json**).
- `--ext=.js,.ts` Lista separada por comas. Por defecto `.js`.

Ejemplos:
```bash
# Todas las carpetas deben tener package.json
npx alarife-common add-license --path=./packages --ext=.ts

# Proyecto concreto (.ts y .js)
npx alarife-common add-license --path=./utils/lib --project-name=@bigbyte/utils --project-author="Jose Eduardo Soria" --project-license=Apache_2.0  --ext=.ts,.js
```

---

## copy
Copia recursivamente directorios (profundo) o un archivo individual.

Uso:
```bash
npx alarife-common copy <origen> <destino>
```

Comportamiento:
- Crea directorios destino que no existan.
- Sobrescribe archivos existentes.
- Si origen es archivo y destino es carpeta, mantiene el nombre.
- Si origen es carpeta, replica toda la estructura.

Ejemplos:
```bash
# Copiar un archivo
npx alarife-common copy ./plantillas/README.base.md ./packages/pkg-a/README.md

# Copiar recursivamente una carpeta
npx alarife-common copy ./plantillas/component ./packages/ui-lib/src/component
```

---

## deployment.yalc
Automatiza acciones sobre todos los subdirectorios que tengan `package.json` en la ruta actual.

Argumentos (se activan si están presentes):
- `install` Ejecuta `npm install` en cada paquete.
- `publish` Ejecuta `npm run yalc:publish` en cada paquete.

Requisitos:
- Cada paquete debe definir en su `package.json` el script:
	```json
	{
		"scripts": {
			"yalc:publish": "yalc publish"
		}
	}
	```
- Tener `yalc` disponible (global o via `npx`).

Ejemplos:
```bash
# Instalar dependencias
npx alarife-common deployment.yalc install

# Publicar en yalc
npx alarife-common deployment.yalc publish

# Instalar y luego publicar
npx alarife-common deployment.yalc install publish
```

## Licencia

Este proyecto está bajo la licencia ISC. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

**Desarrollado con ❤️ por [Jose Eduardo Soria Garcia](mailto:alarifeproyect@gmail.com)**

*Parte del ecosistema BigByte*

</div>

