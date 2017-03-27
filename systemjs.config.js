System.config({
    transpiler: 'typescript',
    typescriptOptions: {emitDecoratorMetadata: true,
        target: "ES5",
        module: "commonjs"},
    map: {
        '@angular': 'node_modules/@angular',
<<<<<<< HEAD
        'rxjs'    : 'node_modules/rxjs'
=======
        'rxjs'    : 'node_modules/rxjs',
         'angular2-jwt': 'node_modules/angular2-jwt'
>>>>>>> 843cb06f9dce783b300bd924fd385b6b56c37440
    },
    paths: {
        'node_modules/@angular/*': 'node_modules/@angular/*/bundles'
    },
    meta: {
        '@angular/*': {'format': 'cjs'}
    },
    packages: {
        'app'                              : {main: 'main', defaultExtension: 'ts'},
        'rxjs'                             : {main: 'Rx'},
        '@angular/core'                    : {main: 'core.umd.min.js'},
        '@angular/common'                  : {main: 'common.umd.min.js'},
        '@angular/compiler'                : {main: 'compiler.umd.min.js'},
        '@angular/router'                  : {main: 'router.umd.min.js'},
        '@angular/platform-browser'        : {main: 'platform-browser.umd.min.js'},
<<<<<<< HEAD
        '@angular/platform-browser-dynamic': {main: 'platform-browser-dynamic.umd.min.js'}
=======
        '@angular/platform-browser-dynamic': {main: 'platform-browser-dynamic.umd.min.js'},
        '@angular/forms'                  : {main: 'forms.umd.min.js'},
        '@angular/http'                    : {main: 'http.umd.min.js'},
       
>>>>>>> 843cb06f9dce783b300bd924fd385b6b56c37440
    }
});