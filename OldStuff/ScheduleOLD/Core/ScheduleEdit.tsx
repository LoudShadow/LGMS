import React, { useState } from 'react'
import { defaultSettings } from '../Contexts/ScheduleContext'
import ScheduleEditProvider from '../Contexts/ScheduleEditContext'
import Schedule from './Schedule'
import {ScheduleProps} from './Schedule'

interface ScheduleEditProps extends ScheduleProps{

}

function ScheduleEdit(props:ScheduleEditProps) {



  return (
    <ScheduleEditProvider {...props}>

    </ScheduleEditProvider>
  )
}
ScheduleEdit.defaultProps={
    ...defaultSettings
}
export default ScheduleEdit