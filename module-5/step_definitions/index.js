'use strict';
const { Given, When, Then, setDefaultTimeout } = require('cucumber');
setDefaultTimeout(GLOBAL_TIMEOUT);
const { browser, element, by } = require("protractor");
const { expect } = require("chai");
const CareerPage = require('../pageObjects/careerPage');
const careerPage = new CareerPage();
const JobListingPage = require('../pageObjects/joblistingPage');
const joblistingPage = new JobListingPage();
const JobDetailPage = require('../pageObjects/jobDetailPage');
const jobdetailPage = new JobDetailPage();

Given("EPAM career page is opened", async () => {
    await careerPage.load();
})
Then("Job search form should be visible", () => {
    return expect(careerPage.jobSearchForm.isDisplayed()).to.eventually.be.true;
});

When(/Form location input field is filled with the (\w+) (\w+)/, async (country, city) => {
    await careerPage.selectCity(city, country);
})

When(/Form skills input field is filled with the (.+)/, async (skill) => {
    await careerPage.selectSkill(skill);
});

Then(/Selected location and skill should be visible. Location: (\w+) Skill : (.+)/, (city, skill) => {
    expect(careerPage.selectedCityContainer.getText()).to.eventually.equal(city);
    return expect(careerPage.selectedSkillContainer.getAttribute('data-value')).to.eventually.contain(skill);
});

When('The FIND button is clicked', async () => {
    return await careerPage.searchSubmitButton.click();
});

Then('The job-listing page should be loaded', async () => {
    await careerPage.loadJobListingPage();
    return expect(joblistingPage.searchResultContainerHeader.isDisplayed()).to.eventually.be.true;
});
Then(/The position name should be visible. PositionName: (.*)/, (position) => {
    return expect(joblistingPage.searchResultPosition.getText()).to.eventually.contain(position);
});
Then(/The fitting jobs should be listed with (\w+) (\w+)/, (country, city) => {
    return expect(joblistingPage.searchResultLocation.getText()).to.eventually.contain(city.toUpperCase(), country.toUpperCase());
});

Then('Apply button should be present', () => {
    return expect(joblistingPage.applyButton.isDisplayed()).to.eventually.be.true;
});

When('The APPLY button is clicked', async () => {
    return await joblistingPage.jobApply();  
    
});

Then(/The Job detail page should be loaded with proper (\w+) and (.+)/, async (city, position) => {
    expect(jobdetailPage.recruitPageHeaderElement.getText()).to.eventually.contain(city);
    return expect(jobdetailPage.recruitPageHeaderElement.getText()).to.eventually.contain(position);
});