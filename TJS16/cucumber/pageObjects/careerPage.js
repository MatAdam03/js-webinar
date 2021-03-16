const { browser, element } = require("protractor");
const JobListingPage = require('./joblistingPage');
const joblistingPage = new JobListingPage();
class CareerPage {
    constructor() {
        this.cookieBoxButton = element(by.css('button[aria-label="Accept our use of cookies"]'));
        this.jobSearchForm = element(by.css('.job-search'));
        this.citySelectorDropdown = element(by.css('.recruiting-search__location'));
        this.citiesList = element(by.css('.select2-results>ul.select2-results__options'));
        this.skillSelector = element(by.css('.multi-select-filter'));
        this.selectedCityContainer = element(by.css('.select2-selection__rendered'));
        this.selectedSkillContainer = element.all(by.css('.selected-items>li'));
        this.searchSubmitButton = element(by.css('.recruiting-search__submit'));
        this.EC = protractor.ExpectedConditions;
        
    }
    async load() {
        browser.get('https://www.epam.com/careers');
        browser.sleep(2000);
        const cookie = await this.cookieBoxButton.isPresent();
        if (cookie) { await this.cookieBoxButton.click(); }
        return 0;
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
        const skillToSelect = element(by.cssContainingText('.checkbox-custom-label', skill));
        browser.sleep(500);      
        return await skillToSelect.click();
    }
    async loadJobListingPage(){
        return browser.wait(this.EC.elementToBeClickable(joblistingPage.searchResultContainerHeader), 5000);
    }

}
module.exports = CareerPage;