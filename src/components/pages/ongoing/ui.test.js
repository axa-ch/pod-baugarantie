import { Selector } from 'testcafe';

const host = 'http://localhost:9999';

const beforeEachHook = (mobile = true) => async (t) => {
  if (mobile) {
    await t.resizeWindow(350, 700);
  } else {
    await t.maximizeWindow();
  }
  await t.typeText( 'input[name="username"]', 'testuser' );
  await t.typeText( 'input[name="password"]', 'testpassword' );
  await t.click('axa-button[type="submit"]');
  await t.wait( 300 );
}

fixture('PAGE Ongoing - basic functionality desktop')
  .page(`${host}/`)
  .beforeEach(beforeEachHook(false));

test('Should render table', async t => {
  await t.navigateTo('/#/ongoing')
  const $el = await Selector('axa-table-sortable');
  await t.expect($el.exists).ok();
});


fixture('PAGE Ongoing - basic functionality mobile')
  .page(`${host}/`)
  .beforeEach(beforeEachHook(true));

test('Should render table', async t => {
  await t.navigateTo('/#/ongoing')
  const $el = await Selector('axa-table-sortable');
  await t.expect($el.exists).ok();
});
