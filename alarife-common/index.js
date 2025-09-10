/*
 * Copyright (c) 2025 Jose Eduardo Soria
 *
 * This file is part of alarife-common.
 *
 * Licensed under the  (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License in the LICENSE file
 * at the root of this project.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.
 */

if (process.argv.includes("deploy-yalc")) {
    require("./src/deployment.yalc");
} else if (process.argv.includes("add-license")) {
  require("./src/add-license");
} else if (process.argv.includes("copy")) {
  require("./src/copy");
} else {
  console.log("Please enter a valid command: deploy.yalc, add-license, copy");
  process.exit(1);
}
