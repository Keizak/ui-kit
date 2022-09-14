import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'

export type BasicDatePickerPropsType = {
  value: Dayjs | null
  changeDate: (value: Dayjs | null) => void
}

export function BasicDatePicker(props: BasicDatePickerPropsType) {
  const [value, setValue] = React.useState<Dayjs | null>(props.value)

  const DateChangeHandler = (value: Dayjs | null) => {
    setValue(value)
    props.changeDate(value)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={DateChangeHandler}
        renderInput={params => (
          <TextField
            {...params}
            size={'small'}
            sx={{
              input: {
                padding: '6.5px 14px',
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  )
}
