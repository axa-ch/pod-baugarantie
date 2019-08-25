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

fixture('PAGE Ongoing - basic functionality desktop')
  .page(`${host}/`)
  .beforeEach(beforeEachHook(false));

test('Should render table', async t => {
  await t.navigateTo('/#/ongoing')
  const $el = await Selector('axa-table-sortable');
  await t.expect($el.exists).ok();
});

test('Should search table', async t => {
  await t.navigateTo('/#/ongoing')
  await t.typeText('input[name="search-table"]', '99' );
  await t.wait( 600 );
  const $axaElemShadow = await Selector(
    () => document.querySelector('axa-table-sortable').shadowRoot
  );
  const $axaElemShadowEl = await $axaElemShadow.find('tbody tr');
  await t.expect($axaElemShadowEl.count).eql(1);
});

test('Should render big table', async t => {
  await t.navigateTo('/#/ongoing');

  const dropdown = await Selector(() =>
    document.querySelector('axa-dropdown')
  );
  const secondOption = await Selector(() =>
    document.querySelector('axa-dropdown button[data-index="1"]')
  );
  await t.click(dropdown);
  await t.click(secondOption);

  await t.wait( 1400 );

  const $elPagination = await Selector('.o-baug__app__content-table-pagination-text').addCustomDOMProperties({
    innerHTML: el => el.innerHTML,
  });

  await t.expect($elPagination.innerHTML).eql('Seite 1 von 201');

  await t.typeText('input[name="search-table"]', '999' );

  await t.wait( 1000 );

  const $elPaginationFilter = await Selector('.o-baug__app__content-table-pagination-text').addCustomDOMProperties({
    innerHTML: el => el.innerHTML,
  });

  await t.expect($elPaginationFilter.innerHTML).eql('Seite 1 von 3');

  const $axaElemShadow = await Selector(
    () => document.querySelector('axa-table-sortable').shadowRoot
  );
  const $axaElemShadowEl = await $axaElemShadow.find('tbody tr');
  await t.expect($axaElemShadowEl.count).eql(100);
});


// HERE ALL MOBILE TESTS. DUPLICATION OF CODE HERE IS INTENDED


fixture('PAGE Ongoing - basic functionality mobile')
  .page(`${host}/`)
  .beforeEach(beforeEachHook(true));

test('Should render table mobile', async t => {
  await t.navigateTo('/#/ongoing')
  const $el = await Selector('axa-table-sortable');
  await t.expect($el.exists).ok();
});

test('Should search table mobile', async t => {
  await t.navigateTo('/#/ongoing')
  await t.typeText('input[name="search-table"]', '99' );
  await t.wait( 600 );
  const $axaElemShadow = await Selector(
    () => document.querySelector('axa-table-sortable').shadowRoot
  );
  const $axaElemShadowEl = await $axaElemShadow.find('tbody tr');
  await t.expect($axaElemShadowEl.count).eql(1);
});

test('Should render big table on mobile', async t => {
  await t.navigateTo('/#/ongoing');

  const dropdown = await Selector(() =>
    document.querySelector('axa-dropdown')
  );
  const secondOption = await Selector(() =>
    document.querySelector('axa-dropdown option[data-index="1"]')
  );
  await t.click(dropdown);
  await t.click(secondOption);

  await t.wait( 1400 );

  const $elPagination = await Selector('.o-baug__app__content-table-pagination-text').addCustomDOMProperties({
    innerHTML: el => el.innerHTML,
  });

  await t.expect($elPagination.innerHTML).eql('Seite 1 von 201');

  await t.typeText('input[name="search-table"]', '999' );

  await t.wait( 1000 );

  const $elPaginationFilter = await Selector('.o-baug__app__content-table-pagination-text').addCustomDOMProperties({
    innerHTML: el => el.innerHTML,
  });

  await t.expect($elPaginationFilter.innerHTML).eql('Seite 1 von 3');

  const $axaElemShadow = await Selector(
    () => document.querySelector('axa-table-sortable').shadowRoot
  );
  const $axaElemShadowEl = await $axaElemShadow.find('tbody tr');
  await t.expect($axaElemShadowEl.count).eql(100);
});
