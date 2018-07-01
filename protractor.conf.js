//protractor.conf.js
let path = require('path');
let wd = require('wd');
let protractor = require('protractor');
let wdBridge = require('wd-bridge')(protractor, wd);

exports.config = {
    // Adresse du serveur Appium par défaut
    seleniumAddress: 'http://localhost:4723/wd/hub',
    // Emplacement de nos tests fonctionnels. Nous chargeons ici tous les fichiers présents dans le dossier ./e2e
    // et suffixés par .e2e.js
    specs: ['./e2e/**/*.e2e.js'],
    // Configuration du mobile sur lequel sera exécuté les tests.
    // Pour ajouter plusieurs cibles, voir : https://github.com/angular/protractor/blob/master/lib/config.ts
    capabilities:
        {
            // Le nom de la plateform : android | ios | windows
            platformName: 'android',
            deviceName: 'Redmi Note 4',
            browserName: "",
            autoWebview: true,
            // Nous indiquons ici l'emplacement vers l'application à tester, artefact de la commande `ionic build android`
            app: path.join(__dirname, '/platforms/android/build/outputs/apk/android-debug.apk'),
            // appWaitDuration: 500000,
            // autoWebviewTimeout: 20000
        },
    baseUrl: 'http://localhost:8100/',
    onPrepare: () => {
        // Initialisation du bridge wd avec la configuration de Protractor
        wdBridge.initFromProtractor(exports.config);
    }
};