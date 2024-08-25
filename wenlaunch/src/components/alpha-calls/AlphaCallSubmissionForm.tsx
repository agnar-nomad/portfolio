import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { AlphaCallSubmissionSchema, AlphaCallSubmissionType } from '@/src/models/SubmitAlphaCallFormData'
import { categoryOptionsArray, networkOptionsArray } from '@/src/models/Collections'
import InputField from '@/src/components/alpha-calls/InputField';
import { submitNewAlphaCall } from '@/src/lib/fetchers';
import { NFT_CATEGORY_ID, TOKEN_CATEGORY_ID, alphaCallSubmitDefaults, buildSubmissionFormData, formFieldHints, formatAPIError, submitFormDefaultDate } from '@/src/lib/form_submission_helpers'

export default function AlphaCallSubmissionForm() {

  const {
    register, watch, handleSubmit, setError,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
  } = useForm<AlphaCallSubmissionType>(
    {
      resolver: zodResolver(AlphaCallSubmissionSchema),
      defaultValues: alphaCallSubmitDefaults,
      shouldFocusError: true,
      mode: "onBlur",
      delayError: 300
    }
  )

  const bullishCaseWatch = watch('bullish_case');
  const bullishCaseLength = (bullishCaseWatch && bullishCaseWatch.replace(/ /g, "").length) || 0
  const isPrelaunchCall = watch('pre_launch_call')

  const categoryWatch = watch('categories');
  const tokenCategoryIsSelected = categoryWatch?.includes(TOKEN_CATEGORY_ID);
  const nftCategoryIsSelected = categoryWatch?.includes(NFT_CATEGORY_ID);

  const onFormSubmit: SubmitHandler<AlphaCallSubmissionType> = async (data) => {
    console.log('Raw Data', data)
    const formData = buildSubmissionFormData(data)
    console.log('formData', formData)

    try {
      const res = await submitNewAlphaCall(formData)
      toast.success("Alpha call submitted. Thank you for contributing to the community!")

    } catch (error) {
      console.error('POST error', error);
      const formatted = formatAPIError(error);

      if (Array.isArray(formatted)) {
        formatted.forEach(e => {
          setError(e.fieldName, { type: "custom", message: e.message }, { shouldFocus: true })
        });
        toast.error("There are errors in the submission data. Please review them before submission.")
      } else {
        toast.error(formatted.message)
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    console.log('FORM ERRORS', errors);
  }

  const networkOptions = networkOptionsArray.map(opt => ({
    value: opt.id,
    label: opt.network_name,
    id: opt.id
  }))

  const categoriesFilter = (item: any) => !["2", "6", "7", "9", "10"].includes(item.id);

  const categoryOptions = categoryOptionsArray
    .filter(categoriesFilter)
    .map(opt => ({
      value: opt.id,
      label: opt.category_name,
      id: opt.id
    }))

  return (
    <form className='grid gap-2 grid-cols-1 px-1 py-10 sm:grid-cols-2 sm:gap-4'
      onSubmit={handleSubmit(onFormSubmit)}>

      <div className="form-control">
        <InputField label='Project title' fieldName='title' errors={errors} required >
          <input type='text' {...register('title')} className='input input-bordered' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField fieldName='project_launch_datetime' label='Launch date and time (UTC)'
          hint={formFieldHints.dateTime} errors={errors}>
          <input type="datetime-local" {...register('project_launch_datetime')}
            className='input input-bordered' defaultValue={submitFormDefaultDate} />
        </InputField>
      </div>

      <div className="form-control">
        <InputField label='Twitter URL' fieldName='project_twitter_url' errors={errors} required >
          <input type='text' {...register('project_twitter_url')} className='input input-bordered'
            placeholder='https://www.twitter.com/your_project_twitter' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label="Caller's Twitter tag" fieldName='caller_twitter_tag'
          errors={errors} hint={formFieldHints.callerTwitterTag} required>
          <input type='text' className='input input-bordered'
            placeholder='@bullish_trader' {...register('caller_twitter_tag')} />
        </InputField>
      </div>

      <div className="form-control col-span-full">
        <InputField label='Status: Pre-launch or Post-launch' fieldName='pre_launch_call' errors={errors}>
          <label className="label justify-normal cursor-pointer">
            <input type="checkbox" className="checkbox" {...register('pre_launch_call')} />
            <span className="label-text px-2">Pre-launch call?</span>
          </label>
        </InputField>
      </div>

      <div className="form-control col-span-full">
        <InputField label='Make your bullish case' fieldName='bullish_case' errors={errors}
          required hint={formFieldHints.bullishCase}>
          <textarea rows={2} className='textarea textarea-bordered p-2'
            placeholder='Explain why this project will take off and why people should believe in it.' {...register('bullish_case')} />
          <span className='text-xs opacity-60 px-2 pt-1'>
            {`${bullishCaseLength} characters`}
          </span>
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Networks' fieldName='networks' errors={errors} required>
          <div className='grid grid-cols-2 lg:grid-cols-3'>
            {networkOptions.map(item => (
              <label className="label justify-normal cursor-pointer" key={item.label}>
                <input type="checkbox" className="checkbox" {...register('networks')} value={item.value} />
                <span className="label-text px-2">{item.label}</span>
              </label>
            ))}
          </div>
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Categories' fieldName='categories' errors={errors} required>
          <div className='grid grid-cols-2 lg:grid-cols-3'>
            {categoryOptions.map(item => (
              <label className="label justify-normal cursor-pointer" key={item.label}>
                <input type="checkbox" className="checkbox"
                  {...register('categories')} value={item.value} />
                <span className="label-text px-2">{item.label}</span>
              </label>
            ))}
          </div>
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Where to buy?' fieldName='project_mint_link' errors={errors}
          hint={formFieldHints.mintLink} required={!isPrelaunchCall}>
          <input type="text" className='input input-bordered' {...register("project_mint_link")} placeholder='https://my-awesome-project.com/mint' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Contract address' fieldName='project_contract_address' errors={errors}
          hint={formFieldHints.contractAddress} required={!isPrelaunchCall}>
          <input type="text" className='input input-bordered w-full' {...register("project_contract_address")} />
        </InputField>
      </div>

      <div className="w-full">
        <div className="form-control">
          <InputField label='How much is it going to cost?' fieldName='project_mint_price'
            errors={errors} hint={formFieldHints.mintPrice}>
            <input type="text" className="input input-bordered w-full" {...register("project_mint_price")}
              placeholder='0.001ETH, 20 MATIC, 1.5AVAX, 50 ADA etc.' />
          </InputField>
        </div>

        {nftCategoryIsSelected &&
          <>
            <div className="form-control">
              <InputField label="Token (max) supply" fieldName='token_supply' errors={errors}>
                <input className='input input-bordered w-full' type="text" placeholder="10000, 300M, 40B" {...register("token_supply", { shouldUnregister: true })} />
              </InputField>
            </div>
          </>}
      </div>

      <div className="w-full">
        {tokenCategoryIsSelected &&
          <>
            <div className="form-control w-full">
              <InputField label='Liquidity pool (LP) address' fieldName='liquidity_pool_address'
                errors={errors} hint={formFieldHints.liqPoolAddress}>
                <input type="text" className='input input-bordered w-full'
                  {...register("liquidity_pool_address", { shouldUnregister: true })} />
              </InputField>
            </div>

            <div className="form-control w-full">
              <InputField label='Chart link' fieldName='trading_chart_link'
                errors={errors} hint={formFieldHints.tradingChartLink}>
                <input type="text" className='input input-bordered w-full' placeholder='e.g. DEXscreener, DEXtools' {...register("trading_chart_link", { shouldUnregister: true })} />
              </InputField>
            </div>

            <div className="form-control w-full">
              <InputField label='Ticker symbol' fieldName='ticker_symbol' errors={errors} hint='Max. 10 characters'>
                <input type='text' className='input input-bordered' placeholder='e.g. STAN, BULL, PRINT, CAKE' {...register('ticker_symbol', { shouldUnregister: true })} />
              </InputField>
            </div>
          </>}
      </div>

      <div className="form-control">
        <InputField label='Website URL' fieldName='project_website_url' errors={errors}>
          <input type='text' {...register('project_website_url')}
            placeholder='https://my-awesome-project.com' className='input input-bordered' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Telegram URL' fieldName='project_telegram_url' errors={errors}>
          <input type="text" className='input input-bordered' {...register("project_telegram_url")} placeholder='https://t.me/wenlaunch' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Project profile image' fieldName='project_logo' errors={errors}
          hint={formFieldHints.projectImage}>
          <input type="file" {...register('project_logo')}
            className='file-input file-input-bordered file-input-primary'
            accept='image/png, image/jpg, image/jpeg, image/gif, image/svg, image/tiff' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='External link to a project image' fieldName='project_logo_external_link'
          hint={formFieldHints.logoExternalLink} errors={errors} >
          <input type="text" className='input input-bordered' {...register("project_logo_external_link")} placeholder='https://my-dropbox.io/images/project_profile_img.png' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label="Caller's tip address" fieldName='caller_tip_address'
          errors={errors} hint={formFieldHints.callerTipAddress} >
          <input type='text' className='input input-bordered'
            {...register('caller_tip_address')} />
        </InputField>
      </div>
      <div className="w-full"></div>

      <button className='btn btn-primary cursor-pointer' type="submit" value="Send Submission"
        disabled={!isValid || isSubmitting || isSubmitSuccessful} >
        {isSubmitting ? <span className="loading loading-spinner px-3"></span> : null}
        Send Alpha Call
      </button>

    </form>
  )
}
