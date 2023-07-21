import { createClient } from 'contentful';

export const trimString = (str: string, length: number): string => {
  let trimmedString = str.substring(0, length);
  trimmedString = trimmedString.substring(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );

  return trimmedString;
};

const getDayString = (input: number, option: 'long' | 'short'): string => {
  if (option == 'long') {
    switch (input) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return '';
    }
  } else {
    switch (input) {
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
      default:
        return '';
    }
  }
};

const getMonthString = (input: number, option: 'long' | 'short'): string => {
  if (option == 'long') {
    switch (input) {
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return '';
    }
  } else {
    switch (input) {
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
      default:
        return '';
    }
  }
};

const getTimeString = (hour: number, minutes: number): string => {
  let hours;
  let suffix;

  if (hour < 12) {
    suffix = 'am';
    if (hour == 0) {
      hours = '12';
    } else {
      hours = hour;
    }
  } else {
    suffix = 'pm';
    switch (hour) {
      case 13:
        hours = '1';
        break;
      case 14:
        hours = '2';
        break;
      case 15:
        hours = '3';
        break;
      case 16:
        hours = '4';
        break;
      case 17:
        hours = '5';
        break;
      case 18:
        hours = '6';
        break;
      case 19:
        hours = '7';
        break;
      case 20:
        hours = '8';
        break;
      case 21:
        hours = '9';
        break;
      case 22:
        hours = '10';
        break;
      case 23:
        hours = '11';
        break;
      default:
        break;
    }
  }

  if (minutes == 0) {
    return `${hours}${suffix}`;
  } else {
    return `${hours}:${minutes}${suffix}`;
  }
};

export const getGigDate = (input: string | Date) => {
  if (typeof input == 'string') {
    input = new Date(input);
  }
  const day = input.getDate();
  const weekday = getDayString(input.getDay(), 'short');
  const month = getMonthString(input.getMonth(), 'long');
  const time = getTimeString(input.getHours(), input.getMinutes());
  return {
    day,
    weekday,
    month,
    time,
  };
};

const getContentfulClient = () => {
  //checks to see if environment variables are loaded
  if (!process.env.SPACE_ID) {
    throw new Error('contentful SPACE_ID is missing');
  }
  if (!process.env.ACCESS_TOKEN) {
    throw new Error('contentful ACCESS_TOKEN is missing');
  }

  //create new instance of contentful client using api key data (see .env.local file)
  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
  });
  return client;
};

export const contentfulClient = getContentfulClient();
