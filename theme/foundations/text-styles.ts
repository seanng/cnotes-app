const heading = {
  fontWeight: 400,
  fontFamily: 'heading',
  textTransform: 'lowercase',
}

export default {
  hero: {
    ...heading,
    fontSize: ['80px'],
    lineHeight: '118px',
  },
  h1: {
    ...heading,
    fontSize: ['64px'],
    lineHeight: '94px',
  },
  h2: {
    ...heading,
    fontSize: ['48px'],
    lineHeight: '70px',
  },
  h3: {
    ...heading,
    fontSize: ['40px'],
    lineHeight: '58px',
  },
  h4: {
    ...heading,
    fontSize: ['32px'],
    lineHeight: '46px',
  },
  h5: {
    fontFamily: 'body',
    fontWeight: 700,
    fontSize: ['32px'],
    lineHeight: '36px',
  },
  xLarge: {
    fontFamily: 'body',
    fontSize: ['24px'],
    lineHeight: '28px',
  },
  large: {
    fontFamily: 'body',
    fontSize: ['18px'],
    lineHeight: '27px',
  },
  base: {
    fontFamily: 'body',
    fontSize: ['16px'],
    lineHeight: '22px',
  },
  small: {
    fontFamily: 'body',
    fontSize: ['14px'],
    lineHeight: '16px',
  },
  mini: {
    fontFamily: 'body',
    fontSize: ['12px'],
    lineHeight: '14px',
  },
  micro: {
    fontFamily: 'body',
    textTransform: 'uppercase',
    fontSize: ['12px'],
    letterSpacing: '5%',
    lineHeight: '18px',
  },
  nano: {
    fontFamily: 'body',
    textTransform: 'uppercase',
    fontSize: ['10px'],
    fontWeight: 600,
    letterSpacing: '0.05em',
    lineHeight: '11px',
  },

  // old...
  body1: {
    fontSize: ['24px'],
    lineHeight: '32px',
    fontFamily: 'body',
  },
  body2: {
    fontSize: ['16px'],
    lineHeight: '24px',
    fontFamily: 'body',
  },
  caption1: {
    fontSize: ['14px'],
    lineHeight: '24px',
    fontFamily: 'body',
  },
  caption2: {
    fontSize: ['12px'],
    lineHeight: '20px',
    fontFamily: 'body',
  },
  hairline1: {
    fontSize: ['16px'],
    fontWeight: 'bold',
    lineHeight: '16px',
    fontFamily: 'body',
    textTransform: 'uppercase',
  },
  hairline2: {
    fontSize: ['12px'],
    fontWeight: 'bold',
    lineHeight: '12px',
    fontFamily: 'body',
    textTransform: 'uppercase',
  },
  inputLabel: {
    fontSize: '10px',
    fontWeight: 'black',
    fontFamily: 'heading',
    textTransform: 'uppercase',
    color: '#808191',
    letterSpacing: '0.9px',
    lineHeight: '1.6px',
  },
}
