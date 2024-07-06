import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from "antd";
import { getAllCategoriesService } from "../api/categories";
import { Category } from "../interfaces/Categories";
import { createOfferService, updateOffer } from "../api/offer";
import { createImageService, getInfoOfferImage, updateImageService } from "../api/images";
import { BsUpload } from "react-icons/bs";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { offers } from "../mock_data/offers";

dayjs.extend(customParseFormat);

type EditOfferFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  idStore: any;
  handleUpdateOffers: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateImage: React.Dispatch<React.SetStateAction<boolean>>;
  offer: any;
};

const EditOfferForm = ({
  open,
  setOpen,
  idStore,
  handleUpdateOffers,
  handleUpdateImage,
  offer
}: EditOfferFormProps) => {
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [form] = Form.useForm();


  const handleGetAllCategories = async () => {
    try {
      const data = await getAllCategoriesService(token);
      setCategories(data);
    } catch (error) { }
  };

  useEffect(() => {
    handleGetAllCategories();
    // eslint-disable-next-line
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleSubmit = async (values: any) => {
    values.idOffer = offer?.id;
    values.active = true;
    values.initDate = values.initDate.format("YYYY-MM-DD");
    values.endDate = values.endDate.format("YYYY-MM-DD");
    values.priceNow = values.priceAfter;
    values.category = values.category; // Usar el valor de la categoría seleccionado en el formulario
    values.store = idStore;
    delete values.priceAfter;

    try {
      await updateOffer(token, values);

      const imageId = await getInfoOfferImage(token, offer.id)

      if (image) {
        await updateImageService(token, { file: image, idImage: imageId });
        handleUpdateImage(true);
      }

      setOpen(false);
      handleUpdateOffers(true);
      form.resetFields();
      setImage(null);
    } catch (error) { }
  };

  useEffect(() => {
    if (offer) {
      form.setFieldsValue({
        name: offer.name,
        description: offer.description,
        priceBefore: offer.priceBefore,
        priceAfter: offer.priceNow,
        initDate: dayjs(offer.initDate, "YYYY-MM-DD"),
        endDate: dayjs(offer.endDate, "YYYY-MM-DD"),
        category: offer.category.idCategory, // Establecer el valor inicial del campo de categoría
      });
    }
  }, [offer, form]);

  return (
    <Modal
      title="Editar oferta"
      style={{ top: 40 }}
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
              name="endDate"
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
              placeholder="Seleccione una categoría"
              optionFilterProp="children"
              filterOption={filterOption}
              defaultValue={offer?.category?.idCategory}
              options={categories.map((category) => ({
                value: category.idCategory,
                label: category.name,
              }))}
            />
          </Form.Item>
          <Upload
            beforeUpload={(file) => {
              setImage(file);
              return false;
            }}
            listType="picture"
            maxCount={1}
            accept="image/*"
          >
            <Button icon={<BsUpload />}>Agregar imagen</Button>
          </Upload>
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
            Actualizar
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditOfferForm;
