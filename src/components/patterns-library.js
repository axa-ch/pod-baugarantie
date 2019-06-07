import { createElement } from 'react';

import createAXAButtonReact from '@axa-ch/button/lib/index.react';
import createAXAContainerReact from '@axa-ch/container/lib/index.react';
import createAXALinkReact from '@axa-ch/link/lib/index.react';
import createAXAInputTextReact from '@axa-ch/input-text/lib/index.react';

export const AXAButton = createAXAButtonReact(createElement);
export const AXAContainer = createAXAContainerReact(createElement);
export const AXALink = createAXALinkReact(createElement);
export const AXAInputTextReact = createAXAInputTextReact(createElement);
