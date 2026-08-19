export const USER_COOKIE = 'OctopusSignedInUser';
export const USER_CHANGED_EVENT = 'octopus:user-changed';
export const SIGNED_IN_ATTRIBUTE = 'data-signed-in';

export type SignedInUser = {
  email?: string;
  fullName?: string;
  profileImageUrl?: string;
  userHash?: string;
};

function isSignedInUser(value: unknown): value is SignedInUser {
  if (!value || typeof value !== 'object') return false;
  const user = value as SignedInUser;
  const hasEmail = typeof user.email === 'string' && user.email.length > 0;
  const hasName = typeof user.fullName === 'string' && user.fullName.length > 0;
  return hasEmail || hasName;
}

function readCookie(): string | null {
  const match = document.cookie.match(
    new RegExp(`(^|;\\s*)${USER_COOKIE}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export function getSignedInUser(): SignedInUser | null {
  const cookie = readCookie();
  if (!cookie) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(cookie);
  } catch {
    return null;
  }

  return isSignedInUser(parsed) ? parsed : null;
}

export function safeImageUrl(value: unknown): string {
  if (typeof value !== 'string' || !value) return '';
  try {
    const url = new URL(value, window.location.origin);
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? url.href
      : '';
  } catch {
    return '';
  }
}

export function addSignedInUserChangedListener(callback: () => void) {
  const cookieStore = (window as Window & { cookieStore?: EventTarget })
    .cookieStore;

  if (cookieStore) {
    cookieStore.addEventListener('change', (event) => {
      const { changed = [], deleted = [] } = event;
      if (
        [...changed, ...deleted].some((cookie) => cookie.name === USER_COOKIE)
      ) {
        callback();
      }
    });
  }

  window.addEventListener(USER_CHANGED_EVENT, callback);
}
