import { ClicksType, URLsType } from '@/types/supabase';

export const exampleLinkPageData: URLsType = {
  created_at: '2024-08-04T05:23:16.868294+00:00',
  custom_url: 'myweb50',
  id: 12345,
  original_url: 'https://cs50.harvard.edu/web/2020/weeks/1',
  qr: 'https://eoyynjnnmjzgquwtcuhp.supabase.co/storage/v1/object/public/qrs/qr-vigjje',
  short_url: 'akv45a',
  title: 'My Harvard Page',
  user_id: 'e24450d8-12ft-23fc-gy73-6b9497baf220',
};

export const exampleClicksData: ClicksType[] = [
  {
    city: 'San Francisco',
    country: 'USA',
    created_at: '2024-08-04T05:25:37.332936+00:00',
    device: 'mobile',
    id: 1,
    url_id: 12345,
  },
  {
    city: 'Paris',
    country: 'France',
    created_at: '2024-08-04T05:25:37.332936+00:00',
    device: 'desktop',
    id: 2,
    url_id: 12345,
  },
  {
    city: 'Vienna',
    country: 'Austria',
    created_at: '2024-08-04T05:25:37.332936+00:00',
    device: 'tablet',
    id: 3,
    url_id: 12345,
  },
  {
    city: 'Vienna',
    country: 'Austria',
    created_at: '2024-08-04T05:25:37.332936+00:00',
    device: 'mobile',
    id: 4,
    url_id: 12345,
  },
  {
    city: 'Fiorentino',
    country: 'Italy',
    created_at: '2024-08-04T05:25:37.332936+00:00',
    device: 'desktop',
    id: 5,
    url_id: 12345,
  },
  {
    city: 'San Francisco',
    country: 'USA',
    created_at: '2024-08-04T05:25:37.332936+00:00',
    device: 'XR',
    id: 6,
    url_id: 12345,
  },
  {
    city: 'Vienna',
    country: 'Austria',
    created_at: '2024-08-04T05:25:37.332936+00:00',
    device: 'mobile',
    id: 7,
    url_id: 12345,
  },
];

export const exampleDashboardPageData: URLsType[] = [
  {
    created_at: '2024-08-04T05:23:16.868294+00:00',
    custom_url: 'web50',
    id: 12345,
    original_url: 'https://cs50.harvard.edu/web/2020/weeks/1',
    qr: 'https://eoyynjnnmjzgquwtcuhp.supabase.co/storage/v1/object/public/qrs/qr-vigjje',
    short_url: 'akv45a',
    title: 'My Harvard Page',
    user_id: 'e24450d8-12ft-23fc-gy73-6b9497baf220',
  },
  {
    created_at: '2024-08-04T17:11:26.664887+00:00',
    custom_url: null,
    id: 12346,
    original_url: 'https://cs50.harvard.edu/web/2020/weeks/3',
    qr: 'https://eoyynjnnmjzgquwtcuhp.supabase.co/storage/v1/object/public/qrs/qr-vigjje',
    short_url: 'gy671d',
    title: 'Course Page',
    user_id: 'e24450d8-12ft-23fc-gy73-6b9497baf220',
  },
  {
    created_at: '2024-08-05T12:41:56.664887+00:00',
    custom_url: 'gogl',
    id: 12347,
    original_url: 'https://cs50.harvard.edu/web/2020/weeks/4',
    qr: 'https://eoyynjnnmjzgquwtcuhp.supabase.co/storage/v1/object/public/qrs/qr-vigjje',
    short_url: 'mv8ie2',
    title: 'Google Page',
    user_id: 'e24450d8-12ft-23fc-gy73-6b9497baf220',
  },
];
