import React from 'react';
// import { connect } from 'react-redux';

import { AXATableSortableReact, AXAInputTextReact } from '../../patterns-library';

const model = {
  thead: [
    { html: 'Title 0', sort: 'ASC' },
    { html: 'Title 1', sort: 'ASC' },
    { html: 'Title 3', sort: 'DESC' },
    { html: 'Title 2' },
  ],
  tbody: [
    [
      { html: '<span>11 Some Text</span>' },
      { html: '<span>Some Text</span>' },
      { html: '<span>Cell 2</span>' },
      { html: 'A' },
    ],
    [
      { html: '<span>1 Some Text</span>' },
      { html: '<span>Z Some Text</span>' },
      { html: '<span>Cell 2</span>' },
      { html: 'B' },
    ],
    [
      { html: '<span>2 Some Text</span>' },
      { html: '<span>A Some Text</span>' },
      { html: '<span>Cell 2</span>' },
      { html: 'C' },
    ],
  ],
};

for(let i = 0; i < 100; i++) {
  model.tbody.push(
    [
      { html: `<span>${i} 11 Some Text ${i}</span>` },
      { html: `<span>Some Text ${i}</span>` },
      { html: `<span>${i}Cell 2</span>` },
      { html: `A ${i}` },
    ],
  )
}


const Ongoing = (

) => (
  <>
    <h1 className="o-baug__app__content-table-title">Laufende Garantiescheine</h1>
    <div className="o-baug__app__content-table-search">
      <AXAInputTextReact
        type="text"
        placeholder="Suche"
        onChange={({ target: { value } }) => console.log(value)}
        name="search-table"
      />
    </div>
    <article className="o-baug__app__content-table">
      <AXATableSortableReact innerscroll="800" model={model} />
    </article>
  </>
);

Ongoing.propTypes = {

};

export default Ongoing;
