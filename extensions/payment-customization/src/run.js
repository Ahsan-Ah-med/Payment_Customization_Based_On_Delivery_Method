// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const configuration = JSON.parse(
    input?.paymentCustomization?.metafield?.value ?? "{}"
  );

  const selectedShippingOption =
    input?.cart?.deliveryGroups[0]?.selectedDeliveryOption;
  const getMethod = input?.paymentMethods.find((method) => method.name.includes("Cash on Delivery")
  );
  // console.log(getMethod?.name);
  // console.log(selectedShippingOption?.title);
  // console.log(selectedShippingOption?.handle);
  // const tolowerCheck = selectedShippingOption?.title?.toLocaleLowerCase().includes("express");
  // console.log(tolowerCheck);
  if (!selectedShippingOption?.title?.includes("Express")) {
    return NO_CHANGES;
  }
  return {
    operations: [
      {
        hide: {
          paymentMethodId: getMethod?.id || '',
        },
      },
    ],
  };
}
