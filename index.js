const { Builder, By, until } = require('selenium-webdriver');
const util = require('util');

const delay = util.promisify(setTimeout);

(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.facebook.com');

    // registration popup button
    let registration_button = await driver.findElement(By.css("a[data-testid='open-registration-form-button']"));
    registration_button.click();

    await driver.wait(until.elementLocated(By.name('reg')), 10000);

    //first name
    await driver.findElement(By.name('firstname')).sendKeys('Bucky');
    await driver.findElement(By.name('lastname')).sendKeys('Barnes');
    await driver.findElement(By.name('reg_email__')).sendKeys('bucky.inbox@gmail.com');

    await driver.wait(until.elementLocated(By.name('reg_email_confirmation__')), 10000);
    await driver.findElement(By.name('reg_email_confirmation__')).sendKeys('bucky.inbox@gmail.com');

    await driver.findElement(By.name('reg_passwd__')).sendKeys('silverarm');

    await driver.findElement(By.name('birthday_day')).sendKeys('9');
    await driver.findElement(By.name('birthday_month')).sendKeys('july');
    await driver.findElement(By.name('birthday_year')).sendKeys('1994');
    await driver.findElement(By.css('input[type="radio"][name="sex"][value="2"]')).click();

    // email tab
    await driver.switchTo().newWindow('tab');
    await delay(3000);

    let handles = await driver.getAllWindowHandles();

    await driver.switchTo().window(handles[1]);
    await driver.get('https://www.gmail.com');
    await driver.findElement(By.name('identifier')).sendKeys('bucky.inbox@gmail.com');
    await driver.findElement(By.xpath(`//*[text()='Next']`)).click();

    await delay(3000);
    await driver.wait(until.elementLocated(By.name('Passwd')), 10000);
    await driver.findElement(By.name('Passwd')).sendKeys('<Bucky307km/>');
    await driver.findElement(By.xpath(`//*[text()='Next']`)).click();

    // problem
    // await delay(25000);
    // await driver.wait(until.elementLocated(By.xpath(`//*[contains(text(), 'Google')]`)), 10000);
    // await driver.findElement(By.xpath(`//*[contains(text(), 'Google')]`)).click();

    await delay(60000);
    await driver.switchTo().window(handles[0]);

    await delay(5000);
    await driver.quit();
})();
