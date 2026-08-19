import {
  getSignedInUser,
  addSignedInUserChangedListener,
  safeImageUrl,
  SIGNED_IN_ATTRIBUTE,
  type SignedInUser,
} from '../lib/signedInUser';
import {
  generateFallbackText,
  getAvatarImageUrls,
  isAvatarSize,
} from '../lib/avatar';
import { setAvatarImage } from './avatar';

const USER_AVATAR_SELECTOR = '[data-user-avatar]';
const USER_INITIALS_SELECTOR = '[data-user-initials]';
const USER_DETAILS_SELECTOR = '[data-user-details]';
const MENU_LABEL_SELECTOR = '[data-menu-label]';
const MENU_DESCRIPTION_SELECTOR = '[data-menu-description]';

function displayName(user: SignedInUser): string {
  return user.fullName?.trim() || user.email?.trim() || '';
}

function avatarSize(avatar: HTMLElement) {
  const size = avatar.dataset.avatarSize;
  return isAvatarSize(size) ? size : 'medium';
}

function apply() {
  const user = getSignedInUser();

  document.documentElement.setAttribute(
    SIGNED_IN_ATTRIBUTE,
    user === null ? 'false' : 'true'
  );

  if (user) {
    const name = displayName(user);
    const imageUrl = safeImageUrl(user.profileImageUrl);

    const emailTrimmed = user.email?.trim() ?? '';
    document
      .querySelectorAll<HTMLElement>(USER_DETAILS_SELECTOR)
      .forEach((row) => {
        const nameTarget = row.querySelector<HTMLElement>(MENU_LABEL_SELECTOR);
        const emailTarget = row.querySelector<HTMLElement>(
          MENU_DESCRIPTION_SELECTOR
        );

        if (nameTarget) nameTarget.textContent = name;

        // As displayName falls back to the email when there is no name, drop the second line in
        // that scenario rather than repeating the email.
        if (emailTarget) {
          const shouldHideEmail = !emailTrimmed || emailTrimmed === name;
          emailTarget.textContent = shouldHideEmail ? '' : emailTrimmed;
          emailTarget.hidden = shouldHideEmail;
        }
      });

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
