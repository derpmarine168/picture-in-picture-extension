
process.env.NODE_ENV = "production";

var gulp = require("gulp");
var del = require("del");
var imagemin = require("gulp-imagemin");
const childProcess = require("child_process");

gulp.task("webext", ["img", "copy", "js"], function () {
});
gulp.task("chrome-ext", ["img-chr", "copy-chr", "js-chr"], function () {
});

gulp.task("js", function (cbf) {
  childProcess.exec("npx google-closure-compiler --platform=java --js=src/background.js  --js_output_file=build/background.js --language_in=ECMASCRIPT_2017 --language_out=ECMASCRIPT5_STRICT --compilation_level=SIMPLE --env=BROWSER",
    (error, stdout, stderr) => {
      // console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
      cbf();
    });
});

gulp.task("js-chr", function (cbf) {
  childProcess.exec("npx google-closure-compiler --platform=java --js=src-chrome/background.js  --js_output_file=build-chrome/background.js --language_in=ECMASCRIPT_2017 --language_out=ECMASCRIPT5_STRICT --compilation_level=SIMPLE --env=BROWSER",
    (error, stdout, stderr) => {
      // console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      if (error !== null) {
        console.log(`exec error: ${error}`);
      }
      cbf();
    });
});

gulp.task("clear", function () {
  return del(["build", "build-chrome"]);
});

// gulp.task("copy", ["copy-robots", "copy-json"], function () {
// });

gulp.task("copy", function () {
  gulp.src("src/manifest.json")
    .pipe(gulp.dest("./build/"));
});
gulp.task("copy-chr", function () {
  gulp.src("src-chrome/manifest.json")
    .pipe(gulp.dest("./build-chrome/"));
});

gulp.task("img", function () {
  return gulp.src(["src/**/*.jpg", "src/**/*.png", "src/**/*.jpeg", "src/**/*.svg", "src/**/*.gif"])
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest("./build/"));
});
gulp.task("img-chr", function () {
  return gulp.src(["src-chrome/**/*.jpg", "src-chrome/**/*.png", "src-chrome/**/*.jpeg", "src-chrome/**/*.svg", "src-chrome/**/*.gif"])
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest("./build-chrome/"));
});
