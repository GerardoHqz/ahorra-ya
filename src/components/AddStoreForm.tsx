import React, { useState } from 'react';
import { Store } from '../interfaces/Stores';
import { Input } from 'antd';
import { IoIosLink } from "react-icons/io";
import { FiPhone, FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";


const AddStoreForm: React.FC = () => {
  const [formData, setFormData] = useState<Store>({
    id: '',
    name: '',
    description: '',
    department: '',
    town: '',
    address: '',
    owner_name: '',
    website: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const { id, name, description, department, town, address, owner_name, website, phone, email } = formData;
  
    console.log("Form data:", { id, name, description, department, town, address, owner_name, website, phone, email });
    setFormData({
      id: '',
      name: '',
      description: '',
      department: '',
      town: '',
      address: '',
      owner_name: '',
      website: '',
      phone: '',
      email: '',
    });
  };
  

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label className='flex flex-col pb-8'>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} className='border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '/>
      </label>
      <label className='flex flex-col pb-8'>
        Descripción:
        <textarea name="description" value={formData.description} onChange={handleChange} className='border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '/>
      </label>
      <span className='flex justify-between'>
        <label className='flex flex-col pb-8'>
          Departamento:
          <input type="text" name="department" value={formData.department} onChange={handleChange} className='w-full border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '/>
        </label>
        <label className='flex flex-col pb-8'>
          Municipio:
          <input type="text" name="town" value={formData.town} onChange={handleChange} className='w-full border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '/>
        </label>
      </span>
      <label className='flex flex-col pb-8'>
        Dirección:
        <input type="text" name="address" value={formData.address} onChange={handleChange} className='border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md '/>
      </label>
      <hr />
      <h1 className='text-sm text-secondary-text py-3 mb-5'>Información de contacto</h1>
      <label className='flex flex-col pb-8'>
        Propiertario:
        <Input type="text" name="owner_name" value={formData.owner_name} onChange={handleChange} className='border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ' prefix={<FiUser size={21} color='#808080'/>} />
      </label>
      <label className='flex flex-col pb-8'>
        Sitio web:
        <Input type="text" name="website" value={formData.website} onChange={handleChange} className='border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ' prefix={<IoIosLink size={25} color='#808080'/>} />
      </label>
      <label className='flex flex-col pb-8'>
        Número de teléfono:
        <Input type="text" name="phone" value={formData.phone} onChange={handleChange} className='border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ' prefix={<FiPhone size={20} color='#808080'/>} />
      </label>
      <label className='flex flex-col pb-8'>
        Correo electronico:
        <Input type="text" name="email" value={formData.email} onChange={handleChange} className='border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md ' prefix={<AiOutlineMail size={20} color='#808080'/>} />
      </label>
      <button type="submit" className='bg-gradient-to-r from-pink to-orange text-white py-3 rounded-md'>Submit</button>
    </form>
  );
};

export default AddStoreForm;
