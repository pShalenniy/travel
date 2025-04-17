import { connectors } from '@/utils/connectors';

export const popularFacilities = [
  {
    title: 'WiFi',
    number: {
      booking: [
        96,
        107, // free
        164 // paid
      ],
      zentrumhub: 16
    },
    icon: 'mdi-wifi'
  },
  {
    title: 'Air conditioning',
    number: {
      booking: 109,
      zentrumhub: []
    },
    icon: 'mdi-hvac'
  },
  {
    title: 'Restaurant',
    number: {
      booking: 3,
      zentrumhub: 14
    },
    icon: 'mdi-silverware'
  },
  {
    title: 'Fitness Centre',
    number: {
      booking: 11,
      zentrumhub: 17
    },
    icon: 'mdi-dumbbell'
  },
  {
    title: 'Breakfast Available',
    number: {
      booking: [24, 43],
      zentrumhub: 5
    },
    icon: 'mdi-silverware-fork-knife'
  },
  {
    title: 'Business Centre',
    number: {
      booking: 20,
      zentrumhub: []
    },
    icon: 'mdi-domain'
  },
  {
    title: 'Parking Available',
    number: {
      booking: [2, 160, 161, 162],
      zentrumhub: 1
    },
    icon: 'mdi-car'
  },
  {
    title: 'Bar',
    number: {
      booking: 7,
      zentrumhub: 2
    },
    icon: 'mdi-glass-cocktail'
  },
  {
    title: 'Laundry',
    number: {
      booking: 22,
      zentrumhub: 12
    },
    icon: 'mdi-washing-machine'
  },
  {
    title: 'Daily Housekeeping',
    number: {
      booking: 158,
      zentrumhub: []
    },
    icon: 'mdi-spray-bottle'
  },
  {
    title: '24/7 Front Desk',
    number: {
      booking: 8,
      zentrumhub: 2063
    },
    icon: 'mdi-room-service'
  }
];

export const roomBathroomFacilities = [
  4,
  5,
  12,
  19,
  20,
  24,
  27,
  31,
  38,
  42,
  43,
  69,
  72,
  92,
  100,
  118,
  124,
  141,
  147,
  148,
  149,
  150,
  151,
  153,
  154,
  176,
  177,
  178,
  179,
  180
];

export const filterFacilities = [
  {
    value: 107,
    label: 'Free Wifi'
  },
  {
    value: 11,
    label: 'Fitness Centre'
  },
  {
    value: 20,
    label: 'Business Centre'
  },
  {
    value: 2,
    label: 'Parking Available'
  },
  {
    value: 3,
    label: 'Restaurant '
  },
  {
    value: 7,
    label: 'Bar'
  }
];

const popularFacilitiesNumbers = source =>
  popularFacilities.map(item => item.number[source]).flat();

export const safetyFacilitiesNumbers = [37, 38, 39, 40, 41];

export const findFacilitiesPopular = (
  facilities,
  source = connectors.booking
) => {
  const popularExisted = facilities.filter(item => {
    return popularFacilitiesNumbers(source).includes(+item.groupId);
  });

  const popularExistedNumbers = popularExisted.map(item => +item.groupId);
  const popularExistedAttrs = popularExisted.filter(item => item.attrs);

  return popularFacilities
    .filter(item => {
      if (typeof item.number[source] === 'number') {
        return popularExistedNumbers.includes(item.number[source]);
      }

      return item.number[source].some(n => popularExistedNumbers.includes(n));
    })
    .map(item => {
      if (item.title === 'WiFi') {
        return {
          ...item,
          checked: true,
          title: popularExistedNumbers.includes(107) ? 'Free WiFi' : 'WiFi',
          label: popularExistedNumbers.includes(164) ? 'paid' : false
        };
      }

      const popularItem =
        typeof item.number[source] === 'number'
          ? popularExistedAttrs.find(
              n => n.hotel_facility_type_id === item.number[source]
            )
          : popularExistedAttrs.find(n =>
              item.number[source].includes(n.hotel_facility_type_id)
            );

      if (popularItem) {
        return {
          ...item,
          checked: true,
          label: popularItem.attrs && popularItem.attrs.join(', ')
        };
      }

      return { ...item, checked: true };
    });
};
