import { Zap } from 'react-feather'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'

import { handleStartClick } from './internal/Launcher.helpers'
import s from './internal/Launcher.module.scss'

export const Laucher = () => {
  const navigate = useNavigate()

  return (
    <div className={`${s['launcher']} f f-center`}>
      <Button
        onClick={handleStartClick(navigate)}
        text="Launch Benchttp"
        iconEnd={Zap}
      />
    </div>
  )
}
