import { CanDeactivateFn } from '@angular/router';

export interface ComponentWithUnsavedChanges {
  isDirty?: () => boolean;
  enrollForm?: { dirty: boolean };
}

// Hands-On 7 Step 77: CanDeactivate guard prompts user if there are unsaved form changes
export const unsavedChangesGuard: CanDeactivateFn<ComponentWithUnsavedChanges> = (component) => {
  const isDirty = component.isDirty ? component.isDirty() : component.enrollForm?.dirty;
  if (isDirty) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
