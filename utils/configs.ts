import { DEAL, SUBMITTING, SELECTING, LISTING, PAYING } from 'shared/constants'

export const statuses = {
  [SUBMITTING]: {
    text: 'Submitting',
    type: DEAL,
    isUrgent: true,
  },
  [LISTING]: {
    text: 'Listing',
    type: LISTING,
  },
  [SELECTING]: {
    text: 'Select Offers',
    type: LISTING,
    isUrgent: true,
  },
  [PAYING]: {
    text: 'Payment Processing',
    type: DEAL,
  },
}
