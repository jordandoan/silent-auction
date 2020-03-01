import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';

import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';


function Index() {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
