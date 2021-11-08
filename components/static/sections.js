export const Head = `
<head>
  <meta charset="utf-8">
  <link href="/landing/css/normalize.min.css" rel="stylesheet" type="text/css">
  <link href="/landing/css/webflow.min.css" rel="stylesheet" type="text/css">
  <link href="/landing/css/cnotes-landing.webflow.min.css" rel="stylesheet" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
  <script type="text/javascript">WebFont.load({ google: { families: ["Asap:regular,500,600,700"] } });</script>
  <!-- [if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js" type="text/javascript"></script><![endif] -->
  <script
    type="text/javascript">! function (o, c) { var n = c.documentElement, t = " w-mod-"; n.className += t + "js", ("ontouchstart" in o || o.DocumentTouch && c instanceof DocumentTouch) && (n.className += t + "touch") }(window, document);</script>
  <link href="/favicon.ico" rel="apple-touch-icon">
</head>
`

export const Navbar = `
<div data-collapse="medium" data-animation="over-left" data-duration="400"
  data-w-id="58db7844-5919-d71b-dd74-2323ed8dffe9" data-easing="ease" data-easing2="ease" role="banner"
  class="header w-nav">
  <div class="container-default w-container">
    <div class="header-wrapper">
      <div class="split-content header-right">
        <a href="/" aria-current="page" class="brand w-nav-brand w--current">
          <div class="text-block">collabski</div>
        </a>
      </div>
      <div class="split-content header-center">
        <nav role="navigation" class="nav-menu w-nav-menu">
          <ul role="list" class="header-navigation w-list-unstyled">
            <li class="nav-item-wrapper">
              <a href="/" aria-current="page" class="nav-link w--current">For Brands</a>
            </li>
            <li class="nav-item-wrapper">
              <a href="/for-creators" class="nav-link">For Creators</a>
            </li>
            <li class="nav-item-wrapper">
              <div data-hover="true" data-delay="0" data-w-id="f05a5eb5-5b4f-2c04-369b-54bf4593dba1"
                class="nav-link-dropdown w-dropdown">
                <div class="nav-link dropdown w-dropdown-toggle">
                  <div>Learn&nbsp;&nbsp;<span class="dropdown-arrow"></span></div>
                </div>
                <nav class="dropdown-list w-dropdown-list">
                  <div class="dropdown-nav-main-wrapper">
                    <div class="dropdown-nav-pages-wrapper">
                      <div class="title dropdown">Company</div>
                      <div class="dropdown-nav-content">
                        <ul role="list" class="dropdown-nav">
                          <li class="dropdown-nav-item">
                            <a href="/about" aria-current="page" class="dropdown-nav-link w--current">About
                              us</a>
                          </li>
                          <!-- <li class="dropdown-nav-item">
                                <a href="/faq" aria-current="page" class="dropdown-nav-link w--current">FAQ</a>
                              </li> -->
                          <li class="dropdown-nav-item">
                            <a href="about.html" class="dropdown-nav-link">Blog</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="dropdown-nav-pages-wrapper">
                      <div class="title dropdown">Brands</div>
                      <div class="dropdown-nav-content">
                        <ul role="list" class="dropdown-nav">
                          <li class="dropdown-nav-item">
                            <a href="index.html" aria-current="page" class="dropdown-nav-link w--current">Why
                              sponsor?</a>
                          </li>
                          <li class="dropdown-nav-item">
                            <a href="index.html" aria-current="page" class="dropdown-nav-link w--current">Your first
                              sponsorship</a>
                          </li>
                          <li class="dropdown-nav-item">
                            <a href="index.html" class="dropdown-nav-link">How to price</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="dropdown-nav-pages-wrapper">
                      <div class="title dropdown">Creators</div>
                      <div class="dropdown-nav-content">
                        <ul role="list" class="dropdown-nav">
                          <li class="dropdown-nav-item">
                            <a href="index.html" aria-current="page" class="dropdown-nav-link w--current">Getting
                              Started</a>
                          </li>
                          <li class="dropdown-nav-item">
                            <a href="index.html" aria-current="page" class="dropdown-nav-link w--current">How to
                              price</a>
                          </li>
                          <li class="dropdown-nav-item">
                            <a href="about.html" class="dropdown-nav-link">Media Kits</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </li>
            <li class="nav-item-wrapper">
              <a href="/pricing" class="nav-link">Pricing</a>
            </li>
            <li class="nav-item-wrapper mobile">
              <a href="/login" class="nav-link sign-in mobile">Sign in</a>
            </li>
            <li class="nav-item-wrapper mobile-button">
              <div class="button-primary-gradient header-button mobile-button">
                <a href="/signup/brand" class="button-primary small-v2 mobile-button w-button">Get started</a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div class="split-content header-left">
        <a href="/login" class="nav-link sign-in">Log in</a>
        <a href="/signup" class="button-primary small-v2 w-button">Sign up</a>
        <div class="menu-button w-nav-button">
          <div class="header-menu-button-icon-wrapper">
            <div class="icon-wrapper">
              <div class="header-menu-button-icon-top"></div>
              <div class="header-menu-button-icon-medium"></div>
              <div class="header-menu-button-icon-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`

export const Footer = `
<footer class="footer">
  <div class="container-default w-container">
    <div data-w-id="7ddc8154-5985-c814-10de-e9f5faad4e13" class="footer-content-bottom">
      <div class="footer-small-print">Copyright © Collabski</div>
    </div>
  </div>
</footer>
`
