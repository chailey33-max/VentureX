import { describe, expect, it } from 'vitest';
import {
  isSessionReady,
  sessionPhaseOnError,
  sessionPhaseOnListenerStart,
  sessionPhaseOnProfileReady,
  sessionPhaseOnSignOut,
  sessionPhaseOnUserDetected,
  type SessionPhase,
} from './session';

describe('auth session phase transitions', () => {
  describe('initial state', () => {
    it('starts in auth-loading when listener attaches', () => {
      expect(sessionPhaseOnListenerStart()).toBe('auth-loading');
    });
  });

  describe('signed-in path', () => {
    it('moves to profile-loading when a user is detected', () => {
      expect(sessionPhaseOnUserDetected()).toBe('profile-loading');
    });

    it('moves to ready when profile and token are loaded', () => {
      expect(sessionPhaseOnProfileReady()).toBe('ready');
    });
  });

  describe('signed-out path', () => {
    it('moves to ready when no user is present (signed out)', () => {
      expect(sessionPhaseOnSignOut()).toBe('ready');
    });
  });

  describe('error path', () => {
    it('moves to error when token claim retrieval fails', () => {
      expect(sessionPhaseOnError()).toBe('error');
    });
  });

  describe('full lifecycle sequences', () => {
    it('reflects the happy-path sign-in sequence', () => {
      const phases: SessionPhase[] = [
        sessionPhaseOnListenerStart(),
        sessionPhaseOnUserDetected(),
        sessionPhaseOnProfileReady(),
      ];
      expect(phases).toEqual(['auth-loading', 'profile-loading', 'ready']);
    });

    it('reflects the sign-out sequence', () => {
      const phases: SessionPhase[] = [sessionPhaseOnListenerStart(), sessionPhaseOnSignOut()];
      expect(phases).toEqual(['auth-loading', 'ready']);
    });

    it('reflects the token error sequence', () => {
      const phases: SessionPhase[] = [
        sessionPhaseOnListenerStart(),
        sessionPhaseOnUserDetected(),
        sessionPhaseOnError(),
      ];
      expect(phases).toEqual(['auth-loading', 'profile-loading', 'error']);
    });
  });

  describe('isSessionReady', () => {
    it('returns true for ready phase', () => {
      expect(isSessionReady('ready')).toBe(true);
    });

    it('returns true for error phase (auth settled, just errored)', () => {
      expect(isSessionReady('error')).toBe(true);
    });

    it('returns false while still loading', () => {
      expect(isSessionReady('auth-loading')).toBe(false);
      expect(isSessionReady('profile-loading')).toBe(false);
    });
  });
});
