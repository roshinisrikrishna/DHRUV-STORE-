import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { Text } from "@medusajs/ui"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  isFeatured,
  //added props for discount
  buy_get_num,
  buy_get_offer,
  sales_quantity
}: ProductPreviewType) => (

  //following is changed UI to customized product preview
<Link href={`/products/${handle}`} className="group">
    <div style={{fontFamily:"Klein, sans-serif"}}>
      <Thumbnail thumbnail={thumbnail} size="full" isFeatured={isFeatured} />
      {/* <div className="flex txt-compact-medium mt-4 justify-between"> */}
        <Text className="text-black truncate" style={{fontWeight: 600}}>{title}</Text>
        <div className="flex items-center gap-x-2" style={{fontWeight: 600, fontSize:"18px"}}>
          {price ? (
            <>
              {price.price_type === "sale" && (
                <Text className="line-through text-black" style={{fontWeight: 600, fontSize:"18px"}}>
                  {price.original_price}
                </Text>
              )}
              <Text
                className={clsx("text-black", {
                  "text-red": price.price_type === "sale",
                })} style={{fontWeight: 600, fontSize:"18px"}}
              >
                {price.calculated_price}
              </Text>
              <Text className="pt-1" style={{fontWeight: 400, color: "#666666", fontSize:"13px"}}>Price excl. VAT
              </Text>
            </>
          ) : (
            <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
          )}
        {/* </div> */}
      </div>
      {/* <Text className="text-ui-fg-subtle" style={{color:"green"}}>Buy {buy_get_num} Get {buy_get_offer}% offer</Text> */}

      {sales_quantity&& sales_quantity > 5 &&(
      <Text className="text-ui-fg-subtle" style={{color:"red"}}>Bestseller</Text>
      )}
      {buy_get_num &&(
      <Text className="text-ui-fg-subtle" style={{color:"green"}}>Buy {buy_get_num} Get {buy_get_offer}% offer</Text>
      )}
     
    </div>
    <style>
              {`
              .truncate {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 100%;
                fontSize: 10px;
              }
              .text-red{
                color: RGB(181, 31, 41);
              }
              `}
            </style>
  </Link>
)

export default ProductPreview
