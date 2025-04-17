const weHaveImagesFor = [
  { images: 3, city: 'aberdeen' },
  { images: 3, city: 'amsterdam' },
  { images: 5, city: 'athens' },
  { images: 5, city: 'barcelona' },
  { images: 3, city: 'belfast' },
  { images: 4, city: 'berlin' },
  { images: 3, city: 'birmingham' },
  { images: 4, city: 'bologna' },
  { images: 6, city: 'boston' },
  { images: 5, city: 'bristol' },
  { images: 3, city: 'brussels' },
  { images: 5, city: 'budapest' },
  { images: 3, city: 'copenhagen' },
  { images: 5, city: 'doha' },
  { images: 3, city: 'dubai' },
  { images: 4, city: 'dublin' },
  { images: 3, city: 'dusseldorf' },
  { images: 4, city: 'edinburgh' },
  { images: 5, city: 'frankfurt' },
  { images: 7, city: 'geneva' },
  { images: 3, city: 'glasgow' },
  { images: 6, city: 'gothenburg' },
  { images: 5, city: 'hanover' },
  { images: 3, city: 'helsinki' },
  { images: 7, city: 'hongkong' },
  { images: 5, city: 'istanbul' },
  { images: 5, city: 'lisbon' },
  { images: 3, city: 'london' },
  { images: 5, city: 'luxembourg' },
  { images: 3, city: 'lyon' },
  { images: 4, city: 'madrid' },
  { images: 3, city: 'manchester' },
  { images: 3, city: 'miami' },
  { images: 3, city: 'milan' },
  { images: 3, city: 'munich' },
  { images: 4, city: 'newyorkcity' },
  { images: 3, city: 'nice' },
  { images: 3, city: 'nuremberg' },
  { images: 3, city: 'oslo' },
  { images: 4, city: 'paris' },
  { images: 5, city: 'prague' },
  { images: 7, city: 'rome' },
  { images: 4, city: 'sanfrancisco' },
  { images: 5, city: 'shanghai' },
  { images: 4, city: 'singapore' },
  { images: 3, city: 'stockholm' },
  { images: 5, city: 'vienna' },
  { images: 6, city: 'warsaw' },
  { images: 4, city: 'washington' },
  { images: 5, city: 'zurich' }
];

export const getRandomAbstractImage = () => {
  const random = Math.floor(Math.random() * 21);

  return `/city_postals/abstract/abstract_${random}.jpg`;
};

export const getDestinationImage = destination => {
  const lowerCasedDestination = destination.replace(/ /g, '').toLowerCase();
  const city = weHaveImagesFor.find(
    item => item.city === lowerCasedDestination
  );
  if (city) {
    const random = Math.floor(Math.random() * city.images);

    return `/city_postals/${lowerCasedDestination}_${random}.jpg`;
  } else {
    return getRandomAbstractImage();
  }
};
