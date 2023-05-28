import { useRecoilValue } from 'recoil';
import TextareaAutosize from 'react-textarea-autosize';
import SelectDropDown from '../../ui/SelectDropDown';
import { Input } from 'src/components/ui/Input.tsx';
import { Label } from 'src/components/ui/Label.tsx';
import { Slider } from 'src/components/ui/Slider.tsx';
import { InputNumber } from 'src/components/ui/InputNumber.tsx';
import OptionHover from './OptionHover';
import { HoverCard, HoverCardTrigger } from 'src/components/ui/HoverCard.tsx';
import { cn } from 'src/utils/';
const defaultTextProps =
  'rounded-md border border-gray-200 focus:border-slate-400 focus:bg-gray-50 bg-transparent text-sm shadow-[0_0_10px_rgba(0,0,0,0.05)] outline-none placeholder:text-gray-400 focus:outline-none focus:ring-gray-400 focus:ring-opacity-20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-500 dark:bg-gray-700 focus:dark:bg-gray-600 dark:text-gray-50 dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] dark:focus:border-gray-400 dark:focus:outline-none dark:focus:ring-0 dark:focus:ring-gray-400 dark:focus:ring-offset-0';

const optionText =
  'p-0 shadow-none text-right pr-1 h-8 border-transparent focus:ring-[#10a37f] focus:ring-offset-0 focus:ring-opacity-100 hover:bg-gray-800/10 dark:hover:bg-white/10 focus:bg-gray-800/10 dark:focus:bg-white/10 transition-colors';

import store from 'src/store';

