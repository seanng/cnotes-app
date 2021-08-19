const heading = {
  letterSpacing: '-0.02em',
  fontWeight: 'bold',
  fontFamily: 'heading',
}

export default {
  hero: {
    ...heading,
    fontSize: ['96px'],
    lineHeight: '96px',
  },
  h1: {
    ...heading,
    fontSize: ['64px'],
    lineHeight: '64px',
  },
  h2: {
    ...heading,
    fontSize: ['48px'],
    lineHeight: '56px',
  },
  h3: {
    ...heading,
    fontSize: ['40px'],
    lineHeight: '48px',
  },
  h4: {
    ...heading,
    fontSize: ['32px'],
    lineHeight: '40px',
  },
  body1: {
    fontSize: ['24px'],
    lineHeight: '32px',
    letterSpacing: '-0.01em',
    fontFamily: 'body',
  },
  body2: {
    fontSize: ['16px'],
    lineHeight: '24px',
    fontFamily: 'body',
  },
  caption: {
    fontSize: ['14px'],
    lineHeight: '24px',
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
}
