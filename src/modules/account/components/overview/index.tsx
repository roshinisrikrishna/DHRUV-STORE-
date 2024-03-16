// Importing necessary components, icons, and functions from external modules and libraries
import { Customer, Order } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { formatAmount } from "medusa-react"
import Link from "next/link"

// Defining the props type for the Overview component
type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash">;
};

// Definition of the Overview component
const Overview = ({ orders, customer }: OverviewProps) => {
 // Rendering JSX for the Overview component
 return (
  <div>
    {/* Small screen view */}
    <div className="small:hidden">
      {/* Profile menu for small screens */}
      <div className="text-xl-semi mb-4 px-8">
        Hello {customer?.first_name}
      </div>
      <div className="text-base-regular">
        <ul>
          {/* Links for Profile, Addresses, and Orders */}
          <li>
            <Link
              href="/account/profile"
              className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
            >
              <>
                <div className="flex items-center gap-x-2">
                  <User size={16} />
                  <span>Profile</span>
                </div>
                <ChevronDown className="transform -rotate-90" />
              </>
            </Link>
          </li>
          <li>
            <Link
              href="/account/addresses"
              className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
            >
              <>
                <div className="flex items-center gap-x-2">
                  <MapPin size={16} />
                  <span>Addresses</span>
                </div>
                <ChevronDown className="transform -rotate-90" />
              </>
            </Link>
          </li>
          <li>
            <Link
              href="/account/orders"
              className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
            >
              <>
                <div className="flex items-center gap-x-2">
                  <Package size={16} />
                  <span>Orders</span>
                </div>
                <ChevronDown className="transform -rotate-90" />
              </>
            </Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Large screen view */}
    <div className="hidden small:block">
      {/* User information and recent orders for large screens */}
      <div className="text-xl-semi flex justify-between items-start mb-4">
        <span>Hello {customer?.first_name}</span>
        <span className="text-small-regular text-gray-700">
          Signed in as:{" "}
          <span className="font-semibold">{customer?.email}</span>
        </span>
      </div>
      <div className="flex flex-col py-8 border-t border-gray-200">
        {/* Profile completion message */}
        {getProfileCompletion(customer) < 100 && <h3 className="text-large-semi text-rose-500 mb-6">Please complete filling your billing address to complete your profile</h3>}

        {/* Profile completion, addresses, and recent orders information */}
        <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
          <div className="flex items-start gap-x-16 mb-6">
            {/* Profile completion section */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-large-semi">Profile</h3>
              <div className="flex items-end gap-x-2">
                <span className="text-3xl-semi leading-none">
                  {getProfileCompletion(customer)}%
                </span>
                <span className="uppercase text-base-regular text-gray-500">
                  Completed
                </span>
              </div>
            </div>

            {/* Addresses section */}
            <div className="flex flex-col gap-y-4">
              <h3 className="text-large-semi">Addresses</h3>
              <div className="flex items-end gap-x-2">
                <span className="text-3xl-semi leading-none">
                  {customer?.shipping_addresses?.length || 0}
                </span>
                <span className="uppercase text-base-regular text-gray-500">
                  Saved
                </span>
              </div>
            </div>
          </div>

          {/* Recent orders section */}
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <h3 className="text-large-semi">Recent orders</h3>
            </div>
            <ul className="flex flex-col gap-y-4">
              {orders ? (
                // Mapping and rendering recent orders
                orders.slice(0, 5).map((order) => {
                  return (
                    <li key={order.id}>
                      <Link href={`/order/details/${order.id}`}>
                        <div className="bg-gray-50 flex justify-between items-center p-4">
                          {/* Order details */}
                          <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                            <span className="font-semibold">Date placed</span>
                            <span className="font-semibold">
                              Order number
                            </span>
                            <span className="font-semibold">
                              Total amount
                            </span>
                            <span>
                              {new Date(order.created_at).toDateString()}
                            </span>
                            <span>#{order.display_id}</span>
                            <span>
                              {formatAmount({
                                amount: order.total,
                                region: order.region,
                                includeTaxes: false,
                              })}
                            </span>
                          </div>
                          {/* Button to navigate to order details */}
                          <button
                            className="flex items-center justify-between"
                            onClick={close}
                          >
                            <span className="sr-only">
                              Go to order #{order.display_id}
                            </span>
                            <ChevronDown className="-rotate-90" />
                          </button>
                        </div>
                      </Link>
                    </li>
                  )
                })
              ) : (
                // Message for no recent orders
                <span>No recent orders</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

// Function to calculate profile completion percentage
const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0;

  // Checking if customer data exists
  if (!customer) {
    return 0;
  }

  // Counting completed profile fields
  if (customer.email) {
    count++;
  }

  if (customer.first_name && customer.last_name) {
    count++;
  }

  if (customer.phone) {
    count++;
  }

  if (customer.billing_address) {
    count++;
  }

  // Calculating and returning profile completion percentage
  return (count / 4) * 100;
};

// Exporting the Overview component as the default export
export default Overview;
