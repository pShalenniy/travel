import random from 'lodash/random';

const fakeGoodiesFull = [
  {
    title: 'Business',
    icon: 'mdi-briefcase-variant',
    items: [
      { checked: true, title: 'Work friendly desk' },
      { checked: true, title: 'Conference centre' },
      { checked: true, title: 'Basic gym' },
      { checked: true, title: 'Jacuzzi' }
    ]
  },
  {
    title: 'Services',
    icon: 'mdi-room-service',
    items: [
      { checked: true, title: 'Front desk', label: '24 h' },
      { checked: true, title: 'Laundry' },
      { checked: true, title: 'Room service' },
      { checked: false, title: 'Shuttle service' }
    ]
  },
  {
    title: 'Food & Drink',
    icon: 'mdi-silverware-fork-knife',
    items: [
      { checked: true, title: 'Bar' },
      { checked: true, title: 'Restaurant' },
      { checked: true, title: 'Breakfast' },
      { checked: false, title: 'Buffet' }
    ]
  },
  {
    title: 'Technology',
    icon: 'mdi-youtube-tv',
    items: [
      { checked: true, title: 'WIFI' },
      { checked: true, title: 'Smart TV' },
      { checked: true, title: 'Stereo system' },
      { checked: false, title: 'Games room' }
    ]
  },
  {
    title: 'Wellness',
    icon: 'mdi-dumbbell',
    items: [
      { checked: true, title: 'Spa' },
      { checked: true, title: 'Fitness centre' },
      { checked: true, title: 'Basic gym' },
      { checked: true, title: 'Jacuzzi' }
    ]
  },
  {
    title: 'Other',
    icon: 'mdi-dots-horizontal',
    items: [
      { checked: false, title: 'Parking' },
      { checked: true, title: 'Accessibility' },
      { checked: true, title: 'Child friendly' },
      { checked: false, title: 'Pets' }
    ]
  }
];
const fakeMasonry = Array.from(
  { length: 5 },
  (_, idx) => `/imgs/masonry/resto_asset_${idx + 1}.jpg`
);

const arrayLoremIpsum = function(length) {
  return Array.from({ length: length }, (_, idx) => `Lorem ipsum ${idx + 1}`);
};

