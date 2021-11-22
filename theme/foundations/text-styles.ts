const heading = {
  fontWeight: 400,
  fontFamily: 'heading',
  textTransform: 'lowercase',
}

const body = {
  fontFamily: 'body',
  fontWeight: 700,
}

const h1 = '64px'
const h2 = '48px'
const h3 = '40px'
const h4 = '32px'

export default {
  profileSectionHeading: {
    ...heading,
    fontSize: ['40px', '48px'],
  },
  h1: { ...heading, fontSize: h1 },
  h1body: { ...body, fontSize: h1 },
  h2: { ...heading, fontSize: h2 },
  h2body: { ...body, fontSize: h2 },
  h3: { ...heading, fontSize: h3 },
  h3body: { ...body, fontSize: h3 },
  h4: { ...heading, fontSize: h4 },
  h4body: { ...body, fontSize: h4 },
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
  largeBold: {
    fontFamily: 'body',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '24px',
  },
  base: {
    fontFamily: 'body',
    fontSize: '16px',
    lineHeight: '22px',
  },
  baseBold: {
    fontFamily: 'body',
    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 600,
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
  microBold: {
    fontFamily: 'body',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  nano: {
    fontFamily: 'body',
    textTransform: 'uppercase',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
}
