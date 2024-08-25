'use client'
import React from 'react'
import { useState, FormEvent } from 'react'
import { BACKEND_URL } from '@/config';


interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  project_twitter_url: HTMLInputElement;
  description: HTMLInputElement;
  project_logo: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function SubmitProjectPage() {

  const [postError, setPostError] = useState<string>('')

  const handleSubmit = async (evt: FormEvent<CustomForm>) => {
    evt.preventDefault()
    setPostError('')

    console.log('Form submission ✈️✈️')
    console.log('target', evt.target)
    console.log('currentTarget', evt.currentTarget)


    const formData = new FormData();
    const targets = evt.currentTarget.elements
    console.log('elements', targets)
    const targetsArray = Array.from(evt.currentTarget.elements)
    console.log('elements to Array: ', targetsArray)

    const data = {
      title: targets.title.value,
      description: targets.description.value,
      project_twitter_url: targets.project_twitter_url.value,
      publishedAt: null
    };

    const files = targets.project_logo.files
    if (files) {
      const fileToSend = files[0]
      console.log('fileToSend', fileToSend)
      formData.append(`files.project_logo`, fileToSend, fileToSend.name)
    }


    console.log('formData', formData)

    formData.append('data', JSON.stringify(data));
    console.log('data, formData', data, formData)

    try {
      await fetch('http://localhost:1337/api/projects',
        // await fetch(`https://wenlaunch-info.up.railway.app/api/projects`,
        {
          method: 'post',
          body: formData
        });
      setPostError('SUCCESS')
    } catch (error: any) {
      console.error('line 69: ', error)
      setPostError(error.message)
    }
  }


  return (
    <main className='grid place-content-center mx-auto max-w-7xl'>

      <form className='flex flex-col justify-evenly gap-6' onSubmit={handleSubmit}>

        <div className="form-control">
          <label htmlFor="" className="label">
            <span className="label-text">Title</span>
          </label>
          <input placeholder="Type TITLE" className="input input-bordered w-full max-w-xs" type="text" name="title" id="" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Twitter URL</span>
            <span className="label-text-alt">Top Right label</span>
          </label>
          <input name="project_twitter_url" type="text" placeholder="Type Twitter URL" className="input input-bordered input-secondary w-full max-w-xs" />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Description</span>
            <span className="label-text-alt">Top Right label</span>
          </label>
          <input name="description" type="text" placeholder="Type description" className="input input-bordered input-secondary w-full max-w-xs" />
        </div>

        <input className='file-input file-input-bordered file-input-primary' type="file" name="project_logo" />

        <input className=' input input-bordered input-secondary cursor-pointer' type="submit" value="Send Submission" />

        <p className='font-bold'>{postError && postError}</p>

      </form>
    </main>
  )
}
