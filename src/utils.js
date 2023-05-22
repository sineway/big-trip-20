import {escape as escapeHtml} from 'he';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

dayjs.extend(durationPlugin);

/**
 * @param {string} dateTime
 * @return {string}
 */
function formatDate(dateTime) {
  return dayjs(dateTime).format('MMM D');
}

/**
 * @param {string} dateTime
 * @return {string}
 */
function formatTime(dateTime) {
  return dayjs(dateTime).format('HH:mm');
}

/**
 * @param {string} startDateTime
 * @param {string} endDateTime
 * @return {string}
 */
function formatDuration(startDateTime, endDateTime) {
  const milliseconds = dayjs(endDateTime).diff(startDateTime);
  const duration = dayjs.duration(milliseconds);

  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }

  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }

  return duration.format('mm[m]');
}

/**
 * @param {HTMLInputElement} startDateField
 * @param {HTMLInputElement} endDateField
 * @return {() => void}
 */
function createDatePickers(startDateField, endDateField) {
  /**
   * @type {FlatpickrOptions}
   */
  const options = {
    monthSelectorType: 'static',
    dateFormat: 'Z',
    altInput: true,
    altFormat: 'd/m/y H:i',
    locale: {firstDayOfWeek: 1},
    enableTime: true,
    'time_24hr': true,
  };

  const startDatePicker = flatpickr(startDateField, options);
  const endDatePicker = flatpickr(endDateField, options);

  startDatePicker.set('onChange', (dates) => endDatePicker.set('minDate', dates.at(0)));
  endDatePicker.set('minDate', startDatePicker.selectedDates.at(0));

  return () => {
    startDatePicker.destroy();
    endDatePicker.destroy();
  };
}

class SafeHtml extends String {}

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @return {SafeHtml}
 */
function html(strings, ...values) {
  const result = strings.reduce((before, after, index) => {
    const value = values[index - 1];

    if (value === undefined) {
      return before + after;
    }

    if (Array.isArray(value) && value.every((it) => it instanceof SafeHtml)) {
      return before + value.join('') + after;
    }

    if (!(value instanceof SafeHtml)) {
      return before + escapeHtml(String(value)) + after;
    }

    return before + value + after;
  });

  return new SafeHtml(result);
}

export {formatDate, formatTime, formatDuration, createDatePickers, SafeHtml, html};
