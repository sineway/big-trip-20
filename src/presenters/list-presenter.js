import Presenter from './presenter.js';

/**
 * @extends {Presenter<ListView, AppModel>}
 */
class ListPresenter extends Presenter {
  /**
   * @override
   * @return {ListViewState}
   */
  createViewState() {
    const points = this.model.getPoints();
    const items = points.map(this.createPointViewState, this);

    return {items};
  }

  /**
   * @param {Point} point
   * @return {PointViewState}
   */
  createPointViewState(point, index) {
    return {
      id: point.id,
      types: [],
      destinations: [],
      startDateTime: point.startDateTime,
      endDateTime: point.endDateTime,
      startDate: '',
      startTime: '',
      endTime: '',
      duration: '',
      basePrice: point.basePrice,
      offers: [],
      isFavorite: point.isFavorite,
      isEditable: index === 0,
    };
  }
}

export default ListPresenter;
