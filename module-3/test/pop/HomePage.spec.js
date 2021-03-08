const HomePage = require('../../pop/HomePage');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = require('chai').expect;

const Element = require('../../pop/Element');
const { browser, element, ElementFinder } = require('protractor');

describe('HomePage Class', () => {
    before(() => {
        browser.waitForAngularEnabled(false);
        browser.driver.manage().window().setPosition(2000, 0);
        browser.driver.manage().window().maximize();
    })
   
    it('should have a title', () => {
        const page = new HomePage();
        page.load();
        expect(page.bigtext.get().getText()).to.eventually.equal(page.bigtext.name);

    });
    
    it('should have a copyright message', () => {
        const page = new HomePage();
        page.load();
        expect(element(By.css('.footer__copyright')).isPresent()).to.eventually.equal(true);

    });

    
    it('should have a contact us button', () => {
        const page = new HomePage();
        page.load();
        expect(page.contactusbutton.get().getText()).to.eventually.equal(page.contactusbutton.name);


    });
    it('should throw error.', () => {
        const page = new HomePage();
        page.load();
        try {
            page.firstfeaturedcard.get('asd')
        } catch (err) {
            expect(err.message).to.equal("not found")
        }

    });
    it('featuredcardtextbox should have the proper value', () => {
        const page = new HomePage();
        page.load();
        expect(page.firstfeaturedcard.get('featurecardtextbox').getText()).to.eventually.equal('Thanks to cloud, big data and increasingly sophisticated business intelligence tools, merchant acquirers can now see who is driving up their profitability—and which are bringing it down.');

    });
    it('should have 4 title-slider', () => {
        const page = new HomePage();
        page.load();       
        expect(page.titlesliders.all()).to.eventually.have.lengthOf(4);
    });
    it('should have only 5 rollover-tiles image', () => {
        const page = new HomePage();
        page.load();
        expect(element.all(By.css('.rollover-tiles__image'))).to.eventually.have.lengthOf(5);
    });  

    it('should have a load function', () => {
        const page = new HomePage();
        page.load();
        expect(browser.getCurrentUrl()).to.eventually.equal('https://www.epam.com/');


    });
});