import { createElement } from 'react';

import createAXAButtonReact from '@axa-ch/button/lib/index.react';
import createAXAContainerReact from '@axa-ch/container/lib/index.react';
import createAXALinkReact from '@axa-ch/link/lib/index.react';
import createAXAInputTextReact from '@axa-ch/input-text/lib/index.react';
import createAXATableSortable from '@axa-ch/table-sortable/lib/index.react';
import createAXADropdownReact from '@axa-ch/dropdown/lib/index.react';
import createAXADatepickerReact from '@axa-ch/datepicker/lib/index.react';
import createAXAFooterSmallReact from '@axa-ch/footer-small/lib/index.react';

export const AXAButton = createAXAButtonReact(createElement);
export const AXAContainer = createAXAContainerReact(createElement);
export const AXALink = createAXALinkReact(createElement);
export const AXADatepicker = createAXADatepickerReact(createElement);
export const AXAFooterSmall = createAXAFooterSmallReact(createElement);
export const AXAInputTextReact = createAXAInputTextReact(createElement);
export const AXATableSortableReact = createAXATableSortable(createElement);
export const AXADropdownReact = createAXADropdownReact(createElement);

AXATableSortableReact.displayName = "AXATableSortableReact";
AXAButton.displayName = "AXAButton";
AXAContainer.displayName = "AXAContainer";
AXALink.displayName = "AXALink";
AXADatepicker.displayName = "AXADatepicker";
AXAInputTextReact.displayName = "AXAInputTextReact";
AXADropdownReact.displayName = "AXADropdownReact";
AXAFooterSmall.displayName = "AXAFooterSmall";
