import gulp from "gulp";
import { deletePkg, umdBuildEntry, moduleBuildEntry, buildStyle, copyPackage  } from "./src/index.js"

export default gulp.series(
  gulp.series(deletePkg, umdBuildEntry, moduleBuildEntry, buildStyle, copyPackage )
)
