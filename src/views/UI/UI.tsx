import { FC, useState } from 'react'
import {
  CheckCircle,
  PlusSquare,
  AlertCircle,
  BarChart2,
  ChevronsUp,
  ChevronsDown,
  Target,
  Clock,
  Settings,
  PieChart,
} from 'react-feather'

import {
  Button,
  Tab,
  Tag,
  ProgressBar,
  Tooltip,
  Typography,
  Accordion,
} from '@/components'
import { Toggle } from '@/components/Inputs'
import { IColors } from '@/typing/colors'
import { StatCard } from '@/views/Run/internal/ResultDisplay/internal/StatCard'

import { TestResult } from '../Run/internal/ResultDisplay/internal/ReportSection/internal/components'

export const UI: FC = () => {
  const handleButtonClick = () => {
    console.log('button clicked')
  }

  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
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
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          ProgressBar
        </Typography>
        <ProgressBar value={50} max={200} />
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Accordion
        </Typography>
        <Accordion
          title={<Typography>Accordion title</Typography>}
          content={<Typography>Accordion content</Typography>}
        />
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Test Result
        </Typography>
        <TestResult
          pass={true}
          name="test result passed"
          field="mean response time"
          predicate="LT"
          target="100ms"
          got="95ms"
          className="mb-2"
        />
        <TestResult
          pass={false}
          name="test result failed"
          field="mean response time"
          predicate="LT"
          target="100ms"
          got="125ms"
        />
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Tabs
        </Typography>
        <div className="f f-direction-row f-ai-end mb-3">
          <Tab
            className="mr-3"
            link="/"
            text="Configure"
            iconStart={Settings}
          />
          <Tab
            className="mr-3"
            link="/UI"
            text="Test Results"
            iconStart={CheckCircle}
          />
          <Tab link="#" text="Configure" iconStart={PieChart} disabled />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Tags
        </Typography>
        <div className="f f-direction-row f-ai-center">
          <Tag className="mr-3" color={IColors.baseWhite} text="Tag" />
          <Tag className="mr-3" color={IColors.baseRed} text="Tag" />
          <Tag className="mr-3" color={IColors.baseGreen} text="Tag" />
          <Tag className="mr-3" color={IColors.httpPost} text="Tag" />
          <Tag className="mr-3" color={IColors.httpGet} text="Tag" />
          <Tag className="mr-3" color={IColors.httpPut} text="Tag" />
          <Tag className="mr-3" color={IColors.httpPatch} text="Tag" />
          <Tag className="mr-3" color={IColors.httpDelete} text="Tag" />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Toggle
        </Typography>
        <div className="f f-direction-row f-ai-end mb-3">
          <Toggle
            id="1"
            onChange={handleToggle}
            checked={toggle}
            label="Check me"
            className="mr-3"
          />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Tooltip
        </Typography>
        <div className="f f-direction-row f-ai-end mb-3">
          <Tooltip icon={AlertCircle} className="mr-3" text="Tooltip text" />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Results
        </Typography>
        <div className="g f-direction-row mb-3">
          <StatCard
            icon={ChevronsUp}
            iconColor="blue"
            className="mr-3"
            stat="100ms"
            label="fastest response"
          />
          <StatCard
            icon={ChevronsDown}
            iconColor="orange"
            className="mr-3"
            stat="250ms"
            label="slowest response"
          />
          <StatCard
            icon={BarChart2}
            iconColor="base-white"
            className="mr-3"
            stat="135ms"
            label="average response time"
          />
        </div>
        <div className="g f-direction-row f-ai-end mb-3">
          <StatCard
            icon={Clock}
            iconColor="primary"
            className="mr-3"
            stat="150ms"
            label="90% of requests are faster"
          />
          <StatCard
            icon={Target}
            iconColor="purple"
            className="mr-3"
            stat="50ms"
            label="standard deviation"
          />
          <StatCard
            icon={CheckCircle}
            iconColor="get"
            className="mr-3"
            stat="92%"
            label="of requests were successful"
          />
        </div>
      </div>
    </div>
  )
}
