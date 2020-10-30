import "@formatjs/intl-datetimeformat/polyfill-force"
import "@formatjs/intl-datetimeformat/locale-data/is"

type Event = {
  start: Date,
  end: Date,
}

const events: Array<Event> = [
  {
    start: new Date('2020-10-25T10:30:00Z'),
    end: new Date('2020-10-25T11:30:01Z')
  },
  {
    start: new Date('2020-11-08T10:30:00Z'),
    end: new Date('2020-11-08T11:30:01Z')
  },
  {
    start: new Date('2020-11-15T10:30:00Z'),
    end: new Date('2020-11-15T11:30:01Z')
  },
];

export function getNext(): [boolean, Event?] {
  const now = Date.now();
  const event = events.find(event => now < event.end.getTime());

  if (!event) {
    return [false, undefined];
  }
  return [now > event.start.getTime(), event]
}

export function dateFormat(date: Date): string {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return date.toLocaleDateString('is-IS', options);
}

export function timeFormat(date: Date): string {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: undefined
  };
  return date.toLocaleTimeString('is-IS', options)
}