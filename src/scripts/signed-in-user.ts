import {
  getSignedInUser,
  addSignedInUserChangedListener,
  safeImageUrl,
  type SignedInUser,
} from '../lib/signedInUser';
import {
  generateFallbackText,
  getAvatarImageUrls,
  isAvatarSize,
} from '../lib/avatar';
import { setAvatarImage } from './avatar';

const SIGNED_OUT_ONLY_SELECTOR = '[data-signed-out-only]';
const SIGNED_IN_ONLY_SELECTOR = '[data-signed-in-only]';
const USER_AVATAR_SELECTOR = '[data-user-avatar]';
const USER_INITIALS_SELECTOR = '[data-user-initials]';

function displayName(user: SignedInUser): string {
  return user.fullName?.trim() || user.email?.trim() || '';
}

function avatarSize(avatar: HTMLElement) {
  const size = avatar.dataset.avatarSize;
  return isAvatarSize(size) ? size : 'medium';
}

function toggle(selector: string, hidden: boolean) {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.hidden = hidden;
  });
}

function apply() {
  const user = getSignedInUser();

  toggle(SIGNED_OUT_ONLY_SELECTOR, user !== null);
  toggle(SIGNED_IN_ONLY_SELECTOR, user === null);

  if (user) {
    const name = displayName(user);
    const imageUrl = safeImageUrl(user.profileImageUrl);

    document
      .querySelectorAll<HTMLElement>(USER_AVATAR_SELECTOR)
      .forEach((avatar) => {
        const target = avatar.querySelector<HTMLElement>(
          USER_INITIALS_SELECTOR
        );
        if (target) {
          target.textContent = generateFallbackText(name);
          if (name) target.title = name;
        }

        if (name) avatar.title = name;

        if (!imageUrl) {
          setAvatarImage(avatar, '');
          return;
        }

        const { avatarImageUrl, srcSet } = getAvatarImageUrls(
          imageUrl,
          avatarSize(avatar)
        );
        setAvatarImage(avatar, avatarImageUrl, srcSet);
      });
  }
}

apply();
addSignedInUserChangedListener(apply);

document.addEventListener('astro:after-swap', apply);
