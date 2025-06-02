import { deleteAsync } from "del";
import { outputDir, pkgRoot } from "./common";

export const deletePkg = async () => {
    await deleteAsync([outputDir], { force: true })
}

export const copyPackage = async () => {
    await new Promise((resolve, reject) => {
        gulp.src(`${pkgRoot}/package.json`)
        .pipe(gulp.dest(outputDir))
        .on('end', resolve)
        .on('error', reject)
    })
}