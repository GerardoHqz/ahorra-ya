import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import { getAllCategoriesService } from "../api/categories";
import { Category } from "../interfaces/Categories";
import { createOfferService } from "../api/offer";

type AddOfferFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateOffers: React.Dispatch<React.SetStateAction<boolean>>;
  idStore: string;
};

const AddOfferForm = ({ open, setOpen, handleUpdateOffers, idStore }: AddOfferFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllCategoriesService(
      // "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTc1NjM5MTAsImV4cCI6MTcxODg1OTkxMH0.oSJa6e8I6DLqmqAYVmLlu-RKM7921Wzv3DmjSYWMoGbxcpCODQEhWhuwykGGs2yi"
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTgwNjc4NzcsImV4cCI6MTcxOTM2Mzg3N30.dbz7W9OTu1uI6QXKoBXc-eC11LMScugvP6O88rTWjIKVYO7JJsHxjR5af83cwTGj",
    ).then((data) => setCategories(data));
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleSubmit = async (values: any) => {
    values.store = idStore;
    values.active = true;
    values.initDate = values.initDate.format("YYYY-MM-DD");
    values.endDate = values.priceNow.format("YYYY-MM-DD");
    //Si se le pone de un solo "priceNow" en el form se buguea xd
    values.priceNow = values.priceAfter;
    delete values.priceAfter;
    try {
      await createOfferService(
        "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbGVAdGVzdC5jb20iLCJpYXQiOjE3MTgwNjc4NzcsImV4cCI6MTcxOTM2Mzg3N30.dbz7W9OTu1uI6QXKoBXc-eC11LMScugvP6O88rTWjIKVYO7JJsHxjR5af83cwTGj",
        values
      );
      setOpen(false);
      handleUpdateOffers(true);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Agregar oferta"
      style={{ top: 60 }}
      open={open}
      closable={false}
      footer={[]}
    >
      <Form
        onFinish={handleSubmit}
        className="flex flex-col gap-3"
        layout="vertical"
        form={form}
      >
        <div className="flex flex-col justify-between">
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Por favor ingrese un nombre" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="description"
            rules={[
              {
                required: true,
                message: "Por favor ingrese una descripción",
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <span className="flex justify-between gap-4">
            <Form.Item
              label="Precio anterior"
              name="priceBefore"
              className="w-1/2"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Precio actual"
              name="priceAfter"
              className="w-1/2"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el precio actual",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </span>
          <span className="flex justify-between gap-4">
            <Form.Item
              label="Inicio de la oferta"
              name="initDate"
              className="w-1/2"
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Seleccione una fecha"
              />
            </Form.Item>
            <Form.Item
              label="Fin de la oferta"
              name="priceNow"
              className="w-1/2"
              rules={[
                {
                  required: true,
                  message: "Por favor el fin de la oferta",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Seleccione una fecha"
              />
            </Form.Item>
          </span>
          <Form.Item label="Categoría" name="category">
            <Select
              showSearch
              placeholder="Seleccione un municipio"
              optionFilterProp="children"
              filterOption={filterOption}
              options={categories.map((category) => ({
                value: category.idCategory,
                label: category.name,
              }))}
            />
          </Form.Item>
        </div>
        <div className="flex justify-between">
          <button
            type="reset"
            onClick={() => setOpen(false)}
            className="py-2 px-4 rounded-md border-2"
          >
            Regresar
          </button>
          <button
            type="submit"
            className="bg-gradient-to-br from-orange to-pink py-2 px-4 text-white rounded-md"
          >
            Guardar
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddOfferForm;
