"use client"

import React, { useState } from 'react'
import Image, { ImageLoaderProps } from 'next/image'
import defaultLogo from '/public/WL-logo-default.png';
import {
  generateBlurDataURL,
  validateBlurhash,
  defaultBlurDataURL as defaultBlurURL
} from '@/src/lib/blurhash_utils'
import { ProjectLogo } from '@/src/models/ApiModels';

interface ProfileImageProps {
  imageData?: ProjectLogo
  size: number;
  altSrc?: string;
  projectTitle: string;
  highPriority?: boolean;
  className?: string;
}


export default function ProfileImage({
  altSrc,
  size,
  projectTitle,
  highPriority = false,
  className,
  imageData,
}: ProfileImageProps) {

  const [imageError, setImageError] = useState(false)

  const imageAltText = imageData?.alternativeText || `Project logo of ${projectTitle}`;
  let imageSrc = imageData?.url || altSrc || defaultLogo;
  const fallbackImg = defaultLogo;

  let imageLoader;

  if (imageSrc === altSrc && altSrc.includes('ipfs.nftstorage.link')) {
    imageLoader = loaderProp
  }

  let blurURL: string = '';

  if (imageData?.blurhash && validateBlurhash(imageData.blurhash)) {
    blurURL = generateBlurDataURL(imageData.blurhash);
  } else {
    blurURL = defaultBlurURL;
  }

  const handleImageLoadingError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn('Image loading error, going to fallback. Culprit: ', e.target);
    setImageError(true);
  }

  return (
    <Image
      src={imageError ? fallbackImg : imageSrc}
      alt={imageAltText}
      width={size}
      height={size}
      priority={highPriority}
      placeholder="blur"
      blurDataURL={blurURL}
      className={className}
      onError={handleImageLoadingError}
      loader={imageLoader}
    />
  )
}

const loaderProp = ({ src, width }: ImageLoaderProps) => {
  return `${src}?w=${width}`;
}