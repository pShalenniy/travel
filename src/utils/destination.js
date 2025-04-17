export const getCaptionForTab = (tab, destination) => {
  switch (tab) {
    case 'hotels':
      return `We know you'll love these hotels in <span class="text-primary">${destination}</span>`;
    case 'transport':
      return 'We got you covered!';
    case 'restaurants':
      return 'Best place to grab a bite';
    case 'activities':
      return 'Here are things to do';
    default:
      return 'Under construction';
  }
};

export const capitalizeDestination = destination => {
  return destination
    .split(' ')
    .map(item => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
};
