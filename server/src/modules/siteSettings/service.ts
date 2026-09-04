import { SiteSettings, ISiteSettings } from './model.js';

export class SiteSettingsService {
  public static async getSettings(): Promise<ISiteSettings> {
    let settings = await SiteSettings.findOne();
    const updatedServices = [
      'Full Social Media Management',
      'Carousal Design',
      'Vedio Editing',
      'Web Devolopment',
      'Ai Agent Building',
      'Digital Assets',
    ];

    if (!settings) {
      settings = await SiteSettings.create({});
    } else if (settings.bookingSection) {
      let modified = false;
      if (
        !settings.bookingSection.description ||
        settings.bookingSection.description.includes('Get a custom breakdown')
      ) {
        settings.bookingSection.description =
          'Have a question about growing your social media, designing better content, building your personal brand, or working with us? Book a session and let’s talk it through.';
        modified = true;
      }
      if (
        !settings.bookingSection.availableServices ||
        !settings.bookingSection.availableServices.includes('Full Social Media Management')
      ) {
        settings.bookingSection.availableServices = updatedServices;
        modified = true;
      }
      if (modified) {
        await settings.save();
      }
    }
    return settings;
  }

  public static async updateSettings(data: Partial<ISiteSettings>): Promise<ISiteSettings> {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(data);
    } else {
      Object.assign(settings, data);
      await settings.save();
    }
    return settings;
  }
}
