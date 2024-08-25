import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaChevronDown, FaCheck } from "react-icons/fa6";


interface Option {
  id: string | number;
  value: string | number;
  label: string;
}

export interface MultiSelectProps {
  options: Option[],
  selectedOptions?: Option[]
  onChange: (returnedOptions: Option[]) => void,
  label?: string,
  altLabel?: string,
  placeholder?: string
}

export default function MultiSelect({
  options,
  selectedOptions,
  onChange,
  label,
  altLabel,
  placeholder = "Select some options"
}: MultiSelectProps) {

  const handleChange = (values: Option[]) => {
    console.log('line 47: MultiSelect onChange', values)
    onChange(values)
  }

  return (
    <div className="multi-select form-control">
      <label className="label">
        <span className="label-text">{label}</span>
        <span className="label-text-alt">{altLabel}</span>
      </label>

      <div className='select select-multiple select-bordered relative p-0'>
        <Listbox value={selectedOptions}
          onChange={handleChange}
          multiple
          by={"value"}
        >
          <Listbox.Label className="sr-only" aria-hidden="false">{label ?? 'A Select input field'}</Listbox.Label>

          <Listbox.Button
            className='relative w-full h-full px-4 bg-inherit text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 sm:text-sm flex items-center gap-2 justify-between'
          >
            <span className="block truncate flex-1">
              {selectedOptions && selectedOptions.length > 0 ? selectedOptions.map((option) => option.label).join(' | ') : <span className='opacity-70'>{placeholder}</span>}
            </span>
            <span className='pointer-events-none flex items-center'>
              <FaChevronDown className='h-3 w-3 text-current opacity-75' aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition as={Fragment}
            enter='transition ease-in duration-100'
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave='transition ease-out duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0' >
            <Listbox.Options
              className='absolute top-full left-0 mt-1 border border-primary/30 max-h-60 w-full overflow-auto bg-inherit text-base shadow-lg ring-1 focus-visible:ring-secondary/75 sm:text-sm z-50'
            >
              {options.map((opt) => (
                <Listbox.Option key={opt.id} value={opt}
                  className={({ active }) => `relative flex items-center gap-2 cursor-default select-none p-2 ${active ? 'bg-base-200' : ''}`}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-bold' : 'font-normal'}`}>
                        {opt.label}
                      </span>
                      {selected ? <FaCheck className='text-current' /> : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  )
}
