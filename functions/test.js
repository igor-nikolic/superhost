const store = require('./storeCalendar');
console.log('a');
(async function () {
  const stored = await store('https://admin.booking.com/hotel/hoteladmin/ical.html?t=6eb9677c-7032-4478-9424-b030dbdfa098', 'holiday');
  console.log(stored);
})();
