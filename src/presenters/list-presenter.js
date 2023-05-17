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
    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();
    const points = this.model.getPoints(urlParams);
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
    this.view.addEventListener('open', this.handleViewOpen.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
    this.view.addEventListener('favorite', this.handleViewFavorite.bind(this));
  }

  /**
   * @param {CustomEvent & {target: CardView}} event
   */
  handleViewOpen(event) {
    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();

    urlParams.edit = event.target.state.id;
    this.setUrlParams(urlParams);
  }

  handleViewClose() {
    /**
     * @type {UrlParams}
     */
    const urlParams = this.getUrlParams();

    delete urlParams.edit;
    this.setUrlParams(urlParams);
  }

  /**
   * @param {CustomEvent & {target: CardView}} event
   */
  handleViewFavorite(event) {
    const card = event.target;
    const point = card.state;

    point.isFavorite = !point.isFavorite;
    card.render();
  }
}

export default ListPresenter;
