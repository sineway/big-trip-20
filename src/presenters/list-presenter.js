import Presenter from './presenter.js';
import {formatDate, formatDuration, formatTime} from '../utils.js';

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
  createPointViewState(point) {
    const offerGroups = this.model.getOfferGroups();
    const types = offerGroups.map((it) => ({
      value: it.type,
      isSelected: it.type === point.type,
    }));

    const destinations = this.model.getDestinations().map((it) => ({
      ...it,
      isSelected: it.id === point.destinationId,
    }));

    const group = offerGroups.find((it) => it.type === point.type);
    const offers = group.offers.map((it) => ({
      ...it,
      isSelected: point.offerIds.includes(it.id),
    }));

    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();

    return {
      id: point.id,
      types,
      destinations,
      startDateTime: point.startDateTime,
      endDateTime: point.endDateTime,
      startDate: formatDate(point.startDateTime),
      startTime: formatTime(point.startDateTime),
      endTime: formatTime(point.endDateTime),
      duration: formatDuration(point.startDateTime, point.endDateTime),
      basePrice: point.basePrice,
      offers,
      isFavorite: point.isFavorite,
      isEditable: point.id === urlParams.edit,
    };
  }

  /**
   * @override
   */
  addEventListeners() {
    /**
     * @param {CustomEvent & {target: CardView}} event
     */
    const handleViewOpen = (event) => {
      /**
       * @type {UrlParams}
       */
      const urlParams = this.getUrlParams();

      urlParams.edit = event.target.state.id;
      this.setUrlParams(urlParams);
    };

    const handleViewClose = () => {
      /**
       * @type {UrlParams}
       */
      const urlParams = this.getUrlParams();

      delete urlParams.edit;
      this.setUrlParams(urlParams);
    };

    this.view.addEventListener('open', handleViewOpen);
    this.view.addEventListener('close', handleViewClose);
  }
}

export default ListPresenter;
