document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendarContainer');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid'],
    events: [
      {
        title: 'event1',
        start: '2010-01-01'
      },
      {
        title: 'event2',
        start: '2020-02-05',
        end: '2020-02-07'
      },
      {
        title: 'event2',
        start: '2020-02-05',
        end: '2010-02-08'
      },
      {
        title: 'event2',
        start: '2020-02-05',
        end: '2020-02-08'
      },
      {
        title: 'event2',
        start: '2020-02-06',
        end: '2020-02-07'
      }
    ]
  });

  calendar.render();
});