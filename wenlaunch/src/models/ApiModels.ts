export interface Project {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  description: string;
  project_twitter_url: string;
  project_website_url?: string;
  slug: string;
  home_banner?: boolean;
  project_launch_datetime?: string;
  project_mint_price?: string;
  project_mint_ended?: boolean;
  token_supply?: string;
  project_extra_info?: string;
  project_discord_url?: string;
  project_telegram_url?: string;
  project_whitepaper_url?: string;
  project_verified?: boolean;
  project_multisig?: boolean;
  project_doxx?: boolean;
  project_rating?: number;
  project_whitelist_info?: string;
  project_contract_address?: string;
  project_mint_link?: string;
  project_logo?: ProjectLogo;
  project_logo_external_link?: string;
  marketplace_links?: Marketplace[];
  blockchain_domain_name?: string;
  networks: Network[];
  categories: Category[];
  source?: string;
  ticker_symbol?: string;
  liquidity_pool_address?: string;
  project_launch_datetime_string?: string;
}

export interface Network {
  id: number;
  network_name: string;
  network_abbreviation: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  category_name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ApiMetadata {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
    total: number
  }
}

export interface ProjectLogo {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: object[] | null;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url?: string;
  previewUrl?: string;
  provider?: string;
  provider_metadata?: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  blurhash?: string;
}

interface Marketplace {
  name: string;
  url: string
}

export interface Changelog {
  id: number;
  title: string;
  frontend_changes?: string;
  backend_changes?: string;
  additional_info?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface AlphaCall {
  id: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  title: string;
  project_twitter_url: string;
  bullish_case: string;
  pre_launch_call: boolean;
  caller_twitter_tag: string;
  project_launch_datetime?: string;
  project_website_url?: string;
  project_mint_price?: string;
  token_supply?: string;
  project_telegram_url?: string;
  project_contract_address?: string;
  project_mint_link?: string;
  project_logo?: ProjectLogo;
  project_logo_external_link?: string;
  networks: Network[];
  categories: Category[];
  source?: string;
  ticker_symbol?: string;
  liquidity_pool_address?: string;
  trading_chart_link?: string;
  caller_tip_address?: string;
}