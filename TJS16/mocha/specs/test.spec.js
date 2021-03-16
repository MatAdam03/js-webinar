'use strict';

const { expect } = require("chai");
const { browser, ExpectedConditions, element, by, Browser, logging } = require("protractor");
const CareerPage = require('../pageObjects/careerPage');
const careerPage = new CareerPage();
const JobListingPage = require('../pageObjects/joblistingPage');
const joblistingPage = new JobListingPage();
const JobDetailPage = require('../pageObjects/jobDetailPage');
const jobdetailPage = new JobDetailPage();
const Mongo = require("../mongohandler");
Mongo.MongoConnect().then(result => {
    const testdata2 = result;
    before(async () => {
        var EC = protractor.ExpectedConditions;
        await browser.get('https://www.epam.com/careers');
        const cookieBoxButton = element(by.css('button[aria-label="Accept our use of cookies"]'))
        await browser.wait(EC.elementToBeClickable(cookieBoxButton), 5000);
        await cookieBoxButton.click();
    });
    testdata2.forEach(data => {
        describe('Search for a job', () => {
            beforeEach(() => {
                careerPage.load();
            });
            describe('Careers Page', () => {
                it('should be opened', () => {
                    return expect(careerPage.headerLogo.isDisplayed()).to.eventually.be.true;
                });
            });
            describe('Search form', () => {
                it('should be displayed', () => {
                    return expect(careerPage.jobSearchForm.isDisplayed()).to.eventually.be.true;
                });
                describe('location filter box', () => {
                    it('should provide a way to filter to a specific location', async () => {
                        await careerPage.selectCity(data.City, data.Country);
                        return expect(careerPage.selectedCityContainer.getText()).to.eventually.equal(data.City);
                    });
                });
                describe('skill filter box', () => {
                    it('should provide a way to filter to a specific skill', async () => {
                        await careerPage.selectSkill(data.Position);
                        return expect(careerPage.selectedSkillContainer.getAttribute('data-value')).to.eventually.contain(data.Position);
                    });
                });
                describe('Searching', () => {
                    beforeEach(async () => {
                        await careerPage.selectCity(data.City, data.Country);
                        await careerPage.selectSkill(data.Position);
                        await careerPage.searchSubmitButton.click();
                        await careerPage.loadJobListingPage();
                    });
                    it('should have proper job found', () => {

                        return expect(joblistingPage.searchResultContainerHeader.isDisplayed()).to.eventually.be.true;
                    });
                    it('should have job with proper city and country', () => {
                        return expect(joblistingPage.searchResultLocation.getText()).to.eventually.contain(data.City.toUpperCase(), data.Country.toUpperCase());
                    });
                    it('should have apply button for job', () => {
                        return expect(joblistingPage.applyButton.isDisplayed()).to.eventually.be.true;
                    });
                    describe('Applying to postition', () => {
                        beforeEach(() => {
                            joblistingPage.applyButton.click();
                            joblistingPage.jobApply();
                        });
                        it('should have job page loaded', () => {
                            return expect(jobdetailPage.recruitPageHeaderElement.isDisplayed()).to.eventually.be.true;
                        });
                        it('should have a proper position name in the title', () => {
                            return expect(jobdetailPage.recruitPageHeaderElement.getText()).to.eventually.contain(data.JobTitle);
                        });
                        it('should havea  proper location in the title', () => {
                            return expect(jobdetailPage.recruitPageHeaderElement.getText()).to.eventually.contain(data.City);
                        });
                    });
                });
            });
        });
    })
    run();
});





/*before(async () => {
    careerPage.acceptCookies();


});*/
