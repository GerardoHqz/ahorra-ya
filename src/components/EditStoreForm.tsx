import React, { useEffect, useState } from "react";
import { Store } from "../interfaces/Stores";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import { IoIosLink } from "react-icons/io";
import { FiPhone, FiUser } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { getAllDepartmentsService } from "../api/departments";
import { getAllMunicipalitiesService } from "../api/municipalities";
import { Department } from "../interfaces/Departments";
import { Municipality } from "../interfaces/Municipalities";
import { updateStoreService } from "../api/stores";
import { getInfoStoreImage, updateImageService } from "../api/images";

type EditStoreFormProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleUpdateStores: React.Dispatch<React.SetStateAction<boolean>>;
    store: any;
    latitude: number;
    longitude: number;
};

const EditStoreForm = ({
    open,
    setOpen,
    handleUpdateStores,
    store,
    latitude,
    longitude,
}: EditStoreFormProps) => {
    const token = localStorage.getItem("token");

    const [departments, setDepartments] = useState<Department[]>([]);
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    const [image, setImage] = useState<File | null>(null);

    const [form] = Form.useForm();

    const handleGetAllDepartments = async () => {
        try {
            const data = await getAllDepartmentsService(token);
            setDepartments(data);
        } catch (error) {}
    };

    const handleGetAllMunicipalities = async () => {
        try {
            const data = await getAllMunicipalitiesService(token);
            setMunicipalities(data);
        } catch (error) {}
    };

    useEffect(() => {
        handleGetAllDepartments();
        handleGetAllMunicipalities();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (store) {
            form.setFieldsValue({
                name: store.name,
                description: store.description,
                departament: store?.departament.name,
                municipality: store?.municipality.name,
                direction: store.direction,
                ownerName: store.ownerName,
                phone: store.phone,
                email: store.email,
                webSite: store.webSite,
            });
        }
    }, [store, form]);

    const filterOption = (
        input: string,
        option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const handleSubmit = async (values: Store) => {
        values.latitude = latitude;
        values.longitude = longitude;
        values.idStore = store.idStore; // Agregar idStore a los valores
        try {
            await updateStoreService(token, values);
            const imageId = await getInfoStoreImage(token,store.idStore)

            if(image) {
                await updateImageService(token, {file: image, idImage: imageId});
            }
            setOpen(false);
            handleUpdateStores(true)
            form.resetFields();
            setImage(null);
        } catch (error) {}
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
                                    options={departments?.map((department) => ({
                                        value: department?.name,
                                        label: department?.name,
                                    }))}
                                    defaultValue={store?.departament.name} // Valor por defecto
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
                                    defaultValue={store?.municipality.name} // Valor por defecto
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

export default EditStoreForm;
