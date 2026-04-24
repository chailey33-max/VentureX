export type SessionPhase = 'auth-loading' | 'profile-loading' | 'ready' | 'error';

/**
 * Pure state-transition helpers for the Firebase auth session lifecycle.
 * These functions make the session phase machine explicit and unit-testable
 * independently of the React component tree.
 */

export function sessionPhaseOnListenerStart(): SessionPhase {
  return 'auth-loading';
}

export function sessionPhaseOnUserDetected(): SessionPhase {
  return 'profile-loading';
}

export function sessionPhaseOnProfileReady(): SessionPhase {
  return 'ready';
}

export function sessionPhaseOnSignOut(): SessionPhase {
  return 'ready';
}

export function sessionPhaseOnError(): SessionPhase {
  return 'error';
}

export function isSessionReady(phase: SessionPhase): boolean {
  return phase === 'ready' || phase === 'error';
}
