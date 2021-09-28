import NextLink from 'next/link'
import NextImage from 'next/image'
import HeroPic1 from 'public/temp/images/main-pic-1.png'
import HeroPic2 from 'public/temp/images/main-pic-2.png'
import HeroPic5 from 'public/temp/images/main-pic-4.png'
import HeroPic6 from 'public/temp/images/main-pic-6.png'
import PurpleBg from 'public/temp/images/main-pic-5-purpBg.svg'
import Feature1 from 'public/temp/images/Feature1.png'
// import Feature2 from 'public/temp/images/Feature2.png'
import Feature3 from 'public/temp/images/Feature3.png'
import Feature4 from 'public/temp/images/Feature4.png'
// import Feature5 from 'public/temp/images/Feature5.png'
import ArrowRight from 'public/temp/images/arrow-right.svg'

const t = {
  hero: {
    heading: 'Highly curated content creators',
    subheading:
      'Engage your audience by working with the best mechanical keyboard content creators on YouTube and TikTok. Only on cnotes.',
  },
  section1: {
    title: 'Why sponsor content creators?',
    heading: "Videos don't get pulled down.",
    subheading: 'Pay one time. Promote your brand forever.',
    body: 'Fun fact: 1 in 3 millennials make purchases after seeing a sponsored post on social media.',
    statNumber: '58%',
    statText: 'Increase in clickthrough rate',
  },
  section2: {
    title: 'Why cnotes?',
    heading: 'Cut out problems brands face when working with creators.',
    subheading:
      "Here are some problems we've identified after working with content creators for over 6 years, and how we address them through our platform:",
  },
  problem1: {
    title: '"It\'s difficult to get in touch with creators."',
    body: 'Creators get a lot of email spam and are therefore unresponsive. We make sure your offers are taken care of and responded to.',
  },
  problem2: {
    title: '"It can take months to finalize a deal."',
    body: 'Discover what other brands are offering for sponsorship prices through our platform, as well as what creators have earned in the past.',
  },
  problem3: {
    title: '"Creators disappear midway through the deal."',
    body: 'We vet and curate each creator on our platform, having worked with them in the past. We also closely monitor each transaction to ensure there are no bad actors on either side.',
  },
}

