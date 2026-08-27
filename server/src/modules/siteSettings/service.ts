import { SiteSettings, ISiteSettings } from './model.js';

export class SiteSettingsService {
  public static async getSettings(): Promise<ISiteSettings> {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
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