function Settings(props) {
  const {
    readonly,
    model,
    chatGptLabel,
    promptPrefix,
    temperature,
    topP,
    freqP,
    presP,
    setOption
  } = props;

  const endpointsConfig = useRecoilValue(store.endpointsConfig);

  const setModel = setOption('model');
  const setChatGptLabel = setOption('chatGptLabel');
  const setPromptPrefix = setOption('promptPrefix');
  const setTemperature = setOption('temperature');
  const setTopP = setOption('top_p');
  const setFreqP = setOption('presence_penalty');
  const setPresP = setOption('frequency_penalty');

  const models = endpointsConfig?.['openAI']?.['availableModels'] || [];

  return (
    <div className="max-h-[350px] overflow-y-auto">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="col-span-1 flex flex-col items-center justify-start gap-6">
          <div className="grid w-full items-center gap-2">
            <SelectDropDown
              value={model}
              setValue={setModel}
              availableValues={models}
              disabled={readonly}
              className={cn(
                defaultTextProps,
                'flex w-full resize-none focus:outline-none focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0'
              )}
              containerClassName="flex w-full resize-none"
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="chatGptLabel" className="text-left text-sm font-medium">
              方案名称 <small className="opacity-40">(默认: 空白)</small>
            </Label>
            <Input
              id="chatGptLabel"
              disabled={readonly}
              value={chatGptLabel || ''}
              onChange={(e) => setChatGptLabel(e.target.value || null)}
              placeholder="设置您的ChatGPT方案名称。"
              className={cn(
                defaultTextProps,
                'flex h-10 max-h-10 w-full resize-none px-3 py-2 focus:outline-none focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0'
              )}
            />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="promptPrefix" className="text-left text-sm font-medium">
              对话环境 <small className="opacity-40">(默认: 空白)</small>
            </Label>
            <TextareaAutosize
              id="promptPrefix"
              disabled={readonly}
              value={promptPrefix || ''}
              onChange={(e) => setPromptPrefix(e.target.value || null)}
              placeholder="如果你希望GPT以特定的角色进行对话（如医生、律师、或者历史上的某个人物等），比如: Hey ChatGpt, 假设现在你是著名的流行音乐歌手周杰伦. 同样，你也可以通过设置前缀来引导模型的对话内容。例如，如果你希望模型告诉你关于天气的信息，你可以设置前缀为: 告诉我关于天气的信息。"
              className={cn(
                defaultTextProps,
                'flex max-h-[300px] min-h-[100px] w-full resize-none px-3 py-2 '
              )}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-start gap-6">
          <HoverCard openDelay={300}>
            <HoverCardTrigger className="grid w-full items-center gap-2">
              <div className="flex justify-between">
                <Label htmlFor="temp-int" className="text-left text-sm font-medium">
                  想象力 Temperature <small className="opacity-40">(默认值: 1)</small>
                </Label>
                <InputNumber
                  id="temp-int"
                  disabled={readonly}
                  value={temperature}
                  onChange={(value) => setTemperature(value)}
                  max={2}
                  min={0}
                  step={0.01}
                  controls={false}
                  className={cn(
                    defaultTextProps,
                    cn(
                      optionText,
                      'reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200'
                    )
                  )}
                />
              </div>
              <Slider
                disabled={readonly}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                doubleClickHandler={() => setTemperature(1)}
                max={2}
                min={0}
                step={0.01}
                className="flex h-4 w-full"
              />
            </HoverCardTrigger>
            <OptionHover type="temp" side="left" />
          </HoverCard>
          <HoverCard openDelay={300}>
            <HoverCardTrigger className="grid w-full items-center gap-2">
              <div className="flex justify-between">
                <Label htmlFor="top-p-int" className="text-left text-sm font-medium">
                  多样性 Top P <small className="opacity-40">(默认值: 1)</small>
                </Label>
                <InputNumber
                  id="top-p-int"
                  disabled={readonly}
                  value={topP}
                  onChange={(value) => setTopP(value)}
                  max={1}
                  min={0}
                  step={0.01}
                  controls={false}
                  className={cn(
                    defaultTextProps,
                    cn(
                      optionText,
                      'reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200'
                    )
                  )}
                />
              </div>
              <Slider
                disabled={readonly}
                value={[topP]}
                onValueChange={(value) => setTopP(value[0])}
                doubleClickHandler={() => setTopP(1)}
                max={1}
                min={0}
                step={0.01}
                className="flex h-4 w-full"
              />
            </HoverCardTrigger>
            <OptionHover type="topp" side="left" />
          </HoverCard>

          <HoverCard openDelay={300}>
            <HoverCardTrigger className="grid w-full items-center gap-2">
              <div className="flex justify-between">
                <Label htmlFor="freq-penalty-int" className="text-left text-sm font-medium">
                  重复性 Frequency Penalty <small className="opacity-40">(默认值: 0)</small>
                </Label>
                <InputNumber
                  id="freq-penalty-int"
                  disabled={readonly}
                  value={freqP}
                  onChange={(value) => setFreqP(value)}
                  max={2}
                  min={-2}
                  step={0.01}
                  controls={false}
                  className={cn(
                    defaultTextProps,
                    cn(
                      optionText,
                      'reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200'
                    )
                  )}
                />
              </div>
              <Slider
                disabled={readonly}
                value={[freqP]}
                onValueChange={(value) => setFreqP(value[0])}
                doubleClickHandler={() => setFreqP(0)}
                max={2}
                min={-2}
                step={0.01}
                className="flex h-4 w-full"
              />
            </HoverCardTrigger>
            <OptionHover type="freq" side="left" />
          </HoverCard>

          <HoverCard openDelay={300}>
            <HoverCardTrigger className="grid w-full items-center gap-2">
              <div className="flex justify-between">
                <Label htmlFor="pres-penalty-int" className="text-left text-sm font-medium">
                  对话可能性 Presence Penalty <small className="opacity-40">(默认值: 0)</small>
                </Label>
                <InputNumber
                  id="pres-penalty-int"
                  disabled={readonly}
                  value={presP}
                  onChange={(value) => setPresP(value)}
                  max={2}
                  min={-2}
                  step={0.01}
                  controls={false}
                  className={cn(
                    defaultTextProps,
                    cn(
                      optionText,
                      'reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200'
                    )
                  )}
                />
              </div>
              <Slider
                disabled={readonly}
                value={[presP]}
                onValueChange={(value) => setPresP(value[0])}
                doubleClickHandler={() => setPresP(0)}
                max={2}
                min={-2}
                step={0.01}
                className="flex h-4 w-full"
              />
            </HoverCardTrigger>
            <OptionHover type="pres" side="left" />
          </HoverCard>
        </div>
      </div>
    </div>
  );
}

export default Settings;
