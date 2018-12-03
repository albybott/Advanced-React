import { css } from 'styled-components'

// use em in breakpoints to work properly cross-browser and support users
// changing their browsers font-size: https://zellwk.com/blog/media-query-units/
// const emSize = sizes[label] / 16
// em breakpoints based on Rebass defaults
const sizes = {
  desktop: 80,
  laptop: 64,
  tablet: 48,
  phone: 40,
}

// Iterate through the sizes and create a media template
/// max-width: apply to all screen sizes equal to or narrower than _size
/// max-width: apply to all screen sizes equal to or wider than _size

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}em) {
      ${css(...args)};
    }
  `
  return acc
}, {})

/* Now that you've defined your media templates, you can use them like this:
const MediaThemedH1 = styled.h1`
  ${props => props.theme.media.desktop`color: ${props.theme.fifth}`};
  ${props => props.theme.media.tabletLarge`color: ${props.theme.second}`};
  ${props => props.theme.media.tabletSmall`color: ${props.theme.fourth}`};
  ${props => props.theme.media.phone`color: ${props.theme.main}`};
`;
*/

const theme = {
  media,
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

export default theme