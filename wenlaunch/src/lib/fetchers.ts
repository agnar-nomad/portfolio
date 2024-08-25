import { BACKEND_URL, PAGINATION_SIZE } from '@/config';
import { API_TOKEN } from '@/config';
import { Project, Changelog } from '@/src/models/ApiModels';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface HomePageDataResponse {
  data: Project[];
}
interface ProjectPageDataResponse {
  data: Project;
}
interface ChangelogPageDataResponse {
  data: Changelog[];
}

const SIXTY_SECONDS = 60 * 1;
const FIVE_MINUTES = 60 * 5;
const ONE_HOUR = 60 * 60;

export const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export async function fetchHomePageData(): Promise<Project[]> {
  // TODO
  const yesterday = dayjs().subtract(1, 'days');
  const lastNightStr = yesterday.utc().hour(21).startOf('hour').toISOString(); // yesterday at 9pm UTC

  const filterFromDate = `filters[project_launch_datetime][$gte]=${lastNightStr}`;
  const filterToDate = `filters[project_launch_datetime][$lte]=2045-01-01T00:00:00Z`; // some future
  const sortBy = `sort=project_launch_datetime:asc`;
  const paginationOpt = `pagination[page]=1&pagination[pageSize]=${PAGINATION_SIZE}`;
  const queryString = `projects?${filterFromDate}&${filterToDate}&${sortBy}&${paginationOpt}&populate=*`;

  const res = await fetch(`${BACKEND_URL}/${queryString}`, {
    ...fetchOptions,
    cache: 'no-store',
  });
  const { data }: HomePageDataResponse = await res.json();

  return data;
}

export async function fetchBannerData(): Promise<Project[]> {
  const res = await fetch(
    `${BACKEND_URL}/projects?filters[home_banner][$eq]=true&populate=*`,
    {
      ...fetchOptions,
      cache: 'no-store',
      // next: { revalidate: SIXTY_SECONDS }
    }
  );
  const { data }: HomePageDataResponse = await res.json();

  return data;
}

export async function fetchProjectPageData(slug: string): Promise<Project> {
  const res = await fetch(
    `${BACKEND_URL}/slugify/slugs/project/${slug}?populate=*`,
    {
      ...fetchOptions,
      // next: {revalidate: FIVE_MINUTES}
      cache: 'no-store',
    }
  );
  const { data }: ProjectPageDataResponse = await res.json();

  return data;
}

export async function submitNewProject(submission: string | FormData) {
  const url = `${BACKEND_URL}/projects`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: submission,
  });

  if (res.ok) {
    const { data }: ProjectPageDataResponse = await res.json();
    return data;
  } else {
    const apiError = await res.json();
    throw apiError;
  }
}

export async function fetchChangelogPageData() {
  try {
    const res = await fetch(`${BACKEND_URL}/changelogs?sort=id:desc`, {
      ...fetchOptions,
      next: { revalidate: ONE_HOUR },
    });

    const { data }: ChangelogPageDataResponse = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchLatestSubmissionData() {
  // a specific date
  const cutoffDay = dayjs('2024-07-17').utc().toISOString();

  const filterFromDate = `filters[createdAt][$gte]=${cutoffDay}`;
  const sortBy = `sort=createdAt:desc`;
  const paginationOpt = `pagination[page]=1&pagination[pageSize]=${50}`;
  const queryString = `projects?${filterFromDate}&${sortBy}&${paginationOpt}&publicationState=preview&populate=*`;

  try {
    const res = await fetch(`${BACKEND_URL}/${queryString}`, {
      ...fetchOptions,
      cache: 'no-store',
    });

    if (res.ok) {
      const { data }: HomePageDataResponse = await res.json();
      return data;
    } else {
      throw new Error('Latest Submissions fetch failed');
    }
  } catch (error) {
    console.error(error);
  }
}
