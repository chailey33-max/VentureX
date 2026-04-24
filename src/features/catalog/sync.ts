import { BusinessIdea } from '../../types';

function isPlaceholderImage(image: string | undefined): boolean {
  return !image || image.includes('picsum.photos') || image.includes('1562016600-ece13e8ba570');
}

/**
 * Merges remote Firestore ideas into the local idea list.
 * For non-admin users, remote always wins.
 * For admin users, remote only overwrites if the idea was not locally modified,
 * unless the local copy is a placeholder and the remote has a real image.
 */
export function mergeIdeasWithRemote(
  local: BusinessIdea[],
  remote: BusinessIdea[],
  modifiedIds: Set<string>,
  isAdminContext: boolean
): BusinessIdea[] {
  const merged = [...local];

  for (const remoteIdea of remote) {
    const index = merged.findIndex((m) => m.id === remoteIdea.id);
    if (index === -1) {
      merged.push(remoteIdea);
    } else {
      const localIdea = merged[index];
      if (!localIdea) continue;

      const localIsPlaceholder = isPlaceholderImage(localIdea.image);
      const remoteIsReal = !isPlaceholderImage(remoteIdea.image);

      const shouldOverwrite =
        !isAdminContext || !modifiedIds.has(remoteIdea.id) || (localIsPlaceholder && remoteIsReal);

      if (shouldOverwrite) {
        merged[index] = remoteIdea;
      }
    }
  }

  return merged;
}
