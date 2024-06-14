import React, { useEffect, useState } from "react";
import { Store } from "../interfaces/Stores";
import { Form, Input, Modal, Select } from "antd";
import { IoIosLink } from "react-icons/io";
import { FiPhone, FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { getAllDepartmentsService } from "../api/departments";
import { getAllMunicipalitiesService } from "../api/municipalities";
import { Department } from "../interfaces/Departments";
import { Municipality } from "../interfaces/Municipalities";
import { createStoreService } from "../api/stores";

type AddStoreFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateStores: React.Dispatch<React.SetStateAction<boolean>>;
  latitude: number;
  longitude: number;
};

const AddStoreForm = ({
  open,
  setOpen,
  handleUpdateStores,
  latitude,
  longitude,
}: AddStoreFormProps) => {
  const token = localStorage.getItem("token");

  const [departments, setDepartments] = useState<Department[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [form] = Form.useForm();

  const handleGetAllDepartments = async () => {
    try {
      const data = await getAllDepartmentsService(token);
      setDepartments(data);
    } catch (error) {
    }
  };

  const handleGetAllMunicipalities = async () => {
    try {
      const data = await getAllMunicipalitiesService(token);
      setMunicipalities(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    handleGetAllDepartments();
    handleGetAllMunicipalities();
    // eslint-disable-next-line
  }, []);

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleSubmit = async (values: Store) => {
    values.latitude = latitude;
    values.longitude = longitude;
    try {
      await createStoreService(token);
      setOpen(false);
      handleUpdateStores(true);
      form.resetFields();
    } catch (error) {
    }
  };

  return (
    <Modal
      title="Agregar tienda"
      style={{ top: 80 }}
      width={800}
      open={open}
      closable={false}
      footer={[]}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        className="flex flex-col gap-3"
        layout="vertical"
      >
        <div className="flex justify-between gap-8">
          <div className="w-1/2">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                { required: true, message: "Por favor ingrese un nombre" },
              ]}
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
                label="Departamento"
                name="departament"
                className="w-1/2"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione un departamento",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Seleccione un departamento"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={departments.map((department) => ({
                    value: department.name,
                    label: department.name,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Municipio"
                name="municipality"
                className="w-1/2"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione un municipio",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Seleccione un municipio"
                  optionFilterProp="children"
                  filterOption={filterOption}
                  options={municipalities.map((municipality) => ({
                    value: municipality.name,
                    label: municipality.name,
                  }))}
                />
              </Form.Item>
            </span>
            <Form.Item
              label="Dirección"
              name="direction"
              rules={[
                { required: true, message: "Por favor ingrese una dirección" },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
          </div>
          <div className="w-1/2">
            <Form.Item label="Nombre del contacto" name="ownerName">
              <Input
                type="text"
                name="ownerName"
                className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
                prefix={<FiUser size={20} color="#808080" />}
              />
            </Form.Item>
            <Form.Item label="Número de teléfono" name="phone">
              <Input
                type="text"
                name="phone"
                className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
                prefix={<FiPhone size={20} color="#808080" />}
              />
            </Form.Item>
            <Form.Item label="Correo electrónico" name="email">
              <Input
                type="text"
                name="email"
                className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
                prefix={<AiOutlineMail size={20} color="#808080" />}
              />
            </Form.Item>
            <Form.Item label="Sitio web" name="webSite">
              <Input
                type="text"
                name="webSite"
                className="border border-secondary-text border-opacity-25 p-2 mt-2 rounded-md "
                prefix={<IoIosLink size={20} color="#808080" />}
              />
            </Form.Item>
          </div>
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

export default AddStoreForm;
