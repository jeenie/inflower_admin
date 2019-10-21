import qs from 'query-string';

export const isYoutube = url => url.includes('https://youtu.be/') || url.includes('youtube.com/');
export const getYoutubeVideoId = url => {
  const { v } = qs.parseUrl(url).query;
  if (v) {
    return v;
  }
  const arr = url.split('/');
  return arr[arr.length - 1];
};