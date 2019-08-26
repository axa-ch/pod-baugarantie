// These imports needs to be moved always to index. So if we have a POD in future
// and remove the footer, we dont need this file anymore and have to copy paste the
// pod.js here LEAVING these polyfills
import '@axa-ch/patterns-library-polyfill';
import 'core-js/modules/es6.symbol';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.array.find-index';
import 'core-js/modules/es6.string.starts-with';
import 'core-js/modules/es6.string.includes'
import 'whatwg-fetch';

import { withTranslation } from 'react-i18next';

import React, { useState } from 'react';

import { AXAFooterSmall } from './components/patterns-library';

import PodBaugarantie from './index';
import { LANGUAGES, initTranslations } from './i18n';

export default class WithFooterBaugarantie extends PodBaugarantie {
  init() {

    const { options : { language } } = this;

    initTranslations(language);

    const DemoApp = ({ t, i18n }) => {
      const [lng, setLng] = useState(language.toUpperCase());

      const handleFooterLanguageChange = newLng => {
        setLng(newLng)
        i18n.changeLanguage(newLng.toLowerCase());
      };

      const handleFooterDisclaimerChange = disclaimer => {
        // TODO:
        console.log(disclaimer);
      };

      const languages = LANGUAGES.map(configuredLng => ({ text: configuredLng.toUpperCase()}));
      const disclaimer = [
        {
          text: t('bg.footer.term_of_use')
        },
        {
          text: t('bg.footer.data_protection')
        }
      ];
      return (<>
        <AXAFooterSmall
          languageItems={languages}
          disclaimerItems={disclaimer}
          onLanguageChange={handleFooterLanguageChange}
          onDisclaimerChange={handleFooterDisclaimerChange}
          activeLanguage={lng}
          copyrightText={t('bg.footer.copyright')}
          dynamic
        />
      </>);
    };

    super.init(withTranslation()(DemoApp));
  };
}
