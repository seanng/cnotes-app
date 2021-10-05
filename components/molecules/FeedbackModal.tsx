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

type P = {
  header: string
  body?: string | JSX.Element
  button: string | JSX.Element
  onConfirm?: () => void
  onClose: () => void
  hasCloseButton?: boolean
  isOpen: boolean
} & Omit<ModalProps, 'children'>

const FeedbackModal: FC<P> = ({
  header,
  body,
  button,
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
          {typeof button === 'string' ? (
            <Button onClick={onConfirm || onClose}>{button}</Button>
          ) : (
            button
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FeedbackModal
