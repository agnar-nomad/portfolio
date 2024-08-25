import { z } from 'zod';
import { MAX_IMAGE_UPLOAD_SIZE } from '@/config';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { checkImageFileType } from '../lib/helpers';

dayjs.extend(utc);

const genericURL = z
  .string()
  .trim()
  .toLowerCase()
  .url({ message: 'Invalid URL format. Check domains,  http protocol.' })
  .or(z.literal(''));

const FormSchemaRequired = z.object({
  title: z
    .string({ required_error: 'Project title is required' })
    .trim()
    .min(1, { message: 'Project title is required' }),
  project_twitter_url: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: 'Required field' })
    .url({ message: 'Invalid URL format' })
    .refine(
      (value: string) =>
        value.includes('twitter.com') || value.includes('x.com'),
      { message: 'Please provide a valid twitter.com or x.com URL' }
    ),
  description: z.string().trim().min(1, { message: 'Required field' }),
});

const FormSchemaOptional = z
  .object({
    project_website_url: genericURL,
    project_launch_datetime: z
      .custom<Dayjs>((val) => dayjs(val as string).isValid(), {
        message: 'Not a valid dayjs Date format',
      })
      .transform((val) => dayjs(val).utc(true).format()),
    project_launch_datetime_string: z.string(),
    project_verified: z.boolean(),
    project_multisig: z.boolean(),
    project_doxx: z.boolean(),
    project_mint_price: z.string(),
    project_mint_ended: z.boolean(),
    token_supply: z.string(),
    blockchain_domain_name: z.string().trim().toLowerCase(),
    project_discord_url: genericURL,
    project_telegram_url: genericURL,
    project_whitepaper_url: genericURL,
    project_contract_address: z.string().trim().toLowerCase(),
    project_mint_link: genericURL,
    project_whitelist_info: z.string().trim(),
    project_extra_info: z.string(),
    project_logo_external_link: genericURL,
    project_logo: z
      .custom<FileList>((val) => val instanceof FileList, {
        message: 'We expect an image file',
      })
      .refine(
        (files) => (files.item?.(0)?.size || 0) <= MAX_IMAGE_UPLOAD_SIZE,
        'Maximum file size is 3MB'
      )
      .refine((files) => checkImageFileType(files.item?.(0) || 'undef'), {
        message:
          'Unsupported image format, only [ jpg, png, svg, tiff, gif ] are accepted',
      }),
    marketplace_links: z.array(
      z.object({
        name: z.string().trim(),
        url: genericURL,
      })
    ),
    networks: z.array(z.string()).min(1, 'Select at least 1 option'),
    categories: z.array(z.string()).min(1, 'Select at least 1 option'),
    ticker_symbol: z
      .string()
      .trim()
      .max(10, { message: 'Must be 10 or fewer characters long' }),
    liquidity_pool_address: z.string().trim().toLowerCase(),
    source: z.string().nonempty().default('wenlaunch-app'),
  })
  .partial()
  .required({ source: true });

export const FormSchema = FormSchemaRequired.merge(FormSchemaOptional);

export type FormSchemaType = z.infer<typeof FormSchema>;
