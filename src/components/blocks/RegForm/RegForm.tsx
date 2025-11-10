import styles from './RegForm.module.css';
import { DetailedHTMLProps, HTMLAttributes} from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Input from '@/components/shared/Input/Input';
import Button from '@/components/shared/Button/Button';

export interface RegFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { }

type RegData = {
    username: string
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

    const onSubmit: SubmitHandler<RegData> = async (data, e) => {
        e?.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/users/create', {
                method: 'POST',
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) { 
                const errorText = await res.text();
                throw new Error(`Request failed: ${res.status} - ${errorText}`);
            }

            console.log(res)
        } catch (error) {
            console.log(error)
        }
        
    };
    
    const password = watch("password");

    console.log(watch("username"))

    return (
        <form method='post' action='' className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            
            <Input type='text'
                placeholder='Введите имя пользователя'
                label='Имя пользователя'
                {...register("username", { required:'Заполните поле' })}
            />
            {errors.username && <span className={styles.err}> {errors.username.message} </span>}
            
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