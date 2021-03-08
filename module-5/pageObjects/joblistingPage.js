const JobDetailPage = require('./jobDetailPage');
const jobdetailPage = new JobDetailPage();
class JobListing {
    constructor() {
        this.searchResultContainerHeader = element(by.css('.search-result__heading'));
        this.searchResultPosition = element(by.css('.search-result__item-name'));
        this.searchResultLocation = element(by.css('.search-result__location'));
        this.applyButton = element(by.css('.search-result__item-apply'));
        this.EC = protractor.ExpectedConditions;
    }

    async jobApply() {
        await this.applyButton.click(); 
        return await browser.wait(this.EC.elementToBeClickable(jobdetailPage.recruitPageHeaderElement), 5000);        
    }
}
module.exports = JobListing;