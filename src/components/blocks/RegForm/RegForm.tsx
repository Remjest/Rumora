import styles from './RegForm.module.css';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Input from '@/components/shared/Input/Input';
import Button from '@/components/shared/Button/Button';
import FormWrapper from '../FormWrapper/FormWrapper';

export interface RegFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

type RegData = {
    name: string
    email: string
    password: string
    confPassword: string
}

export default function RegForm({ ...props }: RegFormProps) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegData>();

    const onSubmit: SubmitHandler<RegData> = (data) => console.log(data);
    
    const password = watch("password");

    console.log(watch("name"))

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            
            <Input type='text'
                placeholder='Введите имя пользователя'
                label='Имя пользователя'
                {...register("name", { required:'Заполните поле' })}
            />
            {errors.name && <span className={styles.err}> {errors.name.message} </span>}

            <Input type='email'
                placeholder='Введите email'
                label='Почта'
                {...register("email", { required: 'Заполните поле' })}
            />
            {errors.email && <span className={styles.err}> {errors.email.message} </span>}
            
            <Input type='password'
                haveButton
                placeholder='Введите пароль'
                label='Пароль'
                {...register("password", {
                    required: 'Заполните поле',
                    minLength: {value: 8, message: 'Длина пароля не менее 8 символов'}
                    })}
            />
            {errors.password && <span className={styles.err}> {errors.password.message} </span>}

            <Input type='password'
                placeholder='Подтвердите пароль'
                label='Подтверждение пароля'
                {...register("confPassword", {
                    required: true,
                    validate: {
                        mathes: (value: string) => value === password || 'Пароли не совпадают'
                    }
                })}
                
            />
            {errors.confPassword && <span className={styles.err}> {errors.confPassword.message} </span>}

            <Button background='grad' type='submit'> Зарегистрироваться </Button>

        </form>
    );
}