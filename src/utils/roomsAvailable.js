import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import _uniqBy from 'lodash/uniqBy';
import _sortBy from 'lodash/sortBy';
import _minBy from 'lodash/minBy';
import { roomBathroomFacilities } from '@/utils/facilities';
import { connectors } from '@/utils/connectors';

export const getRoomBooking = room => {
  const getMainFacilities = () => {
    const beds = room.room_info.bedrooms.map(item => ({
      title: item.description
    }));

    return [
      {
        icon: 'mdi-account',
        title: room.room_info.max_persons + ' people'
      },
      {
        icon: 'mdi-texture-box',
        title: `room size ${room.room_info.room_size.metre_square} m<sup>2</sup>`
      },
      {
        icon: 'mdi-bed',
        title: room.room_info.bedroom_count + ' bedroom'
      },
      ...beds
    ];
  };
  const getBathFacilities = room.room_facilities
    .filter(item => roomBathroomFacilities.includes(item.room_facility_type_id))
    .map(item => ({
      checked: true,
      title: item.name
    }));

  const getOtherFacilities = room.room_facilities
    .filter(
      item => !roomBathroomFacilities.includes(item.room_facility_type_id)
    )
    .map(item => ({
      checked: true,
      title: item.name
    }));

  const getRoomsLeft = () => {
    if (room.rooms?.length > 0) {
      return room.rooms[0].number_of_rooms_left || null;
    }
    return null;
  };

  return {
    id: room.room_id,
    room_type: room.room_info.room_type,
    name: room.room_name,
    facilities: room.room_facilities,
    mainPhoto: room.room_photos && room.room_photos[0]?.url_max300,
    roomsLeft: getRoomsLeft(),
    photos: room.room_photos.map(item => item.url_original),
    types: room.rooms,
    info: {
      description: room.room_description,
      mainFacilities: getMainFacilities,
      bathFacilities: getBathFacilities,
      otherFacilities: getOtherFacilities
    }
  };
};

export const getRoomsBooking = (availableRooms, hotelRooms) => {
  const getCancellationInfo = room => {
    const until = moment(room.cancellation_info[0].until).subtract(1, 'minute');
    const untilDate = until.format('DD MMMM YYYY');
    const untilTime = until.format('HH:mm');
    return `<strong>FREE cancellation</strong> before ${untilTime} on ${untilDate}`;
  };

  const getMainFacilities = data => {
    const beds = data.room_info.bedrooms.map(item => ({
      title: item.description
    }));

    return [
      {
        icon: 'mdi-account',
        title: data.room_info.max_persons + ' people'
      },
      {
        icon: 'mdi-texture-box',
        title: `room size ${data.room_info.room_size.metre_square} m<sup>2</sup>`
      },
      {
        icon: 'mdi-bed',
        title: data.room_info.bedroom_count + ' bedroom'
      },
      ...beds
    ];
  };

  const hotelFacilityTypesGrouped = _groupBy(
    availableRooms[0].block,
    item => item.room_id
  );

  const hotelRoomsFiltered = hotelRooms
    .filter(item => {
      return Object.keys(hotelFacilityTypesGrouped).includes(
        item.room_id.toString()
      );
    })
    .map(item => {
      const rooms = hotelFacilityTypesGrouped[item.room_id];

      const getPrice = room => {
        const price =
          room.min_price.currency === 'GBP'
            ? room.min_price.price
            : room.min_price.other_currency.price;

        return Math.round(price).toLocaleString();
      };

      const roomsFiltered = rooms.filter(room => {
        if (room.max_occupancy > 1) {
          if (
            rooms.find(
              item =>
                getPrice(item) === getPrice(room) &&
                item.max_occupancy !== room.max_occupancy
            )
          ) {
            return false;
          }
        }

        return true;
      });

      return {
        ...item,
        type: connectors.booking,
        name: item.room_name,
        mainPhoto: item.room_photos[0].url_max300,
        photos: item.room_photos.map(photo => photo.url_original),
        facilities: item.room_facilities,
        info: {
          ...item.room_info,
          description: item.room_description,
          mainFacilities: getMainFacilities(item),
          bathFacilities: item.room_facilities
            .filter(item =>
              roomBathroomFacilities.includes(item.room_facility_type_id)
            )
            .map(item => ({
              checked: true,
              name: item.name
            })),
          otherFacilities: item.room_facilities
            .filter(
              item =>
                !roomBathroomFacilities.includes(item.room_facility_type_id)
            )
            .map(item => ({
              checked: true,
              name: item.name
            }))
        },
        roomsLeft: roomsFiltered[0].number_of_rooms_left,
        rooms: roomsFiltered.map(room => ({
          ...room,
          type: connectors.booking,
          dailyRate: getPrice(room),
          roomTypeFacilities: {
            refundable: room.refundable
              ? getCancellationInfo(room)
              : 'Non-refundable',
            breakfast: room.breakfast_included
              ? 'Breakfast included'
              : room.mealplan_description
          }
        }))
      };
    });

  const hotelRoomsSorted = _sortBy(hotelRoomsFiltered, item => {
    const minPrice = _minBy(item.rooms, room => room.min_price.price);

    return minPrice.min_price.price;
  });

  return hotelRoomsSorted;
};

export const getRoomsZentrumhub = availableRooms => {
  // combine roomInfo and rate props from response by recommendations
  const recommendations = availableRooms.recommendations.map(room => {
    const rate = availableRooms.rates.find(item => item.id === room.rates[0]);

    const averagePrice =
      rate.dailyRates.reduce((p, c) => p + c.amount, 0) /
      rate.dailyRates.length;

    return {
      rateInfo: rate,
      availability: rate.availability,
      rateId: rate.id,
      roomInfoId: rate.occupancies[0].roomId,
      occupancy: rate.occupancies[0].numOfAdults,
      rate: rate.totalRate,
      dailyRates: rate.dailyRates.map(item => item.amount),
      dailyRate: averagePrice,
      room_id: room.id,
      roomTypeFacilities: [
        rate.refundable ? 'Refundable' : 'Non-refundable',
        ...rate.includes
      ],
      ...room
    };
  });

  // group recommendations by room groupId
  const recommendationsGrouped = _groupBy(
    recommendations,
    item => item.groupId
  );

  const rooms = availableRooms.standardizedRooms.map(room => {
    // sometimes room has equal rates without difference in roomTypeFacilities
    const roomVariants = _uniqBy(recommendationsGrouped[room.id], item =>
      [item.dailyRate, item.rateInfo.refundable].join()
    );

    const roomInfo = availableRooms.rooms.find(
      item => item.id === roomVariants[0].roomInfoId
    );

    return {
      otherInfo: room,
      room_type: room.type,
      name: room.name,
      // get first image with "Standard" (links[0]) link size
      mainPhoto: room.images && room.images[0]?.links[0]?.url,
      // get images with "XL" (links[1]) link size
      photos: room.images?.map(item => item.links[1]?.url),
      roomsLeft: roomVariants[0].availability || null,
      facilities: room.facilities,
      rooms: roomVariants,
      info: {
        // description: roomVariants[0].description,
        descriptionDetailed: roomInfo.description,
        otherFacilities: room.facilities,
        mainFacilities: [
          {
            icon: 'mdi-account',
            title: roomVariants[0].occupancy + ' people'
          },
          ...roomInfo.beds.map((bed, i) => ({
            icon: i === 0 && 'mdi-bed',
            title: bed.count + ' ' + bed.type
          }))
        ]
      }
    };
  });

  console.log(rooms);

  return _sortBy(rooms, item => item.rooms[0].dailyRate);
};
