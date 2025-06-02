import gulp from "gulp";
import { umdBuildEntry, moduleBuildEntry, buildStyle, deletePkg, copyPackage } from "./src/index";

// 执行串行任务
export default gulp.series(deletePkg, umdBuildEntry, moduleBuildEntry, buildStyle, copyPackage)