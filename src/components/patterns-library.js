import { createElement } from 'react';

import createAXAButtonReact from '@axa-ch/button/lib/index.react';
import createAXAContainerReact from '@axa-ch/container/lib/index.react';

export const AXAButton = createAXAButtonReact(createElement);
export const AXAContainer = createAXAContainerReact(createElement);
