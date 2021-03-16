const { browser } = require("protractor");
const JobListingPage = require('./joblistingPage');
const joblistingPage = new JobListingPage();
class CareerPage {
    constructor() {
        this.headerLogo = element(by.css('img.header__logo'));
        this.cookieBoxButton = element(by.css('button[aria-label="Accept our use of cookies"]'));
        this.jobSearchForm = element(by.css('.job-search'));
        this.citySelectorDropdown = element(by.css('.recruiting-search__location'));
        this.skillSelector = element(by.css('.multi-select-filter'));
        this.selectedCityContainer = element(by.css('.select2-selection__rendered'));
        this.selectedSkillContainer = element.all(by.css('.selected-items>li'));
        this.searchSubmitButton = element(by.css('.recruiting-search__submit'));
        this.EC = protractor.ExpectedConditions;

    }
    acceptCookies() {
        browser.get('https://www.epam.com/careers');       
        browser.wait(this.EC.elementToBeClickable(this.cookieBoxButton), 5000);
        this.cookieBoxButton.click();
    }
    async load() {       
        browser.get('https://www.epam.com/careers');       
        browser.wait(this.EC.elementToBeClickable(this.headerLogo), 5000);
    }
    citySelector(city){
        return element(by.xpath(`//li[contains(text(),'${city}')]`));
    }
    countrySelector(country){
        return element(by.xpath(`//strong[contains(text(),'${country}')]`));
    }
    async selectCity(city, country) {
        const countrylocator = this.countrySelector(country);            
        const citylocator = this.citySelector(city);
        await this.citySelectorDropdown.click();
        browser.sleep(500);
        const clickable = await citylocator.isDisplayed();
        if (!clickable) {
            await countrylocator.click();
            await browser.wait(this.EC.visibilityOf(citylocator), 5000);
        }
        return await citylocator.click();
    }

    async selectSkill(skill) {
        this.skillSelector.click();
        browser.sleep(500);
        const skillToSelect = element(by.cssContainingText('.checkbox-custom-label', skill));
        return await skillToSelect.click();
    }
    async loadJobListingPage() {
        return browser.wait(this.EC.elementToBeClickable(joblistingPage.searchResultContainerHeader), 5000);
    }   

}
module.exports = CareerPage;