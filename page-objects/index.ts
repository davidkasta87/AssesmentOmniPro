// Page Object Model exports
export { BasePage } from './base.page';
export { HomePage } from './home.page';
export { ElementsPage } from './elements.page';
export { TextBoxPage } from './textbox.page';
export { FormsPage } from './forms.page';
export { PracticeFormPage, UserFormData } from './practiceform.page';

// Re-export commonly used types
export type { UserFormData as FormData } from './practiceform.page';