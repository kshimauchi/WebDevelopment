import React from 'react';

import { Blog, Footer, Possibility, Features, WhatGPT3, Header} from './containers';
import { CTA, Brand, Navbar } from './components';

const App = () => {
  return (
    <div className= "App">
      <div className="gradient_bg">

        <Navbar />
        <Header />

      </div>
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility/>
      <CTA />
      <Blog />
      <Footer />


    </div>
  )
}

export default App