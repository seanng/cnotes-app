import {
  DEAL,
  SUBMITTING,
  SELECTING,
  LISTING,
  PAYING,
  DECIDED,
  YOUTUBE,
  TIKTOK,
  NO_OFFERS,
} from 'shared/constants'

const completedTagProps = {
  bgColor: 'gray.800',
  color: 'gray.400',
}

const urgentTagProps = {
  color: 'white',
  bgColor: 'pink.400',
}

export const statusConfigs = {
  [SUBMITTING]: {
    text: 'Submitting',
    type: DEAL,
    tagProps: urgentTagProps,
    isUrgent: true,
  },
  [LISTING]: {
    text: 'Listing',
    type: LISTING,
    hasTimer: true,
  },
  [SELECTING]: {
    text: 'Select Offers',
    type: LISTING,
    tagProps: urgentTagProps,
    isUrgent: true,
    hasTimer: true,
  },
  [NO_OFFERS]: {
    text: 'Listing Ended',
    type: LISTING,
    hasTimer: true,
    tagProps: {
      color: 'white',
      bgColor: 'blue',
    },
  },
  [DECIDED]: {
    text: 'Offers Selected',
    type: LISTING,
    tagProps: completedTagProps,
  },
  [PAYING]: {
    text: 'Payment Processing',
    type: DEAL,
  },
}

export const platformIconSlugs = {
  [YOUTUBE]: 'akar-icons:youtube-fill',
  [TIKTOK]: 'bx:bxl-tiktok',
}
