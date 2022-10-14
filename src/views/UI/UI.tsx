import {
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react'
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
import {
  NumberInput,
  SelectInput,
  TextInput,
  Toggle,
} from '@/components/Inputs'
import { StatCard } from '@/views/Run/internal/Summary/internal/StatCard'

import { TestResult } from '../Run/internal/ResultDisplay/internal/ReportSection/internal/components'

export const UI: FC = () => {
  const handleButtonClick = () => {
    console.log('button clicked')
  }

  const handleToggleChange = (
    setter: Dispatch<SetStateAction<boolean>>
  ): ((value: boolean) => void) => {
    return (value: boolean) => {
      setter(value)
    }
  }

  const handleTextInputChange = (
    setter: Dispatch<SetStateAction<string>>
  ): ChangeEventHandler<HTMLInputElement> => {
    return (e) => {
      setter(e.target.value)
    }
  }

  const handleNumberInputChange = (
    setter: Dispatch<SetStateAction<number>>
  ): ((value: number) => void) => {
    return (value) => {
      setter(value)
    }
  }

  const handleSelectInputChange = (
    setter: Dispatch<SetStateAction<string>>
  ): ChangeEventHandler<HTMLSelectElement> => {
    return (e) => {
      setter(e.target.value)
    }
  }

  const [toggleLeft, setToggleLeft] = useState(false)
  const [toggleRight, setToggleRight] = useState(false)
  const [textInputValue, setTextInputValue] = useState('')
  const [numberInputValue, setNumberInputValue] = useState(0)
  const [selectInputValue, setSelectInputValue] = useState('')
  const [textInputValueInvalid, setTextInputValueInvalid] = useState('')
  const [numberInputValueInvalid, setNumberInputValueInvalid] = useState(0)
  const [selectInputValueInvalid, setSelectInputValueInvalid] = useState('')
  const [textInputValueDisabled, setTextInputValueDisabled] = useState('')
  const [numberInputValueDisabled, setNumberInputValueDisabled] = useState(0)
  const [selectInputValueDisabled, setSelectInputValueDisabled] = useState('')

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
            color="base-white"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            className="mr-3"
            color="base-white"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
            disabled
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
            className="mr-3"
            color="base-white"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            color="base-white"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
            disabled
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
            color="base-white"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            className="mr-3"
            color="base-white"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
            disabled
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
            className="mr-3"
            color="base-white"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
          />
          <Button
            color="base-white"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
            disabled
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
            color="base-white"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
          />
          <Button
            className="mr-3"
            color="base-white"
            style="full"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
            disabled
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
            className="mr-3"
            color="base-white"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
          />
          <Button
            color="base-white"
            style="full"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconEnd={PlusSquare}
            disabled
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
            color="base-white"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
          />
          <Button
            className="mr-3"
            color="base-white"
            style="outlined"
            small={false}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
            disabled
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
            className="mr-3"
            color="base-white"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
          />
          <Button
            color="base-white"
            style="outlined"
            small={true}
            text="button"
            onClick={handleButtonClick}
            iconStart={PlusSquare}
            disabled
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
            link="/non-selected"
            text="Non selected"
            iconStart={Settings}
          />
          <Tab
            className="mr-3"
            link="/UI"
            text="Selected"
            iconStart={CheckCircle}
          />
          <Tab link="#" text="Disabled" iconStart={PieChart} disabled />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Tags
        </Typography>
        <div className="f f-direction-row f-ai-center">
          <Tag className="mr-3" color="base-white" text="Tag" />
          <Tag className="mr-3" color="base-red" text="Tag" />
          <Tag className="mr-3" color="base-green" text="Tag" />
          <Tag className="mr-3" color="http-post" text="Tag" />
          <Tag className="mr-3" color="http-get" text="Tag" />
          <Tag className="mr-3" color="http-put" text="Tag" />
          <Tag className="mr-3" color="http-patch" text="Tag" />
          <Tag className="mr-3" color="http-delete" text="Tag" />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Toggle
        </Typography>
        <div className="f f-direction-row f-ai-end mb-3">
          <Toggle
            className="mr-3"
            id="toggle-left"
            onChange={handleToggleChange(setToggleLeft)}
            checked={toggleLeft}
            label="Check me"
            labelPosition="left"
          />
          <Toggle
            id="toggle-right"
            onChange={handleToggleChange(setToggleRight)}
            checked={toggleRight}
            label="Check me"
            labelPosition="right"
          />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Tooltip
        </Typography>
        <div className="f f-direction-row f-ai-end mb-3">
          <Tooltip icon={AlertCircle} className="mr-3">
            Tooltip text
          </Tooltip>
          <Tooltip icon={AlertCircle} className="mr-3">
            <a href="#">Go top</a>
            <p>blabla</p>
          </Tooltip>
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Inputs
        </Typography>
        <div className="f f-direction-row f-ai-center mb-3">
          <TextInput
            className="mr-3"
            id="text-input"
            label="Text input"
            value={textInputValue}
            onChange={handleTextInputChange(setTextInputValue)}
            placeholder="some text"
          />
          <TextInput
            className="mr-3"
            id="text-input-diabled"
            label="Text input disabled"
            value={textInputValueDisabled}
            onChange={handleTextInputChange(setTextInputValueDisabled)}
            placeholder="some non editable text"
            disabled
          />
          <TextInput
            id="text-input-invalid"
            label="Text input invalid"
            value={textInputValueInvalid}
            onChange={handleTextInputChange(setTextInputValueInvalid)}
            placeholder="some invalid text"
            invalid
          />
        </div>
        <div className="f f-direction-row f-ai-center mb-3">
          <NumberInput
            className="mr-3"
            id="number-input"
            label="Number input"
            value={numberInputValue}
            onChange={handleNumberInputChange(setNumberInputValue)}
            placeholder="some number"
          />
          <NumberInput
            className="mr-3"
            id="number-input-disabled"
            label="Number input disabled"
            value={numberInputValueDisabled}
            onChange={handleNumberInputChange(setNumberInputValueDisabled)}
            placeholder="some non editable number"
            disabled
          />
          <NumberInput
            id="number-input-invalid"
            label="Number input invalid"
            value={numberInputValueInvalid}
            onChange={handleNumberInputChange(setNumberInputValueInvalid)}
            placeholder="some invalid number"
            invalid
          />
        </div>
        <div className="f f-direction-row f-ai-center mb-3">
          <SelectInput
            className="mr-3"
            id="select-input"
            label="Select input"
            value={selectInputValue}
            onChange={handleSelectInputChange(setSelectInputValue)}
            options={[
              { display: 'Value', value: 'value' },
              {
                display: 'Value disabled',
                value: 'value-disabled',
                disabled: true,
              },
            ]}
            placeholder="Select a value"
          />
          <SelectInput
            className="mr-3"
            id="select-input-disabled"
            label="Select input disabled"
            value={selectInputValueDisabled}
            onChange={handleSelectInputChange(setSelectInputValueDisabled)}
            options={[
              { display: 'Value', value: 'value' },
              {
                display: 'Value disabled',
                value: 'value-disabled',
                disabled: true,
              },
            ]}
            placeholder="Select a value"
            disabled
          />
          <SelectInput
            className="mr-3"
            id="select-input-invalid"
            label="Select input invalid"
            value={selectInputValueInvalid}
            onChange={handleSelectInputChange(setSelectInputValueInvalid)}
            options={[
              { display: 'Value', value: 'value' },
              {
                display: 'Value disabled',
                value: 'value-disabled',
                disabled: true,
              },
            ]}
            placeholder="Select a value"
            invalid
          />
        </div>
      </div>
      <div className="mb-4">
        <Typography className="mb-4" element="h1">
          Results
        </Typography>
        <div className="f f-ai-center mb-3">
          <StatCard
            icon={ChevronsUp}
            color="base-blue"
            className="mr-3"
            stat="100ms"
            label="fastest response"
          />
          <StatCard
            icon={ChevronsDown}
            color="base-orange"
            className="mr-3"
            stat="250ms"
            label="slowest response"
          />
          <StatCard
            icon={BarChart2}
            color="base-white"
            className="mr-3"
            stat="135ms"
            label="average response time"
          />
        </div>
        <div className="f f-ai-center mb-3">
          <StatCard
            icon={Clock}
            color="primary"
            className="mr-3"
            stat="150ms"
            label="90% of requests are faster"
          />
          <StatCard
            icon={Target}
            color="base-purple"
            className="mr-3"
            stat="50ms"
            label="standard deviation"
          />
          <StatCard
            icon={CheckCircle}
            color="base-green"
            className="mr-3"
            stat="92%"
            label="of requests were successful"
          />
        </div>
      </div>
    </div>
  )
}
