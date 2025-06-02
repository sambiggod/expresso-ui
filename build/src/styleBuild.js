import gulp from 'gulp'
import dartSass from 'sass'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import gulpConcat from 'gulp-concat'
import { resolve } from 'path'
import { outputPkgDir, pkgRoot, outputDir, outputUmd, rootDir } from './common'
import { deleteAsync } from 'del'

// 全量打包css
const buildScssFull = async () => {
    const sass = gulpSass(dartSass)
    await new Promise((resolve, reject) => {
        gulp.src(`${pkgRoot}/theme/src/index.scss`) // 指定打包入口
        .pipe(sass.sync())
        .pipe(autoprefixer({cascade: false})) // 禁用css级联
        .pipe(cleanCSS()) // 压缩css
        .pipe(gulpConcat('index.min.css')) // 合并css
        .pipe(gulp.dest(outputDir)) // 输出到指定目录
        .on('end', resolve)
        .on('error', reject)
    })
}

// 按需加载打包CSS
const buildScssModules = async () => {
    const sass = gulpSass(dartSass)
    await new Promise((resolve, reject) => {
        gulp.src(`${rootDir}/packages/theme/src/**/*.scss`)
        .pipe(sass.sync())
        .pipe(autoprefixer({cascade: false}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(`${outputDir}/theme`))
        .on('end', resolve)
        .on('error', reject)
    })
    deleteFiles()
}

const deleteFiles = async () => {
    await deleteAsync(
        [`${rootDir}/theme/index.css`, `${outputDir}/theme/common`],
        { force: true }
    )
}

export const buildStyle = async () => {
    await Promise.all([buildScssFull(), buildScssModules()])
}

buildStyle()