import React from 'react'
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import { VscDiffRemoved, VscDiffAdded } from 'react-icons/vsc'
import { FormSchemaType, FormSchema } from '@/src/models/SubmitFormData'
import ErrorMessage from '@/src/components/common/ErrorMessage';
import InputField from '@/src/components/submit-project/InputField';
import { submitNewProject } from '@/src/lib/fetchers';
import { TOKEN_CATEGORY_ID, buildSubmissionFormData, formFieldHints, formatAPIError, projectSubmissionDefaults, submitFormDefaultDate } from '@/src/lib/form_submission_helpers'
import { categoryOptionsArray, networkOptionsArray } from '@/src/models/Collections'
import { useUser } from '@clerk/nextjs'
import toast from 'react-hot-toast'

export default function ProjectSubmissionForm() {

  const { isLoaded: userLoaded, isSignedIn: userSignedIn, user } = useUser();

  const {
    register, watch, handleSubmit, control, setError,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
  } = useForm<FormSchemaType>(
    {
      resolver: zodResolver(FormSchema),
      defaultValues: projectSubmissionDefaults,
      shouldFocusError: false,
      mode: "onBlur",
      delayError: 300

    }
  )

  const { fields: marketPlaceFields, append, remove } = useFieldArray({
    name: 'marketplace_links',
    control,
    shouldUnregister: true
  })

  const addNewEntry = () => append({ name: '', url: '' }, { shouldFocus: true })

  const categoryWatch = watch('categories');
  const tokenCategoryIsSelected = categoryWatch?.includes(TOKEN_CATEGORY_ID);

  const onFormSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    if (userLoaded && userSignedIn) {
      data.source = "wenlaunch-app-user-" + user.username;
    }
    console.log('Modded Data', data)

    const formData = buildSubmissionFormData(data)
    console.log('formData', formData)

    try {
      const res = await submitNewProject(formData)

      toast.success("Submission successful. Thank you for contributing to the community!")

    } catch (error) {
      console.error('POST error', error)
      const formatted = formatAPIError(error)

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

  const categoryOptions = categoryOptionsArray.map(opt => ({
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

      <div className="form-control">
        <InputField label='Twitter URL' fieldName='project_twitter_url' errors={errors} required >
          <input type='text' {...register('project_twitter_url')} className='input input-bordered'
            placeholder='https://www.twitter.com/your_project_twitter' />
        </InputField>
      </div>

      <div className="form-control">
        <InputField label='Website URL' fieldName='project_website_url' errors={errors}>
          <input type='text' {...register('project_website_url')}
            placeholder='https://my-awesome-project.com' className='input input-bordered' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField fieldName='project_launch_datetime' label='Launch date and time (UTC)'
          hint={formFieldHints.dateTime} errors={errors}>
          <input type="datetime-local" {...register('project_launch_datetime')}
            className='input input-bordered' defaultValue={submitFormDefaultDate} />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Project profile image' fieldName='project_logo'
          errors={errors} hint={formFieldHints.projectImage}>
          <input type="file" {...register('project_logo')}
            className='file-input file-input-bordered file-input-primary'
            accept='image/png, image/jpg, image/jpeg, image/gif, image/svg, image/tiff' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Project mint link' fieldName='project_mint_link'
          errors={errors} hint={formFieldHints.mintLink}>
          <input type="text" className='input input-bordered' {...register("project_mint_link")} placeholder='https://my-awesome-project.com/mint' />
        </InputField>
      </div>

      <div className="form-control col-span-full">
        <InputField label='Short description' fieldName='description'
          errors={errors} hint={formFieldHints.description} required>
          <input type='text' className='input input-bordered'
            placeholder='Type description' {...register('description')} />
          <span className='text-xs opacity-60 px-2 pt-1'>
            {watch('description') ? `${watch('description').replace(/ /g, "").length} characters` : ''}
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
        <div>
          <InputField label='How much is it going to cost?' fieldName='project_mint_price'
            errors={errors} hint={formFieldHints.mintPrice}>
            <input type="text" className="input input-bordered w-full" {...register("project_mint_price")}
              placeholder='0.001ETH, 20 MATIC, 1.5AVAX, 50 ADA etc.' />
          </InputField>
        </div>
        <div>
          <InputField label="Token (max) supply" fieldName='token_supply' errors={errors}>
            <input className='input input-bordered w-full' type="text" placeholder="10000, 300M, 40B" {...register("token_supply")} />
          </InputField>
        </div>
        <div>
          <InputField label='Mint finished?' fieldName='project_mint_ended' errors={errors}>
            <label className="label justify-normal cursor-pointer">
              <input type="checkbox" className="checkbox" {...register('project_mint_ended')} />
              <span className="label-text px-2">Has the release process ended already?</span>
            </label>
          </InputField>
        </div>
      </div>

      <div className="w-full">
        <div className="form-control w-full">
          <InputField label='Contract address' fieldName='project_contract_address'
            errors={errors} hint={formFieldHints.contractAddress}>
            <input type="text" className='input input-bordered w-full' {...register("project_contract_address")} />
          </InputField>
        </div>
        {tokenCategoryIsSelected && <>
          <div className="form-control w-full">
            <InputField label='Liquidity pool (LP) address' fieldName='liquidity_pool_address'
              errors={errors} hint={formFieldHints.liqPoolAddress}>
              <input type="text" className='input input-bordered w-full'
                {...register("liquidity_pool_address", { shouldUnregister: true })} />
            </InputField>
          </div>
          <div className="form-control w-full">
            <InputField label='Ticker symbol' fieldName='ticker_symbol' errors={errors}>
              <input type='text' className='input input-bordered' placeholder='e.g. STAN, BULL, PRINT, CAKE' {...register('ticker_symbol', { shouldUnregister: true })} />
            </InputField>
          </div>
        </>}
      </div>

      <div className="form-control w-full">
        <InputField label='Discord URL' fieldName='project_discord_url' errors={errors}>
          <input type="text" className='input input-bordered' {...register("project_discord_url")} placeholder='https://discord.gg/wenlaunch' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Telegram URL' fieldName='project_telegram_url' errors={errors}>
          <input type="text" className='input input-bordered' {...register("project_telegram_url")} placeholder='https://t.me/wenlaunch' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Whitepaper URL' fieldName='project_whitepaper_url' errors={errors}>
          <input type="text" className='input input-bordered' {...register("project_whitepaper_url")} placeholder='https://wenlaunch.com/whitepaper-roadmap' />
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='External link to a project image' fieldName='project_logo_external_link'
          hint={formFieldHints.logoExternalLink} errors={errors} >
          <input type="text" className='input input-bordered' {...register("project_logo_external_link")} placeholder='https://my-dropbox.io/images/project_profile_img.png' />
        </InputField>
      </div>

      <div className="form-control w-full col-span-full">
        <InputField label='Marketplace or DEX links' fieldName='marketplace_links'
          // hint="Links to secondary sales marketplaces. Provide as many as you like using the + button"
          hint={formFieldHints.marketplaceLinks} errors={errors} >
          {marketPlaceFields.map((item, index) => (
            <div key={item.id} >
              <div className='flex flex-col sm:flex-row sm:gap-4 sm:my-0'>
                <div>
                  <label className='label text-sm opacity-80 -mb-1' htmlFor={`marketplace_links.${index}.name`}>Marketplace or DEX</label>
                  <input type="text" {...register(`marketplace_links.${index}.name` as const)}
                    className='input input-bordered' />
                </div>
                <div>
                  <label className='label text-sm opacity-80 -mb-1' htmlFor={`marketplace_links.${index}.url`}>URL</label>
                  <input type="text" {...register(`marketplace_links.${index}.url` as const)}
                    className='input input-bordered' />
                </div>
                {/* <div className='self-end'>
                    <button className='btn btn-sm btn-ghost btn-square -translate-y-2 -translate-x-3 no-animation animate-none' onClick={() => append({ name: '', url: '' })}> <VscDiffAdded size={17} /></button>
                    {index > 0 ?
                      <button className='btn btn-sm btn-ghost btn-square -translate-y-2 -translate-x-3 no-animation animate-none' onClick={() => remove(index)}><VscDiffRemoved size={17} /> </button> : null}
                  </div> */}
                {/* BUG  */}
              </div>
              {errors["marketplace_links"]?.[index] ?
                <ErrorMessage>{
                  errors["marketplace_links"]?.[index]?.url?.message ||
                  errors["marketplace_links"]?.[index]?.name?.message}
                </ErrorMessage>
                : null}
            </div>
          ))}
        </InputField>
      </div>

      <div className="form-control w-full">
        <InputField label='Blockchain domain name' fieldName='blockchain_domain_name' errors={errors}>
          <input type="text" {...register("blockchain_domain_name")} placeholder='e.g. wenlaunch.avax, vitalik.eth' className='input input-bordered' />
        </InputField>
      </div>

      <div className="form-control w-full col-span-full">
        <InputField fieldName='project_extra_info' label='Additional information (Markdown supported)'
          hint={formFieldHints.projectExtraInfo} errors={errors}>
          <textarea rows={4}  {...register("project_extra_info")} placeholder='Any and all extra details' className='textarea textarea-bordered p-2'></textarea>
        </InputField>
      </div>

      <button className='btn btn-primary cursor-pointer' type="submit" value="Send Submission"
        disabled={!isValid || isSubmitting || isSubmitSuccessful} >
        {isSubmitting ? <span className="loading loading-spinner px-3"></span> : null}
        Send Submission
      </button>

    </form>
  )
}