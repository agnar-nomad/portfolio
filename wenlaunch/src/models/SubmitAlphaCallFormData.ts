import { z } from 'zod'
import { MAX_IMAGE_UPLOAD_SIZE } from '@/config'
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { checkImageFileType } from '../lib/helpers';

dayjs.extend(utc);

const genericURL = z.string().trim().toLowerCase().url({ message: "Invalid URL format. Check domains,  http protocol." }).or(z.literal(''));

const AlwaysRequired = z.object({
  title: z.string({ required_error: "Project title is required" })
    .trim().min(1, { message: 'Project title is required' }),
  project_twitter_url: z.string().trim().toLowerCase().min(1, { message: 'Required field' })
    .url({ message: "Invalid URL format" })
    .refine(
      (value: string) => value.includes('twitter.com') || value.includes("x.com"),
      { message: 'Please provide a valid twitter.com or x.com URL' }
    ),
  bullish_case: z.string().trim().min(1, { message: 'Required field' }),
  caller_twitter_tag: z.string().trim().min(1, { message: 'Required field' }).max(30, { message: "Must be 30 or fewer characters long" }),
  // min(1) is needed because zod will parse empty strings (default html5 and RHF behaviour) as valid
  networks: z.array(z.string()).min(1, "Select at least 1 option"),
  categories: z.array(z.string()).min(1, "Select at least 1 option"),
  source: z.string().nonempty().default('wenlaunch-app'),
});

const conditionTrue = z.object({
  pre_launch_call: z.literal(true),
});
const conditionFalse = z.object({
  pre_launch_call: z.literal(false),
});

const conditionallyRequired = z.object({
  project_contract_address: z.string().trim().min(1, { message: 'Required field' }),
  project_mint_link: z.string().trim().toLowerCase().min(1, { message: 'Required field' }).url({ message: "Invalid URL format" }),
});

const conditionallyOptional = z.object({
  project_contract_address: z.string().trim(),
  project_mint_link: genericURL,
}).partial();


const AlwaysOptional = z.object({
  project_website_url: genericURL,
  project_launch_datetime: z.custom<Dayjs>(val=> dayjs(val as string).isValid(), {message: 'Not a valid dayjs Date format'}).transform(val => dayjs(val).utc(true).format()),
  project_mint_price: z.string(),
  // pre_launch_call: z.boolean(),
  project_launch_datetime_string: z.string(),
  token_supply: z.string(),
  project_telegram_url: genericURL,
  liquidity_pool_address: z.string().trim(),
  // project_mint_link: genericURL,
  project_logo_external_link: genericURL,
  project_logo: z.custom<FileList>(
    val => val instanceof FileList, { message: 'We expect an image file' })
    .refine((files) => (files.item?.(0)?.size || 0) <= MAX_IMAGE_UPLOAD_SIZE, 'Maximum file size is 3MB')
    .refine((files) => checkImageFileType(files.item?.(0) || 'undef'), { message: 'Unsupported image format, only [ jpg, png, svg, tiff, gif ] are accepted' }),
  
  ticker_symbol: z.string().trim().max(10, { message: "Must be 10 or fewer characters long" }),
  trading_chart_link: genericURL,
  caller_tip_address: z.string().trim().toLowerCase(),
}).partial();

// export const AlphaCallSubmissionFormSchema = FormSchemaRequired.merge(FormSchemaOptional);

// export type AlphaCallSubmissionType = z.infer<typeof AlphaCallSubmissionFormSchema>;

const alwaysPresent = AlwaysRequired.merge(AlwaysOptional);

const prelaunchTrue = alwaysPresent.merge(conditionTrue).merge(conditionallyOptional);

const prelaunchFalse = alwaysPresent.merge(conditionFalse).merge(conditionallyRequired);

export const AlphaCallSubmissionSchema = z.discriminatedUnion("pre_launch_call", [prelaunchTrue, prelaunchFalse]);

export type AlphaCallSubmissionType = z.infer<typeof AlphaCallSubmissionSchema>;