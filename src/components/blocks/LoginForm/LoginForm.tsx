import styles from './LoginForm.module.css';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Input from '@/components/shared/Input/Input';
import Button from '@/components/shared/Button/Button';
import FormWrapper from '../FormWrapper/FormWrapper';

export interface LoginFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

type Login = {
    name: string
    password: string
}

export default function LoginForm({ ...props }: LoginFormProps) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Login>();

    const onSubmit: SubmitHandler<Login> = (data) => console.log(data)

    console.log(watch("name"))

    return (
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                
                <Input type='text'
                    placeholder='Введите имя пользователя'
                    label='Имя пользователя'
                    {...register("name", { required: true })}
                />
                {errors.name && <span className={styles.err}> Заполните поле </span>}
                
                <Input type='password'
                    haveButton
                    placeholder='Введите пароль'
                    label='Пароль'
                    {...register("password", { required: true })}
                />
                {errors.password && <span className={styles.err}> Заполните поле </span>}
                
                <Button background='grad' type='submit'> Войти </Button>

            </form>
    );
}