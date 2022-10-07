import { FC } from 'react'
import { Zap } from 'react-feather'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'

import { getClassName, handleStartClick } from './internal/Launcher.helpers'

interface IProps {
  className?: string
}

export const Laucher: FC<IProps> = ({ className }) => {
  const navigate = useNavigate()

  return (
    <div className={getClassName(className)}>
      <Button
        onClick={handleStartClick(navigate)}
        text="Launch Benchttp"
        iconEnd={Zap}
      />
    </div>
  )
}
