import React, { Component } from 'react';
import Header from './Header'
import Meta from './Meta'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import theme from '../lib/theme'

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  html{
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  } 

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
  }

  a{
    text-decoration: none;
    color: ${theme.black};
  }
`

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            {this.props.children}
          </Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;