export default function LandingPageTemplate() {
  return (
    <div className="folio-body">
      <div className="page">
        <div className="main">
          <div className="main__center center">
            <div className="main__wrap landing">
              <h1 className="main__title folio_title">
                <p>{t.hero.heading}</p>
              </h1>
              <div
                className="main__info"
                data-aos="animation-translate-up"
                data-aos-delay={200}
              >
                <p>{t.hero.subheading}</p>
              </div>
              <div
                className="main__btn"
                data-aos="animation-translate-up"
                data-aos-delay={400}
              >
                <NextLink href={'/signup'}>
                  <button className="folio_btn btn_primary">Join Now</button>
                </NextLink>
              </div>
            </div>

            <div className="main__bg" data-aos>
              <div className="main__preview">
                <NextImage className="main__pic" src={HeroPic1} alt="" />
              </div>
              <div className="main__preview"></div>
              <div className="main__preview">
                {/*heart eyes*/}
                <NextImage
                  className="main__pic js-parallax"
                  data-scale="0.5"
                  data-orientation="up"
                  src={HeroPic2}
                  alt=""
                />
              </div>
              <div className="main__preview">
                {/*heart icon*/}
                <NextImage
                  className="main__pic js-parallax"
                  data-scale="1.2"
                  data-orientation="right"
                  src={HeroPic5}
                  alt=""
                />
              </div>
              <div className="main__preview">
                {/*Fir eeye*/}
                <img
                  className="main__pic js-parallax"
                  data-orientation="down"
                  src={PurpleBg}
                  alt=""
                />
              </div>
              <div className="main__preview">
                {/*grid image*/}
                <NextImage
                  className="main__pic js-parallax"
                  data-scale="1.5"
                  data-orientation="down"
                  src={HeroPic6}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="line">
            <svg
              className="line__svg"
              xmlns="http://www.w3.org/2000/svg"
              width={642}
              height={820}
            >
              <path
                className="path"
                fill="none"
                stroke="#d1ecfd"
                strokeWidth={2}
                d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
              />
            </svg>
          </div>
        </div>

        <div className="folio_details js-details" id="details">
          <div className="bg">
            <div className="bg__preview">
              <img
                className="bg__pic js-parallax"
                data-scale="1.3"
                data-orientation="left"
                src="img/bg.svg"
                alt=""
              />
            </div>
          </div>
          <div className="details__center center">
            <div className="details__head head">
              <div className="head__box">
                <div
                  className="head__stage stage"
                  data-aos="animation-translate-right"
                >
                  <span className="stage__number">01.</span> {t.section1.title}
                  <div className="stage__logo">
                    <img className="stage__pic" src="img/logo-sm.png" alt="" />
                  </div>
                </div>
                <h2
                  className="head__title h2"
                  data-aos="animation-scale-y"
                  data-aos-delay={200}
                >
                  {t.section1.heading}
                </h2>
              </div>
            </div>
            <div className="details__foot">
              <div className="details__wrap">
                <h5
                  className="folio_details__info h5"
                  data-aos="animation-scale-y"
                >
                  {t.section1.subheading}
                </h5>
                <div
                  className="folio__details__text"
                  data-aos="animation-scale-y"
                  data-aos-delay={200}
                >
                  {t.section1.body}
                </div>
                {/*<div className="details__btn" data-aos="animation-scale-y" data-aos-delay={400}>*/}
                {/*    <button className="btn btn_primary">Join now</button>*/}
                {/*</div>*/}
              </div>
              <div className="details__counter" data-aos>
                <div className="details__front" />
                <div className="details__back">
                  <div className="details__number job">
                    {t.section1.statNumber}
                  </div>
                  <div className="details__category h6">
                    {t.section1.statText}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="line" data-aos="animation-line" data-aos-offset={0}>
            <svg
              className="line__svg"
              xmlns="http://www.w3.org/2000/svg"
              width={542}
              height={820}
            >
              <path
                fill="none"
                stroke="#323259"
                strokeWidth={2}
                d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
              />
            </svg>
          </div>
        </div>
        <div className="wrapper">
          <div className="lines">
            <div className="line" data-aos="animation-line" data-aos-offset={0}>
              <svg
                className="line__svg"
                xmlns="http://www.w3.org/2000/svg"
                width={542}
                height={820}
              >
                <path
                  fill="none"
                  stroke="#9A97ED"
                  strokeWidth={2}
                  d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
                />
              </svg>
            </div>
            <div className="line" data-aos="animation-line" data-aos-offset={0}>
              <svg
                className="line__svg"
                xmlns="http://www.w3.org/2000/svg"
                width={542}
                height={820}
              >
                <path
                  fill="none"
                  stroke="#9A97ED"
                  strokeWidth={2}
                  d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
                />
              </svg>
            </div>
          </div>

          <div className="projects">
            <div className="projects__center center">
              <div className="projects__head head">
                <div className="head__box">
                  <div className="head__stage stage">
                    <span
                      className="stage__line"
                      data-aos="animation-translate-right"
                    >
                      <span className="stage__number">02.</span>
                      {t.section2.title}
                    </span>
                    <div className="stage__logo">
                      <img
                        className="stage__pic"
                        src="img/logo-sm.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <h2
                    className="head__title h2"
                    data-aos="animation-scale-y"
                    data-aos-delay={200}
                  >
                    {t.section2.heading}
                  </h2>
                  <div
                    className="head__text"
                    data-aos="animation-scale-y"
                    data-aos-delay={400}
                  >
                    {t.section2.subheading}
                  </div>
                </div>
                {/*<div className="head__btns" data-aos="animation-scale-y" data-aos-delay={400}>*/}
                {/*    <button className="head__btn btn btn_primary">Contact Us</button>*/}
                {/*</div>*/}
              </div>
              <div className="projects__body">
                <div className="projects__desc">
                  {/*<div className="projects__category category" data-aos="animation-scale-y">*/}
                  {/*    Featured Product*/}
                  {/*</div>*/}
                  <h4
                    className="projects__info h4"
                    data-aos="animation-scale-y"
                    data-aos-delay={200}
                  >
                    {t.problem1.title}
                  </h4>
                  <div
                    className="projects__text"
                    data-aos="animation-scale-y"
                    data-aos-delay={400}
                  >
                    {t.problem1.body}
                  </div>
                </div>
                <div className="projects__preview">
                  <div className="projects__img">
                    <NextImage
                      className="projects__pic js-parallax"
                      data-orientation="up"
                      data-scale="1.3"
                      src={Feature1}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="projects__list">
                <div className="projects__item">
                  <h4
                    className="projects__info h4"
                    data-aos="animation-scale-y"
                  >
                    {t.problem2.title}
                  </h4>
                  <div className="projects__preview">
                    <div className="projects__img">
                      <NextImage
                        className="projects__pic js-parallax"
                        data-scale="1.3"
                        data-orientation="right"
                        src={Feature3}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="projects__text"
                    data-aos="animation-scale-y"
                    data-aos-offset={200}
                  >
                    {t.problem2.body}
                  </div>
                </div>
                <div className="projects__item">
                  <h4
                    className="projects__info h4"
                    data-aos="animation-scale-y"
                  >
                    {t.problem3.title}
                  </h4>
                  <div className="projects__preview">
                    <div className="projects__img">
                      <NextImage
                        className="projects__pic js-parallax"
                        data-scale="1.3"
                        data-orientation="up"
                        src={Feature4}
                        alt=""
                      />
                    </div>
                  </div>
                  <div
                    className="projects__text"
                    data-aos="animation-scale-y"
                    data-aos-offset={200}
                  >
                    {t.problem3.body}
                  </div>
                </div>
              </div>
              <div className="projects__btn" data-aos="animation-scale-y">
                <button className="btn btn_primary">Contact Us</button>
              </div>
            </div>
            <div className="lines">
              <div
                className="line"
                data-aos="animation-line"
                data-aos-offset={0}
              >
                <svg
                  className="line__svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width={542}
                  height={820}
                >
                  <path
                    fill="none"
                    stroke="#9A97ED"
                    strokeWidth={2}
                    d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
                  />
                </svg>
              </div>
              <div
                className="line"
                data-aos="animation-line"
                data-aos-offset={0}
              >
                <svg
                  className="line__svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width={542}
                  height={820}
                >
                  <path
                    fill="none"
                    stroke="#9A97ED"
                    strokeWidth={2}
                    d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="jobs">
          <div className="jobs__center center">
            <div className="jobs__wrap">
              <div className="jobs__stage stage">
                <span
                  className="stage__line"
                  data-aos="animation-translate-right"
                >
                  <span className="stage__number">03.</span>Connect Directly
                </span>
                <div className="stage__logo">
                  <img className="stage__pic" src="img/logo-sm.png" alt="" />
                </div>
              </div>
              <h2
                className="jobs__title title title_big"
                data-aos="animation-scale-y"
                data-aos-offset={200}
              >
                Vetted partners
              </h2>

              <div
                className="jobs__info"
                data-aos="animation-scale-y"
                data-aos-offset={300}
              >
                All creators and brands are vetted for audience quality,
                professionalism, and content standards to ensure the best
                experience for both sides.
              </div>
            </div>
            <div className="jobs__list">
              <NextLink href={'/profile/hipyotech'}>
                <div className="jobs__item" data-aos="animation-scale-y">
                  <div className="jobs__inner">
                    <h5 className="jobs__vacancy h5">HipyoTech Tech</h5>
                    <div className="jobs__text">Tech Youtube</div>
                    <img
                      className="icon icon-arrow-next"
                      src={ArrowRight}
                      alt=""
                    />
                    <div className="jobs__preview">
                      <img
                        className="jobs__pic"
                        src="https://yt3.ggpht.com/ytc/AKedOLTRFTVrqMpRLyQiUiHjpfle89TZXQWNxNYzFz6i5g=s176-c-k-c0x00ffffff-no-rj-mo"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </NextLink>
              <NextLink href="/profile/carterpcs">
                <div className="jobs__item" data-aos="animation-scale-y">
                  <div className="jobs__inner">
                    <h5 className="jobs__vacancy h5">CarterPcs</h5>
                    <div className="jobs__text">Tech TikTok</div>
                    <svg className="icon icon-arrow-next">
                      <use xlinkHref="img/sprite.svg#icon-arrow-next" />
                    </svg>
                    <img
                      className="icon icon-arrow-next"
                      src={ArrowRight}
                      alt=""
                    />
                    <div className="jobs__preview">
                      <img
                        className="jobs__pic"
                        src="https://forcollab.s3-us-west-1.amazonaws.com/media/creators/carterpcs/carterPf.jpeg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </NextLink>
              <NextLink href={'/profile/aeyoungie/'}>
                <div className="jobs__item" data-aos="animation-scale-y">
                  <div className="jobs__inner">
                    <h5 className="jobs__vacancy h5">Aeyoungie</h5>
                    <div className="jobs__text">Tech TikTok</div>
                    <img
                      className="icon icon-arrow-next"
                      src={ArrowRight}
                      alt=""
                    />
                    <div className="jobs__preview">
                      <img
                        className="jobs__pic"
                        src="https://forcollab.s3.us-west-1.amazonaws.com/media/creators/aeyoungie/emilypf.jpeg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </NextLink>
            </div>
          </div>
          <div className="line" data-aos="animation-line" data-aos-offset={0}>
            <svg
              className="line__svg"
              xmlns="http://www.w3.org/2000/svg"
              width={542}
              height={820}
            >
              <path
                fill="none"
                stroke="#9A97ED"
                strokeWidth={2}
                d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
              />
            </svg>
          </div>
        </div>
        <div className="about">
          <div className="about__center center">
            <div className="about__container">
              <div className="about__head">
                <div className="about__icon" data-aos="animation-scale-y">
                  <img className="about__pic" src="img/talk.png" alt="" />
                </div>
                <div className="about__logo" data-aos="animation-scale-y">
                  <img
                    className="about__pic"
                    src="img/logo-sm-pink.png"
                    alt=""
                  />
                </div>
                <div
                  className="about__hello"
                  data-aos="animation-scale-y"
                  data-aos-offset={200}
                >
                  <span>👋</span> Say hello to transparency
                </div>
                <h5
                  className="about__info h5"
                  data-aos="animation-scale-y"
                  data-aos-offset={400}
                >
                  cnotes is on a mission to make sponsorship pricing
                  transparent.
                </h5>
              </div>
              <div className="about__row">
                <div className="about__col">
                  <h2 className="about__title h2" data-aos="animation-scale-y">
                    Do less guesswork in pricing.
                  </h2>
                </div>
                <div className="about__col">
                  <div className="about__box">
                    <div className="about__icon" data-aos="animation-scale-y">
                      <img className="about__pic" src="img/talk.png" alt="" />
                    </div>
                    <div
                      className="about__line"
                      data-aos="animation-scale-y"
                      data-aos-offset={200}
                    >
                      <div className="about__text h5">
                        Start connecting today!
                      </div>
                      <NextLink href={'/register'}>
                        <div className="about__arrow arrow">
                          <div className="arrow__line">
                            <img
                              className="icon icon-arrow-next"
                              src={ArrowRight}
                              alt=""
                            />
                            <img
                              className="icon icon-arrow-next"
                              src={ArrowRight}
                              alt=""
                            />
                          </div>
                        </div>
                      </NextLink>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="line"
                data-aos="animation-line"
                data-aos-offset={0}
              >
                <svg
                  className="line__svg"
                  xmlns="http://www.w3.org/2000/svg"
                  width={542}
                  height={820}
                >
                  <path
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={2}
                    d="M67.002 1c-9.846 2.322-18.256 5.77-25.23 10.347C14.268 29.392 1 59 1 80.242c0 19.465 4.22 33.53 10.7 44.064 8.173 13.266 21.127 23.34 35.946 31.717S81 167.65 99.544 164.4s35.194-14.103 42.438-25.04c6.803-10.273 9.465-18.356 10.034-26.6.594-8.62.814-19.894-12.9-35.218-3.31-3.697-9.405-8.03-15.145-10.693-2.098-.973-14.094-6.014-27.454-5.476-11.45.46-24.028 5.89-30.787 11.675C50.498 86.087 44.87 111.313 47.656 129c2.55 16.172 13.563 35.116 33.645 48.24 11.517 7.526 26.962 13.923 42.67 16.554 15.095 2.53 36.494 6.735 53.47 12.248 16.285 5.29 28.394 11.897 31.848 13.942 6.62 3.92 11.166 8.683 13.38 10.648 4.286 3.803 19.582 21.91 25.16 36.19 9.54 24.417 8.908 49.09 8.256 54.772-1.8 15.703-7 27.963-12.697 37.603-9.28 15.704-21.97 24.68-33.526 28.574-10.768 3.63-20.613 2.77-24.24.96-5.258-2.624-13.262-6.02-18.323-15.728-.928-1.78-2.566-4.622-3.738-9.447-.664-2.732-1.82-19.51 3.738-34.634 2.365-6.435 7.644-21.235 18.323-34.158 14.42-17.453 35.752-33.512 45.406-39.992 16.803-11.278 32.187-19.34 48.6-22.522 3.183-.617 17.907-2.69 31.893-.54 13.195 2.03 25.598 8.157 31.39 11.784 12.017 7.524 21.507 18.63 28.876 37.773 1.484 3.855 2.396 10.446 2.868 15.367.5 5.11.503 8.59 0 14.718-1.117 13.603-4.78 29.58-14.285 47.846-3.29 6.323-8.076 14.9-16.05 25.698-4.696 6.36-13.85 17.642-27.464 33.846l-42.38 50.89c-16.087 20.25-28.28 36.992-36.11 52.17-5.392 10.447-15.198 27.915-20.753 48.628-1.272 4.743-5.466 30.186-2.688 54.394 2.714 23.655 12.28 45.97 21.036 60.27 19.17 31.318 50.474 51.02 59.716 55.687 19.282 9.734 45.952 18.277 76.11 25.364C399.75 772.703 430.5 777.88 466 785.023l175.725 33.055"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
