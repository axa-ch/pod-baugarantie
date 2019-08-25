import { Selector } from 'testcafe';

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

test('Should render table mobile', async t => {
  await t.navigateTo('/#/new')
  const $el = await Selector('.o-baug__app__contract-form-wrapper');
  await t.expect($el.exists).ok();
});

// HERE ALL MOBILE TESTS. DUPLICATION OF CODE HERE IS INTENDED


fixture('PAGE New - basic functionality mobile')
  .page(`${host}/`)
  .beforeEach(beforeEachHook(true));

test('Should render table mobile', async t => {
  await t.navigateTo('/#/new')
  const $el = await Selector('.o-baug__app__contract-form-wrapper');
  await t.expect($el.exists).ok();
});
