
import { ChangeEvent, useMemo, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getYesterdayDateString } from "@/src/lib/helpers";
import { MdClear } from "react-icons/md";
import { useDebouncedCallback } from 'use-debounce'
import { networkOptionsArray, categoryOptionsArray } from "@/src/models/Collections"
import MultiSelect, { MultiSelectProps } from "@/src/components/all-projects/MultiSelect";
import PopupHint from "@/src/components/common/PopupHint";
import { useCreateQueryString } from "@/src/lib/hooks";


export enum FilterFields {
  NETWORK = "network",
  CATEGORY = "category",
  MINT_ENDED = "mint_ended",
  CURRENT_ONLY = "current_only",
  PAGE = "page",
  TITLE = "search"
}

const SEARCH_INPUT_DELAY = 500 // in ms

interface Props {
  loading: boolean
  onSubmit: () => void
  className?: string
}


export default function FiltersArea({ loading, onSubmit, className }: Props) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const mintEnded = useMemo(() => searchParams.get(FilterFields.MINT_ENDED) === "true" ? true : false, [searchParams])
  const onlyCurrentAndFutureProjects = useMemo(() => {
    const val = searchParams.get(FilterFields.CURRENT_ONLY)
    if (val) {
      return val === "true" ? true : false
    } else {
      return true
    }
  }, [searchParams])

  const titleParam = useMemo(() => searchParams.get(FilterFields.TITLE) || '', [searchParams])
  const titleParamRef = useRef<HTMLInputElement>(null)

  const networksParams = useMemo(() => searchParams.getAll(FilterFields.NETWORK), [searchParams])
  const categoriesParams = useMemo(() => searchParams.getAll(FilterFields.CATEGORY), [searchParams])

  const createQueryString = useCreateQueryString()

  const networkOpts = useMemo(() => networkOptionsArray.map(opt => ({
    value: opt.slug,
    label: opt.network_name,
    id: opt.id
  })), [])

  const alreadySelectedNetworks = networksParams.length > 0 ?
    networkOpts.filter(item => networksParams.includes(item.value))
    : []

  const categoryOpts = useMemo(() => categoryOptionsArray.map(opt => ({
    value: opt.slug,
    label: opt.category_name,
    id: opt.id
  })), [])

  const alreadySelectedCategories = categoriesParams.length > 0 ?
    categoryOpts.filter(item => categoriesParams.includes(item.value))
    : []

  const pushToURL = (queries: string) => router.push(pathname + '?' + queries)

  const handleCategoryChange = (values: MultiSelectProps["options"]): void => {
    const queriesInput = values.map(v => v.value)
    const queries = createQueryString(FilterFields.CATEGORY, queriesInput)

    pushToURL(queries)
  }

  const handleNetworkChange = (values: MultiSelectProps["options"]): void => {
    const queriesInput = values.map(v => v.value)
    const queries = createQueryString(FilterFields.NETWORK, queriesInput)

    pushToURL(queries)
  }

  const handleCheckboxClickMintEnd = (e: ChangeEvent<HTMLInputElement>) => {
    const query = createQueryString(FilterFields.MINT_ENDED, e.target.checked)
    pushToURL(query)
  }

  const handleCheckboxClickCurrOnly = (e: ChangeEvent<HTMLInputElement>) => {
    const query = createQueryString(FilterFields.CURRENT_ONLY, e.target.checked)
    pushToURL(query)
  }

  const debouncedTitleChange = useDebouncedCallback(
    (value: string) => {
      const query = createQueryString(FilterFields.TITLE, value);
      pushToURL(query)
    },
    SEARCH_INPUT_DELAY // delay in ms
  );

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedTitleChange(e.target.value)
  };

  const handleClearTitle = () => {
    const params = new URLSearchParams(searchParams)
    params.delete(FilterFields.TITLE)
    pushToURL(params.toString())
    if (titleParamRef.current) {
      titleParamRef.current.value = ''
    } else {
      const el = document.getElementById(FilterFields.TITLE) as HTMLInputElement
      el.value = ''
    }
  }

  return (
    <div className={`filters-area grid gap-2 md:gap-6 grid-cols-1 md:grid-cols-[minmax(24rem,auto)_minmax(30%,28rem)] ${className ?? ''}`} >
      <section className="text-input-part">

        <div className="form-control w-full mb-4">
          <label htmlFor={FilterFields.TITLE} className="label">
            <span className="label-text">Search by Title</span>
          </label>
          <div className="w-full h-full relative">
            <input type="text"
              className="input input-bordered text-sm lg:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 w-full"
              id={FilterFields.TITLE}
              onChange={handleTitleChange}
              placeholder="Type in part of a title"
              disabled={loading}
              defaultValue={titleParam}
              ref={titleParamRef} />
            <MdClear color="current-color" className="absolute inset-y-1/3 right-2 h-4 w-4 active:bg-base-200 cursor-pointer" onClick={handleClearTitle} />
          </div>
        </div>

        <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 lg:gap-4">
          <MultiSelect
            options={networkOpts}
            selectedOptions={alreadySelectedNetworks}
            label="Filter by Networks"
            placeholder="Select option(s)"
            onChange={handleNetworkChange}
          />
          <MultiSelect
            options={categoryOpts}
            selectedOptions={alreadySelectedCategories}
            label="Filter by Categories"
            placeholder="Select option(s)"
            onChange={handleCategoryChange}
          />
        </div>
      </section>

      <section className="checkboxes-and-submit md:pt-8">

        <div className="form-control w-max">
          <label htmlFor={FilterFields.MINT_ENDED} className="label justify-normal cursor-pointer">
            <input className="checkbox checkbox-primary" type="checkbox" id={FilterFields.MINT_ENDED} title="Mint Ended" checked={mintEnded} onChange={handleCheckboxClickMintEnd} disabled={loading} />
            <span className="label-text flex gap-2 items-center px-2">Mint Already Ended</span>
          </label>
        </div>

        <div className="form-control w-max">
          <label htmlFor={FilterFields.CURRENT_ONLY} className="label justify-normal cursor-pointer">
            <input className="checkbox checkbox-primary" type="checkbox" id={FilterFields.CURRENT_ONLY} title="Current Projects Only" checked={onlyCurrentAndFutureProjects} onChange={handleCheckboxClickCurrOnly} disabled={loading} />
            <span className="label-text flex gap-2 items-center px-2">Current Projects Only
              <PopupHint color="info">
                {`Selecting this option will filter only projects whose release date is *at* or *later* than yesterday (${getYesterdayDateString('dddd, Do MMMM YYYY')})`}
              </PopupHint>
            </span>
          </label>
        </div>

        <div className="my-2 text-right">
          <button className="btn btn-accent" onClick={onSubmit} disabled={loading}>Search</button>
        </div>

      </section>
    </div>
  )
}