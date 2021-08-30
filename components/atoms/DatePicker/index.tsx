import { Controller, ControllerProps } from 'react-hook-form'
import RDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { Input } from '@chakra-ui/react'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './index.module.css'

interface Props extends Omit<ReactDatePickerProps<any>, 'onChange'> {
  controllerProps: Omit<ControllerProps, 'render'>
  inputProps: Record<string, any>
}

export default function DatePicker({
  controllerProps,
  inputProps,
  ...props
}: Props): JSX.Element {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => (
        <RDatePicker
          onChange={date => field.onChange(date)}
          selected={field.value}
          customInput={<Input autoComplete="none" {...inputProps} />} // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#preventing_autofilling_with_autocompletenew-password
          wrapperClassName={styles.datepicker}
          {...props}
        />
      )}
    />
  )
}
