//module.exports.PageObject=PageObject;
module.exports = new PageObject();
function PageObject()
{
    this.title=element(by.css('#what-is-angular'));
    this.search=element(by.css('.search-container input'));
    this.leftMenuButton=element(by.css('.hamburger.mat-button'));
    this.leftMenu=element(by.css('.sidenav'));
    this.home=element(by.css('.nav-link.home'));
    this.leftMenuItemLevel1=element(by.css('[title="The fundamentals of Angular"]'));
    this.leftMenuItemLevel2=element(by.css('[title="The basic building blocks of Angular applications."]'));
    this.leftMenuGroupOfItemsLevel3=element(by.css('.heading-children.level-2'));
    this.mainMenuItem=element(by.css('[href="events"]'));
    this.linkChineseLangVersion=element(by.css('.link[title="中文版"]'));
    this.mainMenuGroupOfItemsLevel1=element(by.css('ul [role="navigation"]'));
    this.linkToHeading=element(by.css('.material-icons'));
}