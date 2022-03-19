import React, { useState, useImperativeHandle, forwardRef, useRef } from "react"
import { InputText } from "primereact/inputtext"
import { Divider } from "primereact/divider"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { useFormik } from "formik";
import { Toast } from "primereact/toast"
import classNames from "classnames"
import * as Yup from 'yup'
import { axiosPost, axiosPut } from "../../../services/http";

const DialogPessoas = ({ onSave }, ref) => {
    const toastRef = useRef(null);
    const [visible, setVisible] = useState(false)

    const { setFieldValue, ...formik } = useFormik({
        initialValues: {
            id_pessoa: null,
            nome_pessoa: "",
            tel_pessoa: "",
            endereco_pessoa: "",
            bairro_pessoa: "",
            cidade_pessoa: "",
            uf_pessoa: ""

        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        try {
            const formSchema = Yup.object().shape({
                nome_pessoa: Yup.string().required("Nome é obrigatório.").nullable(),
                tel_pessoa: Yup.string().required("Telefone é obrigatório.").nullable()
            });


            await formSchema.validate(values, {
                abortEarly: false,
            });

            if (!values.id_pessoa) {
                const response = await axiosPost("/pessoa/cadastrar", values);
                if (response.status === 200) {
                    toastRef.current.show({
                        severity: "success",
                        summary: "Sucesso! :D",
                        detail: response.data,
                        life: 3000,
                    })

                    setTimeout(() => {
                        closeDialog()
                        onSave()
                    }, 3000)

                } else if (response.status !== 200) {
                    if (response.status === 400) {
                        toastRef.current.show({
                            severity: "warn",
                            summary: "Falha ao cadastrar",
                            detail: "Confira os dados!",
                            life: 3000,
                        });
                    } else {
                        toastRef.current.show({
                            severity: "error",
                            summary: "Erro :(",
                            detail: "Ocorreu um erro ao tentar cadastrar.",
                            life: 3000,
                        });
                    }
                }
            } else {
                const response = await axiosPut("/pessoa/atualizar", values);

                if (response.status === 200) {
                    toastRef.current.show({
                        severity: "success",
                        summary: "Sucesso! :D",
                        detail: response.data,
                        life: 2000,
                    });

                    setTimeout(() => {
                        closeDialog();
                        onSave()
                    }, 2000);
                }
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                let errorMessages = {};

                error.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                formik.setErrors(errorMessages);
            }
        }
    }

    useImperativeHandle(ref, () => {
        return {
            openDialog
        }
    })


    const openDialog = (value) => {
        if (value) {
            formik.setValues(value)
        }
        setVisible(true);
    }

    const closeDialog = () => {
        formik.resetForm()
        setVisible(false)
    }

    const footer = (
        <div>
            <Button type="button" label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={closeDialog} />
            <Button type="submit" label="Salvar" icon="pi pi-save" onClick={formik.handleSubmit} />
        </div>
    );

    return (
        <Dialog
            header={formik.values.id_pessoa ? "Editar pessoa" : "Novo pessoa"}
            visible={visible}
            footer={footer}
            style={{ width: "70vw" }}
            onHide={() => closeDialog()}
        >
            <Divider />
            <Toast ref={toastRef} position="bottom-right" />
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-6">
                        <InputText
                            id="nome"
                            placeholder="Nome"
                            value={formik.values.nome_pessoa}
                            name="nome_pessoa"
                            onChange={formik.handleChange}
                            className={classNames({ "p-invalid": formik.errors.nome_pessoa })}
                        />
                        {formik.errors.nome_pessoa && <small className="p-error">{formik.errors.nome_pessoa}</small>}
                    </div>  
                    <div className="field col-12 md:col-6">
                        <InputText
                            value={formik.values.endereco_pessoa}
                            onChange={formik.handleChange}
                            name="endereco_pessoa"
                            placeholder="Endereço"
                        />
                    </div>           
                </div>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12 md:col-3">
                        <InputText
                            value={formik.values.bairro_pessoa}
                            onChange={formik.handleChange}
                            name="bairro_pessoa"
                            placeholder="Bairro"
                        />
                    </div>
                    <div className="field col-12 md:col-4">
                        <InputText
                            value={formik.values.cidade_pessoa}
                            onChange={formik.handleChange}
                            name="cidade_pessoa"
                            placeholder="Cidade"
                        />
                    </div>
                    <div className="field col-12 md:col-1">
                        <InputText
                            value={formik.values.uf_pessoa}
                            onChange={formik.handleChange}
                            name="uf_pessoa"
                            placeholder="UF"
                        />
                    </div>
                    <div className="field col-12 md:col-2">
                        <InputText
                            value={formik.values.tel_pessoa}
                            onChange={formik.handleChange}
                            name="tel_pessoa"
                            placeholder="Telefone/Celular"
                            className={classNames({ "p-invalid": formik.errors.tel_pessoa })}
                        />
                        {formik.errors.tel_pessoa && <small className="p-error">{formik.errors.tel_pessoa}</small>}
                    </div>
                </div>
            </form>
        </Dialog >
    );
};

export default forwardRef(DialogPessoas)