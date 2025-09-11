/*
 * Copyright (c) 2025 Jose Eduardo Soria
 *
 * This file is part of alarife-common.
 *
 * Licensed under the Apache 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License in the LICENSE file
 * at the root of this project.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.
 */

const fs = require('fs');
const path = require('path');

const sourceDirArgv = process.argv[3];
const destDirArgv = process.argv[4];

if(!sourceDirArgv || !destDirArgv) {
    console.log('Please enter the source and destination folder path.');
    process.exit(1);
}

// Ruta de la carpeta de origen y destino
const sourceDir = path.join(process.env.PWD, sourceDirArgv);
const destDir = path.join(process.env.PWD, destDirArgv);

// Función para copiar archivos
function copyFileSync(source, target) {
  let targetFile = target;

  // Si el destino es una carpeta, añade el nombre del archivo al destino
  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    targetFile = path.join(target, path.basename(source));
  }

  fs.copyFileSync(source, targetFile);
}

copyFileSync(sourceDir, destDir);

console.log('Contenido copiado con éxito!');
console.log();
