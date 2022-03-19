import React, { useRef } from "react";
import classNames from "classnames";
import { Redirect, useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import useLoading from "../../hooks/useLoading";
import useAuth from "../../hooks/useAuth";

export const LoginPage = () => {
    const toastRef = useRef(null);
    const history = useHistory();
    const { showLoading, hideLoading } = useLoading();
    const { signed, signIn } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: "",
            senha: "",
        },
        onSubmit: handleSubmit,
    });

    async function handleSubmit(values) {
        try {
            const formSchema = Yup.object().shape({
                email: Yup.string().required("O campo 'E-mail' é obrigatório."),
                senha: Yup.string().required("O campo 'Senha' é obrigatório."),
            });

            await formSchema.validate(values, {
                abortEarly: false,
            });

            const { email, senha } = values;

            showLoading();
            const response = await signIn(email, senha);
            hideLoading();

            if (response !== 200) {
                if (response === 400) {
                    toastRef.current.show({
                        severity: "warn",
                        summary: "Falha no login",
                        detail: "Credenciais inválidas!",
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

    const redirectToRegister = () => {
        history.push("/register");
    };

    return signed ? (
        <Redirect to="/" />
    ) : (
        <div className="grid justify-content-center">
            <Toast ref={toastRef} />
            <div className="col-12 md:col-4">
                <Card title="Login">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12">
                                <InputText
                                    placeholder="E-mail"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": formik.errors.email })}
                                />
                                {formik.errors.email && <small className="p-error">{formik.errors.email}</small>}
                            </div>
                        </div>
                        <div className="p-fluid formgrid grid">
                            <div className="field col-12">
                                <Password
                                    placeholder="Senha"
                                    name="senha"
                                    value={formik.values.senha}
                                    onChange={formik.handleChange}
                                    className={classNames({ "p-invalid": formik.errors.senha })}
                                />
                                {formik.errors.senha && (
                                    <small className="p-error">{formik.errors.senha}</small>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <Button type="submit" label="Entrar" />
                        </div>
                        <div className="text-center">
                            <Button
                                type="button"
                                label="Não tenho conta"
                                className="p-button-link"
                                onClick={() => redirectToRegister()}
                            />
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};
