import { FC } from 'react'
import { Trash, PlusSquare } from 'react-feather'

import { Button } from '@/components'
import { TextInput } from '@/components/Inputs'

import {
  handleAddHeader,
  handleAddHeaderValue,
  handleHeaderKeyChange,
  handleHeaderValueChange,
  handleRemoveHeaderValue,
} from './core/RunConfigurationPanelHeaders.helpers'
import { IProps } from './core/RunConfigurationPanelHeaders.typings'

export const RunConfigurationPanelHeaders: FC<IProps> = ({
  headers,
  setHeaders,
}) => {
  return (
    <div className="f f-direction-column f-ai-start">
      {headers.map((header, headerIndex) => (
        <div
          key={`header-${headerIndex}`}
          className="f f-direction-row f-ai-center mt-3"
        >
          <TextInput
            className="mr-3"
            id={`header-key-${headerIndex}`}
            value={header.key}
            onChange={handleHeaderKeyChange({
              headerIndex,
              headers,
              setHeaders,
            })}
            label="Key"
          />
          <div className="f f-direction-column">
            {header.values.map((headerValue, headerValueIndex) => (
              <div
                className={`f f-direction-row f-ai-center ${
                  header.values.length > 0 && headerValueIndex !== 0
                    ? 'mt-3'
                    : ''
                }`}
                key={`header-value-${headerValueIndex}`}
              >
                <TextInput
                  className="mr-3"
                  id={`header-value-${headerValueIndex}`}
                  value={headerValue}
                  onChange={handleHeaderValueChange({
                    headerIndex,
                    headerValueIndex,
                    headers,
                    setHeaders,
                  })}
                  label="Value"
                />
                <Trash
                  onClick={handleRemoveHeaderValue({
                    headerIndex,
                    headerValueIndex,
                    headers,
                    setHeaders,
                  })}
                  className="mr-3"
                />
                {headerValueIndex === header.values.length - 1 && (
                  <PlusSquare
                    onClick={handleAddHeaderValue({
                      headerIndex,
                      headers,
                      setHeaders,
                    })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button
        text="Add a new header"
        small
        className="mt-3"
        iconEnd={PlusSquare}
        onClick={handleAddHeader({ headers, setHeaders })}
        style="outlined"
      />
    </div>
  )
}
