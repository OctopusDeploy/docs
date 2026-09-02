export type AvatarSize = 'large' | 'medium' | 'small';
export type AvatarShape = 'circle' | 'rounded';

export const avatarSizeMap: Record<AvatarSize, number> = {
  small: 20,
  medium: 36,
  large: 48,
};

export function isAvatarSize(value: unknown): value is AvatarSize {
  return value === 'small' || value === 'medium' || value === 'large';
}

export function generateFallbackText(text: string): string {
  const trimmedText = text.trim();
  if (!trimmedText) return '';

  const words = trimmedText.split(/\s+/);

  if (words.length > 1) {
    const firstWord = words[0] ?? '';
    const lastWord = words[words.length - 1] ?? '';

    return [firstWord, lastWord]
      .map((word) => Array.from(word.trim())[0])
      .filter((character): character is string => !!character)
      .join('')
      .toUpperCase();
  }

  return Array.from(trimmedText).slice(0, 2).join('').toUpperCase();
}

export function getAvatarImageUrls(
  src: string,
  size: AvatarSize
): { avatarImageUrl: string; srcSet: string } {
  const avatarImageSize = avatarSizeMap[size];

  try {
    const url = new URL(src);

    url.searchParams.set('d', '404');
    url.searchParams.set('s', avatarImageSize.toString());
    const avatarImageUrl = url.toString();

    const srcSet = [1, 2, 3]
      .map((scale) => {
        const scaledUrl = new URL(url.toString());
        scaledUrl.searchParams.set('s', (avatarImageSize * scale).toString());
        return `${scaledUrl.toString()} ${scale}x`;
      })
      .join(', ');

    return { avatarImageUrl, srcSet };
  } catch {
    return { avatarImageUrl: src, srcSet: '' };
  }
}
