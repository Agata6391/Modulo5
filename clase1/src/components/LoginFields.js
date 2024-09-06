import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./LoginFields.css"
import Icon from "./Icon";


const LoginFields = ()=>{
    const initialValues = {
        name: "",
        email: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
    });

    const onSubmit = (values)=>{
        console.log("Submitted data:", values);
    };

    return(
        <div className="main-container">
            <div className="icon">
                <Icon/>
            </div>
            <h2>Member Login</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className="field-container">
                        <label htmlFor="name">Nombre</label>
                        <Field type="text" id="name" name="name"/>
                        <ErrorMessage name="name" component="div" className="error-message"/>
                    </div>
                    <div className="field-container">
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email"/>
                        <ErrorMessage name="email" component="div" className="error-message"/>
                    </div>

                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
};

export default LoginFields;