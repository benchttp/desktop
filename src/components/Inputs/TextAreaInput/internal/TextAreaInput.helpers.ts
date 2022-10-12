import s from './text-area-input.module.scss'
import { ITextAreaResize } from './TextAreaInput.types'

export const getClassName = (className: string | undefined): string => {
  const classNames: string[] = ['f', 'f-direction-column']

  if (className) {
    classNames.push(className)
  }

  return classNames.join(' ')
}

export const getTextAreaClassName = (
  resize: ITextAreaResize | undefined
): string => {
  const classNames: string[] = [s['textarea']]

  if (resize === 'horizontal') {
    classNames.push(s['textarea--horizontal'])
  } else if (resize === 'vertical') {
    classNames.push(s['textarea--vertical'])
  } else if (resize === 'both') {
    classNames.push(s['textarea--both'])
  }

  return classNames.join(' ')
}
