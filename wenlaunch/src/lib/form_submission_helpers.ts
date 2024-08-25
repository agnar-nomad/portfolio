import { FormSchemaType } from '@/src/models/SubmitFormData';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

type FormattedErrorType = {
  fieldName: 'title' | 'networks' | 'categories';
  type: 'error' | 'custom';
  message: string;
};

type SubmissionDataType = FormSchemaType;

export function buildSubmissionFormData(data: SubmissionDataType): FormData {
  const imageFile = data.project_logo;
  delete data.project_logo;

  const formData = new FormData();

  const fileToSend = imageFile?.[0];
  // image needs to be attached in a specified format
  if (fileToSend) {
    console.log('fileToSend', fileToSend);
    formData.append(`files.project_logo`, fileToSend, fileToSend.name);
  } else {
    console.warn(
      'Image file could not be loaded and added to submission data.',
      'fileToSend:',
      fileToSend
    );
  }

  // add datetime into a string field because Strapi messes with dates
  if (data.project_launch_datetime) {
    data['project_launch_datetime_string'] = data.project_launch_datetime;
  }

  const jsonData = JSON.stringify(data);
  formData.append('data', jsonData);

  return formData;
}

export function formatAPIError(errors: any) {
  // dissect error msg possibilities and render corresponding, user-friendly errors

  if (errors.message && errors.message.includes('NetworkError')) {
    Sentry.captureException(errors);
    return {
      fieldName: null,
      type: 'error',
      message:
        'Sorry, but we cannot connect to the Wenlaunch server. Please try again a bit later.',
    };
  }
  if (!errors.error) {
    Sentry.captureException(errors);
    return {
      fieldName: null,
      type: 'error',
      message:
        'There was an unexpected error. Try again later or contact our team.',
    };
  }

  // processing, because this is what error data fom Strapi POST look like
  const APIerrorData = errors.error;
  const details: any[] = APIerrorData.details.errors;
  const formattedErrors: FormattedErrorType[] = [];

  details.forEach((item) => {
    const [fieldName, message] = [item.path[0], item.message];

    const condition1 =
      fieldName === 'title' && message === 'This attribute must be unique';
    const condition2 = message.includes(
      'relation(s) of type api::network.network associated with this entity do not exist'
    );
    const condition3 = message.includes(
      'relation(s) of type api::category.category associated with this entity do not exist'
    );

    if (condition1) {
      formattedErrors.push({
        fieldName: 'title',
        type: 'custom',
        message:
          'The provided project title already exists with Wenlaunch. Try a different one.',
      });
    }
    if (condition2) {
      formattedErrors.push({
        fieldName: 'networks',
        type: 'custom',
        message:
          'Some of the chosen network options do not exist inside Wenlaunch. Please report this to our team so we can fix it.',
      });
    }
    if (condition3) {
      formattedErrors.push({
        fieldName: 'categories',
        type: 'custom',
        message:
          'Some of the chosen category options do not exist inside Wenlaunch. Please report this to our team so we can fix it.',
      });
    }
  });

  if (formattedErrors.length === 0) {
    return {
      fieldName: null,
      type: 'error',
      message:
        'There was an unexpected error with your submission. Please contact our team (via email or Discord) so we can fix it ASAP.',
    };
  }

  return formattedErrors;
}

export const submitFormDefaultDate = dayjs().format('YYYY-MM-DDTHH:mm');

export const projectSubmissionDefaults = {
  title: '',
  description: '',
  project_twitter_url: '',
  networks: [],
  categories: [],
  marketplace_links: [
    { name: '', url: '' },
    { name: '', url: '' },
  ],
};

export const formFieldHints = {
  dateTime:
    'Our app works with times in the UTC timezone and 24h format. In case of trouble, use a tool like savvytime.com/converter/utc ',
  projectImage:
    'For better representation. We accept jpeg, png, svg, gif, tiff images. Ideal resolution is 500x500 px. File size must not exceed 3MB.',
  mintLink: 'Where could one get their hands on your project assets?',
  description:
    'One paragraph with the most inportant info about the project. Short and sweet. Ideally below 250 characters.',
  mintPrice:
    "What is the cost associated with a purchase? You can put it as price/token or price/NFT. Whatever you prefer. It's just text.",
  contractAddress:
    'Address of the blockchain contract for your assets on whichever network.',
  liqPoolAddress:
    "Address of the main LP contract for your asset's trading pair on whichever network.",
  logoExternalLink:
    'If you already have an image hosted somewhere, or you want to add another image to our app, share a public URL here.',
  marketplaceLinks:
    'Links to wherever your assets are being bougth and sold. Where would you like to direct traders and liquidity?',
  projectExtraInfo: `Anything else about the project that you want to share with us and our visitors. Roadmap, proposals, partners, vision, background story, Whitelisting information... You name it. - Markdown syntax may be used and will be reflected on the website. See "GitHub Flavored Markdown" for examples.`,
  callerTwitterTag:
    'Twitter tag of the person who submitted the project for our community to see. Get a shoutout on our Twitter and build a reputation for good calls. Max. 30 characters',
  bullishCase:
    'One paragraph with the most important info about the project. An elevator pitch. We could include it when we talk/post about this project. Make it short and sweet. Ideally below 250 characters.',
  tradingChartLink:
    "What's the best place to follow the price movements of your asset?",
  callerTipAddress:
    'Wallet address in case traders want to appreciate your work with a small tip.',
};
