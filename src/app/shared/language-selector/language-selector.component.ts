import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en']); // Idiomas disponibles
    this.translate.setDefaultLang('en'); // Idioma por defecto
  }

  switchLanguage(event: Event): void {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedLanguage);
  }
}
