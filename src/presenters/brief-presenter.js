import Presenter from './presenter.js';

/**
 * @extends {Presenter<BriefView>}
 */
class BriefPresenter extends Presenter {
  /**
   * @override
   * @return {BriefViewState}
   */
  createViewState() {
    // TODO: Создать динамически
    return {
      places: 'Amsterdam — Chamonix — Geneva',
      dates: 'Mar 18 — 20',
      cost: '12301',
    };
  }
}

export default BriefPresenter;
