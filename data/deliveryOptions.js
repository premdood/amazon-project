export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    deliveryCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    deliveryCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    deliveryCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    return deliveryOption || deliveryOptions[0];
}