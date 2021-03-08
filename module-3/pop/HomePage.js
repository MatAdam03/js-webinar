/**
 * Create HomePage class representing the EPAM.com home page.
 * Add main widgets and element of the page and write tests
 * for it (test/pop/HomePage.spec.js).
 */
const Protractor = require("protractor");
const Element = require("./Element");
const Elements = require("./Elements");
const Layout = require("./Layout");

class HomePage extends Layout{   
constructor(){
    
    super('Home','http://epam.com', {css: 'html'});    
    this.bigtext = new Element('Engineering the Future',{css: '.title-slider__slide-row'});
    this.firstfeaturedcard = new Element("EPAM MAKES FORTUNE’S ‘100 FASTEST-GROWING COMPANIES’ LIST",{css: '.featured-content-card__title'});
    this.contactusbutton = new Element('CONTACT US',{css:'.cta-button-ui'});    
    this.americaoffices = new Element('AMERICAS',{css:'.tabs__title'}); 
    this.titlesliders = new Elements('titlesliders',{css:'.tabs__title'}); 
    this.image1 = new Elements('titleslidersimages',{css:'.rollover-tiles__image'}); 
    this.image2 = new Elements('titleslidersimages',{css:'.rollover-tiles__image'}); 
    this.image3 = new Elements('titleslidersimages',{css:'.rollover-tiles__image'}); 
    this.image4 = new Elements('titleslidersimages',{css:'.rollover-tiles__image'}); 
    this.image1 = new Elements('titleslidersimages',{css:'.rollover-tiles__image'}); 
    
    this.firstfeaturedcard.addChildren(new Element('Child1',{css:'.test'}));
    this.firstfeaturedcard.addChildren(new Element('Child2',{css:'.test'}));
    this.firstfeaturedcard.children['Child2'].addChildren(new Element('featurecardtextbox',{css:'.featured-content-card--block-5 .featured-content-card__description'}));
}
load(){
      
    return Protractor.browser.get(this.url);

}
}


module.exports=HomePage;