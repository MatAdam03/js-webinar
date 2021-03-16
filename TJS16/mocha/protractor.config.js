'use strict';

const GLOBAL_TIMEOUT = 6000;

exports.config = {
    specs: 'specs/**/*.spec.js',
    multiCapabilities: [{
        'browserName': 'chrome'
      }/*, {
        'browserName': 'firefox'
      }*/],
    directConnect: true,
    mochaOpts: {
        reporter: 'mochawesome-screenshots',
        delay:true,
        reporterOptions: {
            reportDir: 'customReportDir',
            reportName: 'customReportName',
            reportTitle: 'customReportTitle',
            reportPageTitle: 'customReportPageTitle',
            takePassedScreenshot: false,
            clearOldScreenshots: true,
            shortScrFileNames: false,
            jsonReport: false,
            multiReport: true
        },
        timeout: 10000
    },
    framework: 'mocha',
    getPageTimeout: GLOBAL_TIMEOUT,
    onPrepare: async function () {
        global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;
        global.ec = protractor.ExpectedConditions;

        const chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;

        await browser.waitForAngularEnabled(false);
        try {
            await browser.manage().window().maximize();
        } catch (e) {
            await browser.manage().window().setSize(1800, 1012);
        }
    }
};