import { describe, expect, it } from 'vitest';
import { mergeIdeasWithRemote } from './sync';
import { BusinessIdea } from '../../types';

function makeIdea(overrides: Partial<BusinessIdea> & { id: string }): BusinessIdea {
  return {
    title: 'Test Idea',
    category: 'Tech',
    description: 'A test idea',
    startupCost: { min: 100, max: 500 },
    potentialIncome: '$1,000/mo',
    customerAcquisition: ['word of mouth'],
    ...overrides,
  };
}

const realImage = 'https://example.com/real-image.jpg';
const placeholderPicsum = 'https://picsum.photos/400/300';
const placeholderUnsplash = 'https://images.unsplash.com/photo-1562016600-ece13e8ba570';

describe('mergeIdeasWithRemote', () => {
  describe('new ideas from remote', () => {
    it('appends a remote idea not present locally', () => {
      const local = [makeIdea({ id: 'a' })];
      const remote = [makeIdea({ id: 'b', title: 'New Remote' })];
      const result = mergeIdeasWithRemote(local, remote, new Set(), false);
      expect(result).toHaveLength(2);
      expect(result.find((i) => i.id === 'b')?.title).toBe('New Remote');
    });

    it('preserves local ideas not present in remote', () => {
      const local = [makeIdea({ id: 'a' }), makeIdea({ id: 'b' })];
      const remote = [makeIdea({ id: 'c' })];
      const result = mergeIdeasWithRemote(local, remote, new Set(), false);
      expect(result.map((i) => i.id)).toContain('a');
      expect(result.map((i) => i.id)).toContain('b');
      expect(result.map((i) => i.id)).toContain('c');
    });
  });

  describe('non-admin: remote always wins', () => {
    it('overwrites local idea with remote version', () => {
      const local = [makeIdea({ id: 'a', title: 'Old Title' })];
      const remote = [makeIdea({ id: 'a', title: 'New Title' })];
      const result = mergeIdeasWithRemote(local, remote, new Set(), false);
      expect(result[0]?.title).toBe('New Title');
    });

    it('overwrites even locally modified ideas', () => {
      const local = [makeIdea({ id: 'a', title: 'Local Edit' })];
      const remote = [makeIdea({ id: 'a', title: 'Remote Version' })];
      const result = mergeIdeasWithRemote(local, remote, new Set(['a']), false);
      expect(result[0]?.title).toBe('Remote Version');
    });
  });

  describe('admin: local modifications are preserved', () => {
    it('keeps locally modified idea over remote version', () => {
      const local = [makeIdea({ id: 'a', title: 'Admin Local Edit' })];
      const remote = [makeIdea({ id: 'a', title: 'Remote Version' })];
      const result = mergeIdeasWithRemote(local, remote, new Set(['a']), true);
      expect(result[0]?.title).toBe('Admin Local Edit');
    });

    it('overwrites unmodified idea even for admin', () => {
      const local = [makeIdea({ id: 'a', title: 'Old' })];
      const remote = [makeIdea({ id: 'a', title: 'New Remote' })];
      const result = mergeIdeasWithRemote(local, remote, new Set(), true);
      expect(result[0]?.title).toBe('New Remote');
    });
  });

  describe('placeholder image upgrade', () => {
    it('overwrites local picsum placeholder with remote real image for admin', () => {
      const local = [makeIdea({ id: 'a', image: placeholderPicsum })];
      const remote = [makeIdea({ id: 'a', image: realImage })];
      const result = mergeIdeasWithRemote(local, remote, new Set(['a']), true);
      expect(result[0]?.image).toBe(realImage);
    });

    it('treats missing image as placeholder', () => {
      const local = [makeIdea({ id: 'a', image: undefined })];
      const remote = [makeIdea({ id: 'a', image: realImage })];
      const result = mergeIdeasWithRemote(local, remote, new Set(['a']), true);
      expect(result[0]?.image).toBe(realImage);
    });

    it('treats legacy unsplash fingerprint as placeholder', () => {
      const local = [makeIdea({ id: 'a', image: placeholderUnsplash })];
      const remote = [makeIdea({ id: 'a', image: realImage })];
      const result = mergeIdeasWithRemote(local, remote, new Set(['a']), true);
      expect(result[0]?.image).toBe(realImage);
    });

    it('does not overwrite local real image with remote placeholder', () => {
      const local = [makeIdea({ id: 'a', image: realImage, title: 'Local' })];
      const remote = [makeIdea({ id: 'a', image: placeholderPicsum, title: 'Remote' })];
      const result = mergeIdeasWithRemote(local, remote, new Set(['a']), true);
      expect(result[0]?.title).toBe('Local');
    });
  });

  it('does not mutate the input local array', () => {
    const local = [makeIdea({ id: 'a' })];
    const remote = [makeIdea({ id: 'b' })];
    const result = mergeIdeasWithRemote(local, remote, new Set(), false);
    expect(result).not.toBe(local);
    expect(local).toHaveLength(1);
  });
});
