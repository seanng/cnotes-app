import { FC } from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  Button,
} from '@chakra-ui/react'

export type FeedbackModalProps = {
  header: string
  body?: string | JSX.Element
  button?: string | JSX.Element
  onConfirm?: () => void
  onClose: () => void
  hasCloseButton?: boolean
  isOpen: boolean
} & Omit<ModalProps, 'children'>

const FeedbackModal: FC<FeedbackModalProps> = ({
  header,
  body,
  button,
  onConfirm,
  hasCloseButton,
  onClose,
  isOpen,
  ...modalProps
}: FeedbackModalProps) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      isCentered
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        {hasCloseButton && <ModalCloseButton _focus={{ boxShadow: 'none' }} />}
        <ModalBody textStyle="base">{body}</ModalBody>
        <ModalFooter>
          {button && typeof button !== 'string' ? (
            button
          ) : (
            <Button isFullWidth onClick={onConfirm || onClose}>
              {button || 'Close'}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FeedbackModal
