import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-Light/GothamPro-Light.ttf');
      font-weight: 300;
      font-style: normal;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-LightItalic/GothamPro-LightItalic.ttf');
      font-weight: 300;
      font-style: italic;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro/GothamPro.ttf');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-Italic/GothamPro-Italic.ttf');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: 'GothamPro';
      src:  url('/fonts/GothamPro-Medium/GothamPro-Medium.ttf');
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-MediumItalic/GothamPro-MediumItalic.ttf');
      font-weight: 500;
      font-style: italic;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-Bold/GothamPro-Bold.ttf');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-BoldItalic/GothamPro-BoldItalic.ttf');
      font-weight: 700;
      font-style: italic;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-Black/GothamPro-Black.ttf');
      font-weight: 900;
      font-style: normal;
    }

    @font-face {
      font-family: 'GothamPro';
      src: url('/fonts/GothamPro-BlackItalic/GothamPro-BlackItalic.ttf');
      font-weight: 900;
      font-style: italic;
    }
      `}
  />
)
export default Fonts
