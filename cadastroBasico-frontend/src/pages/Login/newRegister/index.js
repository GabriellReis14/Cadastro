import React, { useRef } from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import useLoading from "../../../hooks/useLoading";
import { axiosPost } from "../../../services/http";

export const NewRegister = () => {
    const toastRef = useRef(null);
    const history = useHistory();
    const { showLoading, hideLoading } = useLoading();

    const formik = useFormik({
        initialValues: {
            id_usuario: null,
            nome_usuario: "",
            email_usuario: "",
            senha_usuario: "",
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        try {
            const formSchema = Yup.object().shape({
                nome_usuario: Yup.string().required("O campo Nome é obrigatório"),
                email_usuario: Yup.string().required("O campo 'E-mail' é obrigatório."),
                senha_usuario: Yup.string().required("O campo 'Senha' é obrigatório."),
            });

            await formSchema.validate(values, {
                abortEarly: false,
            });

            if (!values.id_usuario) {
                showLoading();
                const response = await axiosPost('/usuarios/cadastrar', values);
                hideLoading();
                if (response.status === 200) {
                    toastRef.current.show({
                        severity: "success",
                        summary: "Sucesso! :D",
                        detail: response.data,
                        life: 3000,
                    });

                    setTimeout(() => {
                        redirectToLogin();                       
                    }, 3000)
                } else if (response.status !== 200) {
                    if (response.status === 400) {
                        toastRef.current.show({
                            severity: "warn",
                            summary: "Falha ao cadastrar",
                            detail: "Confira os dados",
                            life: 3000,
                        });
                    } else {
                        toastRef.current.show({
                            severity: "error",
                            summary: "Erro :(",
                            detail: "A sua requisição não pode ser concluída.",
                            life: 3000,
                        });
                    }
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


    const redirectToLogin = () => {
        history.push("/login");
    };

    return (
        <div className="grid justify-content-center">
            <Toast ref={toastRef} />
            <div className="col-12 md:col-4">
                <Card title="Login">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12">
                                <InputText
                                    placeholder="Nome"
                                    name="nome_usuario"
                                    value={formik.values.nome_usuario}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": formik.errors.nome_usuario })}
                                />
                                {formik.errors.nome_usuario && <small className="p-error">{formik.errors.nome_usuario}</small>}
                            </div>
                        </div>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12">
                                <InputText
                                    placeholder="E-mail"
                                    name="email_usuario"
                                    value={formik.values.email_usuario}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": formik.errors.email_usuario })}
                                />
                                {formik.errors.email_usuario && <small className="p-error">{formik.errors.email_usuario}</small>}
                            </div>
                        </div>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12">
                                <Password
                                    placeholder="Senha"
                                    name="senha_usuario"
                                    value={formik.values.senha_usuario}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": formik.errors.senha_usuario })}
                                />
                                {formik.errors.senha_usuario && (
                                    <small className="p-error">{formik.errors.senha_usuario}</small>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <Button type="submit" label="Cadastrar" />
                        </div>
                        <div className="text-center">
                            <Button
                                type="button"
                                label="Voltar"
                                className="p-button-link"
                                onClick={() => redirectToLogin()}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};
