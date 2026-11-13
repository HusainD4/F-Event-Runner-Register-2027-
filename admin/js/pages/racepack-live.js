import { initRacepackLivePage } from './racepack-view.js';
import { apiClient } from '../../../js/api.js';
import { applyHomeAppearance } from '../../../js/home-appearance.js';

initRacepackLivePage();
apiClient.getWebsiteSettings().then(settings => {
  if (settings) applyHomeAppearance(settings);
});
