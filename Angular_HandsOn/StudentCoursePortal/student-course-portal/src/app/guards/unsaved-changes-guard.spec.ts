import { TestBed } from '@angular/core/testing';
import { unsavedChangesGuard } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {
  it('should return true if component is not dirty', () => {
    const mockComponent = { isDirty: () => false };
    const result = TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(mockComponent, {} as any, {} as any, {} as any)
    );
    expect(result).toBeTrue();
  });
});
