/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            'angular2-google-maps/core': 'npm:angular2-google-maps/core/core.umd.js',
            'angular2-busy': 'npm:angular2-busy/build/src',
            'angular2-dynamic-component': 'npm:angular2-dynamic-component',
            'ts-metadata-helper': 'npm:ts-metadata-helper',
            'core-js': 'npm:core-js',
            'moment': 'npm:moment',
            'ng2-bootstrap': 'npm:ng2-bootstrap'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-busy': {main: 'index.js', defaultExtension: 'js'},
            'angular2-dynamic-component': {main: 'index.js', defaultExtension: 'js'},
            'ts-metadata-helper': {main: 'index.js', defaultExtension: 'js'},
            'core-js': {main: 'index.js', defaultExtension: 'js'},
            'ng2-bootstrap': { format: 'cjs', main: 'bundles/ng2-bootstrap.umd.js', defaultExtension: 'js' },
            'moment': { main: 'moment.js', defaultExtension: 'js' }
        }
    });
})(this);