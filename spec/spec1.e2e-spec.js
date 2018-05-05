pageObject = require('../page-object.js');

describe('search testes', function() {
    beforeEach(function() {
        browser.get('http://www.angular.io/docs');
        browser.driver.manage().window().maximize();
    });

    //Проверка вставки в поле поиска
    xit('checks the pasting into search field', function() {
        browser.actions().mouseMove( {x: 285, y: 80}).mouseDown().mouseMove({x: 445, y: 80}).mouseUp().keyDown(protractor.Key.CONTROL).sendKeys('c').perform();
        browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('c').perform();
        var search=pageObject.search.click();
        browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('v').perform();
        expect(search.getAttribute('value')).toEqual('What is Angular?');
    });

    //Проверка ввода в поле поиска
    it('checks the input into search field', function() {
        var search=pageObject.search.click().sendKeys("");
        search.sendKeys("Search");
        expect(search.getAttribute('value')).toEqual('Search');
    });

    //Проверка работы поиска
    it('checks search', function() {
        var search=pageObject.search.sendKeys("Assumptions");
        browser.wait(search.getAttribute('.search-results').isDisplayed(),5000);
        expect(search.getAttribute('.search-results').isDisplayed()).toBeTruthy();
    });

    //Проверка того, что после клика по другим элементам страницы, поле поиска не очищается
    it('checks that search field save text after click on anther element of page', function() {
        var search=pageObject.search.sendKeys("Some text");
        pageObject.leftMenuItemLevel1.click();
        expect(search.getAttribute('value')).toEqual('Some text');
    });
});

describe('angular.io/docs testes', function() {
    beforeEach(function() {
        browser.get('http://www.angular.io/docs');
        browser.driver.manage().window().maximize();
    });

    //Проверяет, что при наведении на заголовок, элемент "link to this heading" становится видимым
    it('checks that after mouse over on title, element "link to this heading" is visible', function() {
        browser.actions().mouseMove((pageObject.title));
        expect(pageObject.linkToHeading.isPresent()).toBeTruthy();
    });

    //Проверка работы кнопки закрывающей боковое меню(закрытие меню) - не проходит
    it('checks that docs menu button close left menu (closing)', function() {
        pageObject.leftMenuButton.click();
        browser.sleep(2000);
        expect(pageObject.leftMenu.isDisplayed()).toBeFalsy();
    });

    //Проверяет соответсвия текста заголовка ожидаемому
    it('checks the title', function() {
        expect(pageObject.title.getText()).toEqual('What is Angular?');
    });

    //Проверка того, что боковое меню не отображается при уменьшении размеров окна браузера
    it('left menu is not displaying when window size is decreasing', function() {
        browser.driver.manage().window().setSize(1000, 1000);
        expect(pageObject.leftMenu.isDisplayed()).toBeFalsy();
    });

    //Проверка работы кнопки закрывающей боковое меню(открытие меню)
    it('checks that docs menu button close left menu (opening)', function() {
        pageObject.leftMenuButton.click().click();
        expect(pageObject.leftMenu.isDisplayed()).toBeTruthy();
    });

    //Проверка работы бокового меню (нажать на пункт Fundamentals, затем Architecture, свернуть Fundamentals, развертнуть Fundamentals)
    //результат: пункты меню 3 уровня не отображаются
    it('checks the condition of the left menu by menu items of level-1 and level-2 deployment', function() {
        var menuItemLevel1=pageObject.leftMenuItemLevel1.click();
        pageObject.leftMenuItemLevel2.click();
        menuItemLevel1.click().click();
        expect(pageObject.leftMenuGroupOfItemsLevel3.isDisplayed()).toBeFalsy();
    });

    // Проверка работы пункта меню
    it('checks that menu item works correctly', function() {
        pageObject.mainMenuItem.click();
        expect(browser.getCurrentUrl()).toEqual('https://angular.io/events');
    });

    //Проверка работы элемента 'Home' (переход на главную страницу)
    it('checks that Home button works correctly', function () {
        pageObject.home.click();
        expect(browser.getCurrentUrl()).toEqual('https://angular.io/');
    });

    //Проверка того, что пункты главного меню не отображаются на странице при уменьшении размеров окна
    it('main menu is not displaying when window size is decreasing', function() {
        browser.driver.manage().window().setSize(1000, 1000);
        expect(pageObject.mainMenuGroupOfItemsLevel1.isPresent()).toBeFalsy();
    });

    //Отображение китайской версии страницы
    it('Chinese version link', function() {
        pageObject.linkChineseLangVersion.click();
        expect(browser.getCurrentUrl()).toEqual('https://angular.cn/');
    });
});
