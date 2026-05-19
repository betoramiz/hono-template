import type { Context } from 'hono';

export function resolve<T>(c: Context, name: string): T {
  return c.get('container').resolve<T>(name);
}