
import gulp from "gulp";
//删除文件或者文件夹
import { deleteAsync } from "del"
import { outputDir, pkgRoot } from "./common.js"

/**
 * 存在包，则先删除
 */
export const deletePkg = async () => {
  await deleteAsync([outputDir], { force: true })
}

// 复制package.json
export const copyPackage = async () => {
  await new Promise((resolve) => {
    gulp.src(`${pkgRoot}/package.json`)
      .pipe(gulp.dest(`${outputDir}`))
      .on("end", resolve); // 监听流完成
  });
}
