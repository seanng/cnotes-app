import { Box } from '@chakra-ui/react'

type Props = {
  label: string
  name: string
  type: string
}

export default function Input({ label, name, type }: Props): JSX.Element {
  return (
    <Box>
      <Box
        position="absolute"
        top="32px"
        right="24px"
        left="24px"
        textStyle="inputLabel"
      >
        {label}
      </Box>
      <Box>
        <Box
          as="input"
          name={name}
          type={type}
          sx={{
            width: '100%',
            height: '80px',
            padding: '18px 22px 0',
            borderRadius: '12px',
            border: '2px solid transparent',
            background: 'rgba(228, 228, 228, 0.3)',
            fontFamily: 'Inter',
            color: '#11142D',
          }}
        />
      </Box>
    </Box>
  )
}
