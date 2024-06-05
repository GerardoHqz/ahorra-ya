import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { Store } from '../interfaces/Stores';
import { IoIosLink } from "react-icons/io";
import { FiPhone, FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { IoChevronDownOutline, IoChevronUp } from "react-icons/io5";
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import logo from "../assets/img/logo.svg"
import { Image } from 'antd';
import { offers } from "../mock_data/offers";
import { Offer } from "../interfaces/Offers";
import OfferCard from './OfferCardStore';

const items: CollapseProps['items'] = [
    {
        key: '1',
        label:<h2 className='text-secondary-text font-semibold'>Información de contacto</h2> ,
        children: <div>
            <p className='flex flex-col  pb-8'>
                Propiertario:
                <span className='flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '>
                    <FiUser size={20} color='#808   080' className='mr-2' />
                    Nombre tienda
                </span>
            </p>
            <p className='flex flex-col  pb-8'>
                Sitio web:
                <span className='flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '>
                    <IoIosLink size={20} color='#808080' className='mr-2' />
                    www.tienda.com/
                </span>
            </p>
            <p className='flex flex-col  pb-8'>
                Número de teléfono:
                <span className='flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '>
                    <FiPhone size={20} color='#808080' className='mr-2' />
                    #### ####
                </span>
            </p>
            <p className='flex flex-col  pb-8'>
                Correo electronico:
                <span className='flex border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md'>
                    <AiOutlineMail size={20} color='#808080' className='mr-2' />
                    email@email.com
                </span>
            </p>
        </div>
    }
]

const StoreOffers: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [recentOffers, setRecentOffers] = useState<Offer[]>(offers);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleContactShow = () => {
        setShowContacts(!showContacts);
    }

    const DrawerTitle = () => {
        return (
            <span className="flex items-center">
                <span>
                    <h1 className="text-xl pb-2">Nombre tienda</h1>
                    <h2 className="text-sm text-secondary-text">Dirección</h2>
                </span>
                <embed src={logo} className="size-12 mx-5" />
            </span>
        )
    }

    return (
        <>
            <button onClick={() => { setOpen(!open) }}>Ver</button>
            <Drawer
                title={<DrawerTitle />}
                placement="left"
                width={500}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button className='bg-pink text-white' onClick={onClose}>
                            Añadir oferta
                        </Button>
                    </Space>
                }
            >
                <hr />
                <Image
                    className='w-full'
                    src="https://dollarcity.com/wp-content/uploads/2023/09/dollarcity.jpg"
                />
                <p className='text-black py-5'>
                    Somos una empresa de origen centroamericana, dedicada a agregar valor a nuestros clientes a través de productos de buena calidad a excelente precio en forma ágil, eficiente y con enfoque humano
                </p>
                {/* contact information */}
               <hr />
                <Collapse defaultActiveKey={['1']} ghost items={items} className='py-5'/>
                <hr />

                {recentOffers.map((offer) => (
            <OfferCard
              id={offer.id}
              productName={offer.product_name}
              description = {offer.description}
              image={offer.images[0].url}
              actualPrice={offer.actual_price}
              previousPrice={offer.previous_price}
              duration = {offer.offer_duration}
            />
          ))}
             
            </Drawer>
        </>
    );
};

export default StoreOffers;