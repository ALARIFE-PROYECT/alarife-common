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

/**
 * Ejemplos:
 *
 * Usado en build:
 * Modifica el transpilado y agrega la licencia a todos los archivos .ts y .js.
 * common add-license --path=./lib --ext=.js,.ts --project-name=@bigbyte/utils --project-author=Jose_Eduardo_Soria --project-license=Apache_2.0
 *
 * Usado en desarrollo:
 * Modifica todos los archivos .ts del proyecto actual (lee el package.jeson para obtener el nombre, autor y licencia).
 * common add-license --path=./ --ext=.ts
 *
 * Accion masiva:
 * Modifica todos los archivos .ts de todos los proyecots del repositorio.
 * common add-license --path=./ --ext=.ts
 */

const fs = require("fs");
const { join, isAbsolute, extname, basename } = require("path");

const getArgvValue = (flag) => {
  let result = null;

  process.argv.forEach((arg) => {
    if (arg.startsWith(`--${flag}=`)) {
      const [key, value] = arg.split("=");
      result = value.replaceAll("_", " ");
    }
  });

  return result;
};

const getLicenseText = (author, projectName, license) => `/*
 * Copyright (c) ${new Date().getFullYear()} ${author}
 *
 * This file is part of ${projectName}.
 *
 * Licensed under the ${license} (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License in the LICENSE file
 * at the root of this project.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.
 */`;

const getPackageJson = (path) => {
  try {
    const packageData = fs.readFileSync(path, "utf8");
    const packageJson = JSON.parse(packageData);

    return packageJson;
  } catch (error) {
    return null;
  }
};

const writeLicense = (project, ext) => {
  if (
    !project.projectAuthor ||
    !project.projectLicense ||
    !project.projectName
  ) {
    throw new Error(
      'You must specify the project author, license and name. Example: --project-author="John Doe" --project-license="MIT" --project-name="@myorg/mypackage" or set them in the package.json file.'
    );
  }

  const licenseText = getLicenseText(
    project.projectAuthor,
    project.projectName,
    project.projectLicense
  );

  const processDirectory = (dirPath) => {
    if (dirPath.includes("node_modules") || dirPath.includes(".git")) {
      return;
    }

    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const itemPath = join(dirPath, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        processDirectory(itemPath);
      } else if (stats.isFile() && extname(itemPath) === ext) {
        const currentContent = fs.readFileSync(itemPath, "utf8");

        // Verificar si el texto ya existe al inicio del archivo
        if (
          !currentContent.includes("Copyright (c)") &&
          !currentContent.includes(
            "You may obtain a copy of the License in the LICENSE file"
          )
        ) {
          let newContent;

          if (
            currentContent.startsWith("#!/") ||
            currentContent.startsWith("use strict")
          ) {
            const firstLineEnd = currentContent.indexOf("\n");
            const shebangLine =
              firstLineEnd !== -1
                ? currentContent.slice(0, firstLineEnd)
                : currentContent;
            const rest =
              firstLineEnd !== -1 ? currentContent.slice(firstLineEnd + 1) : "";
            newContent = shebangLine + "\n" + licenseText + "\n\n" + rest;
          } else {
            newContent = licenseText + "\n\n" + currentContent;
          }

          //  const firstLine = '#!/';

          //   const newContent = licenseText + "\n\n" + currentContent;
          fs.writeFileSync(itemPath, newContent, "utf8");
        }
      }
    });
  };

  processDirectory(project.path);
};

const launch = (projects) => {
  projects.forEach((project) => {
    if (fileExtension.includes(",")) {
      fileExtension.split(",").forEach((ext) => {
        writeLicense(project, ext);
      });
    } else {
      writeLicense(project, fileExtension);
    }
  });
};

const argvPath = getArgvValue("path");
const argvProjectName = getArgvValue("project-name");
const argvProjectAuthor = getArgvValue("project-author");
const argvProjectLicense = getArgvValue("project-license");
const fileExtension = getArgvValue("ext") ?? ".js";

if (!argvPath) {
  throw new Error("You must specify --path to process.");
}

const rootProjectsPath = isAbsolute(argvPath)
  ? argvPath
  : join(process.cwd(), argvPath);
const rootFiles = fs.readdirSync(rootProjectsPath, { withFileTypes: true });
const rootDirs = rootFiles.filter((item) => item.isDirectory());

const projects = [];
rootDirs.forEach((dir) => {
  const packagePath = join(rootProjectsPath, dir.name, "package.json");

  if (fs.existsSync(packagePath)) {
    const packageJson = getPackageJson(packagePath);
    projects.push({
      dirName: dir.name,
      path: join(rootProjectsPath, dir.name),
      projectName: packageJson.name,
      projectAuthor: packageJson.author ?? projectAuthor,
      projectLicense: packageJson.license ?? projectLicense,
    });
  }
});

if (projects.length > 0) {
  launch(projects);
} else {
  const completeProjectPath = isAbsolute(argvPath)
    ? argvPath
    : join(process.cwd(), argvPath);

  const packageJson = getPackageJson(completeProjectPath);
  if (packageJson) {
    launch([
      {
        dirName: basename(completeProjectPath),
        path: completeProjectPath,
        projectName: packageJson.name,
        projectAuthor: packageJson.author,
        projectLicense: packageJson.license,
      },
    ]);
  } else {
    launch([
      {
        dirName: basename(completeProjectPath),
        path: completeProjectPath,
        projectName: argvProjectName,
        projectAuthor: argvProjectAuthor,
        projectLicense: argvProjectLicense,
      },
    ]);
  }
}
