import { REGISTER_PAGE } from '@/pages/register/data/page.data';
import type { Page } from '@/shared';

export const ANONYMOUS_PAGES: Page[] = [REGISTER_PAGE];
export const ALL_PAGES: Page[] = Array.from(new Set([...ANONYMOUS_PAGES]));
