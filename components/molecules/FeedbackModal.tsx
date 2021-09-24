import { FC } from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react'

type P = {
  header: string
  body?: string
  buttonText: string
  onConfirm?: () => void
  onClose: () => void
  hasCloseButton?: boolean
  isOpen: boolean
}

const FeedbackModal: FC<P> = ({
  header,
  body,
  buttonText,
  onConfirm,
  hasCloseButton,
  onClose,
  isOpen,
  ...modalProps
}: P) => {
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
        {hasCloseButton && <ModalCloseButton />}
        <ModalBody textStyle="base">{body}</ModalBody>
        <ModalFooter>
          <Button onClick={onConfirm || onClose}>{buttonText}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FeedbackModal
