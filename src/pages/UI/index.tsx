import { FC } from 'react'
import { PlusSquare } from 'react-feather'

import { Button, Typography } from '@/components'

export const UI: FC = () => {
  const handleButtonClick = () => {
    console.log('button clicked')
  }

  return (
    <div className="p-3">
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Typescale
        </Typography>
        <div className="f f-direction-column">
          <div className="f f-direction-row mb-3">
            <div className="f f-direction-column mr-3">
              <Typography font="inter" size="small" weight="regular">
                Inter - regular - small
              </Typography>
              <Typography font="inter" size="base" weight="regular">
                Inter - regular - base
              </Typography>
              <Typography font="inter" size="h4" weight="regular">
                Inter - regular - h4
              </Typography>
              <Typography font="inter" size="h3" weight="regular">
                Inter - regular - h3
              </Typography>
              <Typography font="inter" size="h2" weight="regular">
                Inter - regular - h2
              </Typography>
              <Typography font="inter" size="h1" weight="regular">
                Inter - regular - h1
              </Typography>
            </div>
            <div className="f f-direction-column mr-3">
              <Typography font="inter" size="small" weight="medium">
                Inter - medium - small
              </Typography>
              <Typography font="inter" size="base" weight="medium">
                Inter - medium - base
              </Typography>
              <Typography font="inter" size="h4" weight="medium">
                Inter - medium - h4
              </Typography>
              <Typography font="inter" size="h3" weight="medium">
                Inter - medium - h3
              </Typography>
              <Typography font="inter" size="h2" weight="medium">
                Inter - medium - h2
              </Typography>
              <Typography font="inter" size="h1" weight="medium">
                Inter - medium - h1
              </Typography>
            </div>
            <div className="f f-direction-column">
              <Typography font="inter" size="small" weight="semi">
                Inter - semi - small
              </Typography>
              <Typography font="inter" size="base" weight="semi">
                Inter - semi - base
              </Typography>
              <Typography font="inter" size="h4" weight="semi">
                Inter - semi - h4
              </Typography>
              <Typography font="inter" size="h3" weight="semi">
                Inter - semi - h3
              </Typography>
              <Typography font="inter" size="h2" weight="semi">
                Inter - semi - h2
              </Typography>
              <Typography font="inter" size="h1" weight="semi">
                Inter - semi - h1
              </Typography>
            </div>
          </div>
          <div className="f f-direction-row">
            <div className="f f-direction-column mr-3">
              <Typography font="poppins" size="small" weight="regular">
                Poppins - regular - small
              </Typography>
              <Typography font="poppins" size="base" weight="regular">
                Poppins - regular - base
              </Typography>
              <Typography font="poppins" size="h4" weight="regular">
                Poppins - regular - h4
              </Typography>
              <Typography font="poppins" size="h3" weight="regular">
                Poppins - regular - h3
              </Typography>
              <Typography font="poppins" size="h2" weight="regular">
                Poppins - regular - h2
              </Typography>
              <Typography font="poppins" size="h1" weight="regular">
                Poppins - regular - h1
              </Typography>
            </div>
            <div className="f f-direction-column mr-3">
              <Typography font="poppins" size="small" weight="medium">
                Poppins - medium - small
              </Typography>
              <Typography font="poppins" size="base" weight="medium">
                Poppins - medium - base
              </Typography>
              <Typography font="poppins" size="h4" weight="medium">
                Poppins - medium - h4
              </Typography>
              <Typography font="poppins" size="h3" weight="medium">
                Poppins - medium - h3
              </Typography>
              <Typography font="poppins" size="h2" weight="medium">
                Poppins - medium - h2
              </Typography>
              <Typography font="poppins" size="h1" weight="medium">
                Poppins - medium - h1
              </Typography>
            </div>
            <div className="f f-direction-column mr-3">
              <Typography font="poppins" size="small" weight="semi">
                Poppins - semi - small
              </Typography>
              <Typography font="poppins" size="base" weight="semi">
                Poppins - semi - base
              </Typography>
              <Typography font="poppins" size="h4" weight="semi">
                Poppins - semi - h4
              </Typography>
              <Typography font="poppins" size="h3" weight="semi">
                Poppins - semi - h3
              </Typography>
              <Typography font="poppins" size="h2" weight="semi">
                Poppins - semi - h2
              </Typography>
              <Typography font="poppins" size="h1" weight="semi">
                Poppins - semi - h1
              </Typography>
            </div>
            <div className="f f-direction-column">
              <Typography font="poppins" size="small" weight="bold">
                Poppins - bold - small
              </Typography>
              <Typography font="poppins" size="base" weight="bold">
                Poppins - bold - base
              </Typography>
              <Typography font="poppins" size="h4" weight="bold">
                Poppins - bold - h4
              </Typography>
              <Typography font="poppins" size="h3" weight="bold">
                Poppins - bold - h3
              </Typography>
              <Typography font="poppins" size="h2" weight="bold">
                Poppins - bold - h2
              </Typography>
              <Typography font="poppins" size="h1" weight="bold">
                Poppins - bold - h1
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Buttons
        </Typography>
        <div className="f f-direction-row f-ai-end mb-3">
          <Button
            className="mr-3"
            color="primary"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            className="mr-3"
            color="white"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            className="mr-3"
            color="primary"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            color="white"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
          />
        </div>
        <div className="f f-direction-row f-ai-end mb-3">
          <Button
            className="mr-3"
            color="primary"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            className="mr-3"
            color="white"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            className="mr-3"
            color="primary"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            color="white"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
          />
        </div>
        <div className="f f-direction-row f-ai-end mb-3">
          <Button
            className="mr-3"
            color="primary"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
          />
          <Button
            className="mr-3"
            color="white"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
          />
          <Button
            className="mr-3"
            color="primary"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
          />
          <Button
            color="white"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
          />
        </div>
        <div className="f f-direction-row f-ai-end mb-3">
          <Button
            className="mr-3"
            color="primary"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
          />
          <Button
            className="mr-3"
            color="white"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
          />
          <Button
            className="mr-3"
            color="primary"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
          />
          <Button
            color="white"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
          />
        </div>
      </div>
    </div>
  )
}