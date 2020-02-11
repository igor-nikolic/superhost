const fs = require('fs').promises;
const path = require('path');
const rp = require('request-promise');
const ical2json = require('ical2json');
module.exports = async function (uri, calendarName) {
  try {
    const calData = await rp(
      {
        url: uri,
        headers: {
          'User-Agent': 'Request-Promise'
        }
      });
    await fs.writeFile(path.join(__dirname, "..", "public", "calendars", `${calendarName}.ical`), calData, 'utf-8');
    let jsonCalendar = ical2json.convert(calData);
    await fs.writeFile(path.join(__dirname, '..', 'public', 'calendars', `${calendarName}.json`), JSON.stringify(jsonCalendar), 'utf-8');
    return JSON.stringify(jsonCalendar);
  } catch (error) {
    console.error(`error ${error}`);
    return false;
  }
}