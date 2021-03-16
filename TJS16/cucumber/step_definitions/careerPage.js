'use strict';
const { Given, When, Then, setDefaultTimeout, Before, After, BeforeAll, AfterAll } = require('cucumber');
setDefaultTimeout(GLOBAL_TIMEOUT);
const { browser, element, by } = require("protractor");
const { expect } = require("chai");
const CareerPage = require('../pageObjects/careerPage');
const careerPage = new CareerPage();
const JobListingPage = require('../pageObjects/joblistingPage');
const joblistingPage = new JobListingPage();
const JobDetailPage = require('../pageObjects/jobDetailPage');
const jobdetailPage = new JobDetailPage();
const Mongo = require("../support/mongohandler")
BeforeAll(async () => {
    await Mongo.MongoConnect()
})

AfterAll(async () => {
    await Mongo.MongoClose()
})

Given("EPAM career page is opened", async () => {
    await careerPage.load();
})
Then("Job search form should be visible", () => {
    return expect(careerPage.jobSearchForm.isDisplayed()).to.eventually.be.true;
});

When(/form location input field is filled with the Country and City from (\d)/, async (nth) => {
    const testdata = await Mongo.GetData(nth);
    await careerPage.selectCity(testdata.City, testdata.Country);
})

When(/Form skills input field is filled with the (\d)/, async (nth) => {
    const testdata = await Mongo.GetData(nth);
    await careerPage.selectSkill(testdata.Skill);
})

Then(/Selected location and skill should be visible with Location and Skill of (\d)/, async (nth) => {
    const testdata = await Mongo.GetData(nth);
    expect(careerPage.selectedCityContainer.getText()).to.eventually.equal(testdata.City);
    return expect(careerPage.selectedSkillContainer.getAttribute('data-value')).to.eventually.contain(testdata.Skill);
});
When('The FIND button is clicked', async () => {
    console.log("ASSDAS");
    return await careerPage.searchSubmitButton.click();
});

Then('The job-listing page should be loaded', async () => {
    await careerPage.loadJobListingPage();
    return expect(joblistingPage.searchResultContainerHeader.isDisplayed()).to.eventually.be.true;
});
Then(/The position name should be visible with the PositionName of (\d)/, async (nth) => {
    const testdata = await Mongo.GetData(nth);
    return expect(joblistingPage.searchResultPosition.getText()).to.eventually.contain(testdata.PositionName);
});

Then(/The fitting jobs should be listed with Country and City of (\d)/, async (nth) => {
    const testdata = await Mongo.GetData(nth);
    return expect(joblistingPage.searchResultLocation.getText()).to.eventually.contain(testdata.City.toUpperCase(), testdata.Country.toUpperCase());
});

Then('Apply button should be present', () => {
    return expect(joblistingPage.applyButton.isDisplayed()).to.eventually.be.true;
});

When('The APPLY button is clicked', async () => {
    return await joblistingPage.jobApply();

});

Then(/The Job detail page should be loaded with proper City and PositionName of (\d)/, async (nth) => {
    const testdata = await Mongo.GetData(nth);
    expect(jobdetailPage.recruitPageHeaderElement.getText()).to.eventually.contain(testdata.City);
    return expect(jobdetailPage.recruitPageHeaderElement.getText()).to.eventually.contain(testdata.PositionName);
});