export default {
  data() {
    return {
      fakeMasonry: fakeMasonry,
      fakeGoodies: [
        {
          checked: true,
          icon: 'mdi-silverware-fork-knife',
          title: 'Breakfast',
          label: 'extra'
        },
        {
          checked: true,
          icon: 'mdi-room-service',
          title: 'Front desk',
          label: '24 h'
        },
        {
          checked: true,
          icon: 'mdi-wifi',
          title: 'WIFI',
          label: 'free'
        },
        {
          checked: false,
          icon: 'mdi-car',
          title: 'Parking'
        }
      ],
      fakeGoodiesFull: fakeGoodiesFull,
      fakeRooms: Array.from({ length: 5 }, () => ({
        info: [
          {
            icon: 'mdi-account',
            title: '2 people'
          },
          {
            icon: 'mdi-bed',
            title: '1 double bed'
          },
          {
            icon: 'mdi-wifi',
            title: 'WIFI'
          },
          {
            icon: 'mdi-silverware-fork-knife',
            title: 'Breakfast'
          }
        ],
        infoAll: fakeGoodiesFull.splice(0, 4)
      })),
      fakeProviders: Array.from({ length: 5 }, (_, idx) => ({
        id: idx,
        name: idx % 2 === 0 ? 'Google' : 'Tripadvisor',
        icon: idx % 2 === 0 ? 'mdi-google' : 'mdi-parachute',
        image: '/card_placeholder.png',
        rating: this.$faker().random.number({ min: 10, max: 50 }) / 10,
        goodies: [
          { icon: 'mdi-food', title: 'Good breakfast' },
          { icon: 'mdi-map-marker', title: 'Great location' },
          { icon: 'mdi-room-service', title: 'Top service' }
        ]
      })),
      fakeLocation: {
        rating: (
          this.$faker().random.number({ min: 10, max: 50 }) / 10
        ).toFixed(1),
        ratingDesc: 'Excellent Location!',
        goodies: [
          {
            icon: 'mdi-airplane',
            title: `<strong>3 mi</strong> from Porto International Airport`
          },
          {
            icon: 'mdi-train',
            title: `<strong>0.1 mi</strong> from Porto airport`
          },
          {
            icon: 'mdi-map-marker',
            title: `<strong>0.2 mi</strong> from City centre`
          },
          {
            icon: 'mdi-silverware-fork-knife',
            title: `<strong>8,312</strong> Restaurants & bars nearby`
          }
        ]
      },
      fakeThingsToKnow: [
        {
          icon: 'mdi-clock-outline',
          title: `Check in: From <strong>15:00</strong>`
        },
        {
          icon: 'mdi-clock-outline',
          title: `Check out: By <strong>11:00</strong>`
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Groups allowed. We can try arrange rooms near eachother'
        },
        {
          icon: 'mdi-baby-carriage',
          title: `Children welcome, and we can supply extra beds. Must be accompanied by an adult.<br> Extra bed: £30 per child`
        },
        {
          icon: 'mdi-smoking-off',
          title: 'No smoking, only outside'
        },
        {
          icon: 'mdi-paw',
          title: 'No pets'
        },
        {
          icon: 'mdi-credit-card-outline',
          title: 'All cards accepted'
        }
      ],
      fakeGallery: Array.from({ length: 8 }, (_, idx) => {
        if (idx === 1) {
          return {
            thumb: `/imgs/placeholders/hotel_room_${random(4, 10)}.jpg`,
            caption: this.$faker().random.word(),
            sources:
              idx === 1
                ? [
                    {
                      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                      type: 'video/mp4'
                    }
                  ]
                : null,
            type: 'video',
            width: 800,
            height: 600,
            autoplay: true
          };
        } else {
          return {
            thumb: `/imgs/placeholders/hotel_room_${random(1, 8)}.jpg`,
            src: `/imgs/placeholders/hotel_room_${random(2, 10)}.jpg`,
            caption: this.$faker().random.word()
          };
        }
      }),
      fakePreferenceItems: {
        hotels: ['Near office', 'Luxury', '5 star', ...arrayLoremIpsum(5)],
        transport: [
          'Luxury',
          'WIFI',
          'Limousine',
          'Private',
          ...arrayLoremIpsum(5)
        ],
        restaurants: ['Trendy', 'Client friendly', ...arrayLoremIpsum(5)],
        activities: ['Client friendly', ...arrayLoremIpsum(5)]
      },
      fakePreferenceItemsPopular: {
        hotels: ['Near office', 'Luxury', '5 star', 'Lorem ipsum 1'],
        transport: ['Luxury', 'WIFI', 'Limousine', 'Private'],
        restaurants: ['Trendy', 'Client friendly', ...arrayLoremIpsum(2)],
        activities: ['Client friendly', ...arrayLoremIpsum(2)]
      },
      fakeDestination: Array.from({ length: 8 }, (_, idx) => ({
        id: idx,
        title: this.$faker().address.city(),
        image: `/imgs/city_postals/postal_${idx + 1}.jpg`
      })),
      fakePaymentsCards: Array.from({ length: 2 }, (_, idx) => ({
        id: idx,
        image: '/card_placeholder.png',
        holder: this.$faker().name.findName(),
        title: 'VISA Debit (****1993)',
        expires: 'Expires: 01/22',
        type: idx % 2 === 0 ? 'Default' : ''
      })),
      fakeCar: {
        title: 'BMW 2 Coupe or similar',
        price: 360,
        totalPrice: 1440,
        days: 4,
        goodies: [
          {
            icon: 'mdi-account',
            title: '5 seats'
          },
          {
            icon: 'mdi-car',
            title: 'Automatic'
          },
          {
            icon: 'mdi-briefcase-outline',
            title: '2 bags'
          },
          {
            icon: 'mdi-gas-station',
            title: 'Petrol'
          }
        ],
        priceIncludes: [
          'Collision Damage Waiver (Excess amount: Premium £250',
          'Theft Waiver (Excess amount: Premium £200)',
          'Licence and Fees e.g. vehicle tax, first registration fees',
          'VAT and local tax'
        ],
        priceExcludes: [
          'Value Cover. Glass, Lights and Tyre Protection',
          'Extras such as Sat Nav, children car seat',
          'Deposit',
          'Fuel'
        ]
      }
    };
  }
};
