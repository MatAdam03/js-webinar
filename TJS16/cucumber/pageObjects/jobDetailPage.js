class JobDetail{
    constructor(){
        this.EC = protractor.ExpectedConditions;
        this.recruitPageHeaderElement = element(by.css('#main > article > div > header > h1'));
    }    
}
module.exports=JobDetail;