import { Selector, ClientFunction } from 'testcafe';

const host = 'http://localhost:9999';

const beforeEachHook = (mobile = true) => async (t) => {
  if (mobile) {
    await t.resizeWindow(350, 700);
  } else {
    await t.resizeWindow(1920, 1080);
  }
  await t.typeText( 'input[name="username"]', 'testuser' );
  await t.typeText( 'input[name="password"]', 'testpassword' );
  await t.click('axa-button[type="submit"]');
  await t.wait( 300 );
}

fixture('PAGE New - basic functionality desktop')
  .page(`${host}/`)
  .beforeEach(beforeEachHook(false));

test('Should render form desktop', async t => {
  await t.navigateTo('/#/new')
  const $el = await Selector('.o-baug__app__contract-form-wrapper');
  await t.expect($el.exists).ok();
});

test('Should fill form desktop', async t => {
  await t.navigateTo('/#/new')
  await t.typeText( 'input[name="company_name"]', 'test_data' );
  await t.typeText( 'input[name="company_name_1"]', 'test_data 1' );
  await t.typeText( 'input[name="company_name_2"]', 'test_data 2' );
  await t.typeText( 'input[name="place"]', 'Winterthur' );
  await t.typeText( 'input[name="post_code"]', '8406' );


  const openCalendar = await Selector(() =>
    document
      .querySelector(`axa-datepicker`)
      .querySelector('button[class*="m-datepicker__input-button"]')
  )
  await t.click(openCalendar);


  const dropDown = await Selector(() =>
    document
      .querySelector(`axa-datepicker`)
      .querySelector('axa-dropdown')
  );

  await t.click(dropDown);
  const monthFebruary = Selector(() =>
    document
      .querySelector(`axa-datepicker`)
      .querySelector('axa-dropdown[class*="js-datepicker__dropdown-month"]')
      .querySelector('button[data-index="1"]')
  )
  await t.click(monthFebruary);

  const dayToSelect = await Selector(() => {
    const month = '';
    return document
      .querySelector('axa-datepicker')
      .querySelector(
        `button[class*="m-datepicker__calendar${month}-current-month"][data-day="15"]`
      );
  });
  await t.click(dayToSelect);

  const submitButton = await Selector(() =>
    document
      .querySelector(`axa-datepicker`)
      .querySelector('axa-button[class*="js-datepicker__button-ok"]')
  );
  await t.click(submitButton);

  const getInputValue = ClientFunction(
    () =>
      document.querySelector(
        `axa-datepicker`
      ).value
  );
  await t.expect(await getInputValue()).eql('15.2.2019');

  const dropdown = await Selector(() =>
    document.querySelector('axa-dropdown[title="Schweiz"]')
  );
  const secondOption = await Selector(() =>
    document.querySelector('axa-dropdown[title="Schweiz"] button[data-index="1"]')
  );
  await t.click(dropdown);
  await t.click(secondOption);

  const formData = await ClientFunction(() => {
    const form = document.querySelector('form');

    return Object.fromEntries(new FormData(form).entries());
  });

  await t.expect(JSON.stringify(await formData())).eql(
    '{"company_name":"test_data","company_name_1":"test_data 1","company_name_2":"test_data 2","post_code":"8406","place":"Winterthur"}'
  );
});

// HERE ALL MOBILE TESTS. DUPLICATION OF CODE HERE IS INTENDED


fixture('PAGE New - basic functionality mobile')
  .page(`${host}/`)
  .beforeEach(beforeEachHook(true));

test('Should render form mobile', async t => {
  await t.navigateTo('/#/new')
  const $el = await Selector('.o-baug__app__contract-form-wrapper');
  await t.expect($el.exists).ok();
});
