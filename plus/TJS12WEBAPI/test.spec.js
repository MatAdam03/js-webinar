'use strict';

const { expect } = require("chai");
const { browser, ExpectedConditions, element, by, Browser } = require("protractor");
const testData = require('../data.json');
before(() => {
    var EC = protractor.ExpectedConditions;
    browser.get('https://www.epam.com/careers');
    const cookieBoxButton = element(by.css('button[aria-label="Accept our use of cookies"]'))
    browser.wait(EC.elementToBeClickable(cookieBoxButton), 5000);
    cookieBoxButton.click();
});
testData.forEach(data => {
    describe('Search for a job', () => {
        beforeEach(() => {
            var EC = protractor.ExpectedConditions;
            browser.get('https://www.epam.com/careers');
            const headerLogo = element(by.css('img.header__logo'))
            browser.wait(EC.elementToBeClickable(headerLogo), 5000);
        });
        describe('Careers Page', () => {
            it('should be opened', () => {
                const headerLogo = element(by.css('img.header__logo'))
                return expect(headerLogo.isDisplayed()).to.eventually.be.true;
            });
        });
        describe('Search form', () => {
            it('should be displayed', () => {
                const jobSearchForm = element(by.css('.job-search'));
                return expect(jobSearchForm.isDisplayed()).to.eventually.be.true;
            });
            describe('location filter box', () => {
                it('should provide a way to filter to a specific location', async () => {
                    const citySelectorBox = element(by.css('.select2'));
                    expect(citySelectorBox.isDisplayed()).to.eventually.be.true;
                    const citySelectorDropdown = element(by.css('.recruiting-search__location'));
                    await citySelectorDropdown.click();
                    browser.sleep(500);
                    const selectedCity = element(by.xpath(`//li[contains(text(),'${data.City}')]`));
                    const clickable = await selectedCity.isDisplayed();
                    if (!clickable) {
                        const countryOfCity = element(by.xpath(`//strong[contains(text(),'${data.Country}')]`));
                        await countryOfCity.click();
                        browser.sleep(1000);
                    }
                    await selectedCity.click();
                    const selectedCityContainer = element(by.css('.select2-selection__rendered'));
                    return expect(selectedCityContainer.getText()).to.eventually.equal(data.City);
                });
            });
            describe('skill filter box', () => {
                it('should provide a way to filter to a specific skill', () => {
                    const skillSelector = element(by.css('.multi-select-filter'));
                    expect(skillSelector.isDisplayed()).to.eventually.be.true;
                    skillSelector.click();
                    browser.sleep(500);
                    const skillSelectorDropdown = element(by.css('.multi-select-dropdown-container'));
                    expect(skillSelectorDropdown.isDisplayed()).to.eventually.be.true;
                    const skillToSelect = element(by.cssContainingText('.checkbox-custom-label', data.Position));
                    expect(skillToSelect.isDisplayed()).to.eventually.be.true;
                    skillToSelect.click();
                    const selectedSkillContainer = element.all(by.css('.selected-items>li'));
                    return expect(selectedSkillContainer.getAttribute('data-value')).to.eventually.contain(data.Position);
                });
            });
            describe('Searching', () => {
                beforeEach(async () => {
                    const headerElement = element(by.css('.search-result__heading'));
                    const citySelectorDropdown = element(by.css('.recruiting-search__location'));
                    await citySelectorDropdown.click();
                    browser.sleep(500);
                    const selectedCity = element(by.xpath(`//li[contains(text(),'${data.City}')]`));
                    const clickable = await selectedCity.isDisplayed();
                    if (!clickable) {
                        const countryOfCity = element(by.xpath(`//strong[contains(text(),'${data.Country}')]`));
                        await countryOfCity.click();
                        browser.sleep(1000);
                    }
                    await selectedCity.click();
                    browser.sleep(500)
                    const skillSelector = element(by.css('.multi-select-filter'));
                    await skillSelector.click();
                    browser.sleep(500);
                    const skillToSelect = element(by.cssContainingText('.checkbox-custom-label', data.Position));
                    await skillToSelect.click();
                    const searchSubmitButton = element(by.css('.recruiting-search__submit'));
                    await searchSubmitButton.click();
                    var EC = protractor.ExpectedConditions;
                    await browser.wait(EC.elementToBeClickable(headerElement), 5000);
                });
                it('should have proper job found', () => {
                    const searchResultContainerHeader = element(by.css('.search-result__heading'));
                    return expect(searchResultContainerHeader.isDisplayed()).to.eventually.be.true;
                });
                it('should have job with proper city and country', () => {
                    const searchResultData = element(by.css('.search-result__location'));
                    return expect(searchResultData.getText()).to.eventually.contain(data.City.toUpperCase(), data.Country.toUpperCase());
                });
                it('should have apply button for job', () => {
                    const applyButton = element(by.css('.search-result__item-apply'));
                    return expect(applyButton.isDisplayed()).to.eventually.be.true;
                });
                describe('Applying to postition', () => {
                    const recruitPageHeaderElement = element(by.css('.recruiting-page__header'))
                    beforeEach(() => {
                        const applyButton = element.all(by.css('.search-result__item-apply'));
                        applyButton.first().click();
                        var EC = protractor.ExpectedConditions;
                        browser.wait(EC.elementToBeClickable(recruitPageHeaderElement), 5000);
                    });
                    it('should have job page loaded', () => {
                        return expect(recruitPageHeaderElement.isDisplayed()).to.eventually.be.true;
                    });
                    it('should have a proper position name in the title', () => {
                        return expect(recruitPageHeaderElement.getText()).to.eventually.contain(data.JobTitle);
                    });
                    it('should havea  proper location in the title', () => {
                        return expect(recruitPageHeaderElement.getText()).to.eventually.contain(data.City);
                    });
                });
            });
        });
    });
});
