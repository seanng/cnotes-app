const heading = {
  fontWeight: 400,
  fontFamily: 'heading',
  textTransform: 'lowercase',
}

export default {
  hero: {
    ...heading,
    fontSize: '80px',
    lineHeight: '118px',
  },
  h1: {
    ...heading,
    fontSize: '64px',
    lineHeight: '94px',
  },
  h2: {
    ...heading,
    fontSize: '48px',
    lineHeight: '70px',
  },
  h3: {
    ...heading,
    fontSize: '40px',
    lineHeight: '58px',
  },
  h4: {
    ...heading,
    fontSize: '32px',
    lineHeight: '46px',
  },
  h5: {
    fontFamily: 'body',
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '36px',
  },
  xLarge: {
    fontFamily: 'body',
    fontSize: '24px',
    lineHeight: '28px',
  },
  large: {
    fontFamily: 'body',
    fontSize: '18px',
    lineHeight: '27px',
  },
  base: {
    fontFamily: 'body',
    fontSize: '16px',
    lineHeight: '22px',
  },
  small: {
    fontFamily: 'body',
    fontSize: '14px',
    lineHeight: '18px',
  },
  mini: {
    fontFamily: 'body',
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: 500,
  },
  micro: {
    fontFamily: 'body',
    textTransform: 'uppercase',
    fontSize: '12px',
    letterSpacing: '5%',
    fontWeight: 500,
    lineHeight: '18px',
  },
  nano: {
    fontFamily: 'body',
    textTransform: 'uppercase',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
}
