import { Order } from "@medusajs/medusa"
import { Heading, Text } from "@medusajs/ui"
//additional imports for sending mail
import React, { useEffect } from 'react';
import { sendEmail } from "./sendEmail";

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0)

   // Effect to send an email whenever the component mounts
   useEffect(() => {
    sendEmail(order);
  }, []);

  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  // Render the component
  return (
    <div>
      {/* Confirmation text */}
      <Text className="mt-8">
        We have sent the order confirmation details to{" "}
        <span className="text-ui-fg-medium-plus font-semibold">
          {order.email}
        </span>.
      </Text>

      {/* Order date */}
      <Text className="mt-2">
        Order date: {new Date(order.created_at).toDateString()}
      </Text>

      {/* Order number */}
      <Text className="mt-2 text-ui-fg-interactive">
        Order number: {order.display_id}
      </Text>

      {/* Display order statuses if showStatus is true */}
      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              Order status:{" "}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              Payment status:{" "}
              <span className="text-ui-fg-subtle ">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

// Export the OrderDetails component
export default OrderDetails;
