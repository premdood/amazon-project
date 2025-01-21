import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    deliveryCents: 0,
  },
  {
    id: '2',
    deliveryDays: 3,
    deliveryCents: 499,
  },
  {
    id: '3',
    deliveryDays: 1,
    deliveryCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach(option => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function isValidDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach(option => {
    if (option.id === deliveryOptionId) {
      found = true;
      return;
    }
  });

  return found;
}

function isWeekend(day) {
  const formattedDate = day.format('dddd');
  return formattedDate === 'Saturday' || formattedDate === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays) {
    deliveryDate = deliveryDate.add(1, 'days');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
}
