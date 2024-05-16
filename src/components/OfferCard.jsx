import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const OfferCard = ({ id, productName, image, storeName, actualPrice, previousPrice }) => (
  <Card
  id={id}
    hoverable
    style={{
      width: 240,
      height: 325
    }}
    cover={<img className='object-scale-down h-48 w-24' alt={productName} src={image} />}
  >
    <Meta title={productName} description={storeName} />
    <div className='flex justify-between'>
      <p className='text-red-600'>${actualPrice}</p>
      <p className='line-through'>${previousPrice}</p>
    </div>
  </Card>
);
export default OfferCard;