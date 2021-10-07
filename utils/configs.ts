import {
  DEAL,
  SUBMITTING,
  SELECTING,
  LISTING,
  PAYING,
  DECIDED,
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
