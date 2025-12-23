import styles from './SongAddPage.module.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import NavButton from '@/components/shared/NavButton/NavButton';
import Button from '@/components/shared/Button/Button';

import { IUserData, SongData } from '@/interfaces';

export default function SongAddPage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<IUserData | undefined>(undefined);
    const [songData, setSongData] = useState<SongData | undefined>(undefined);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [year, setYear] = useState('');
    const [lyrics, setLyrics] = useState('');

    const coverInputRef = useRef<HTMLInputElement | null>(null);
    const audioInputRef = useRef<HTMLInputElement | null>(null);

    // Для загрузки файлов
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken') ?? undefined;
        const username = localStorage.getItem('userName') ?? undefined;
        const role = localStorage.getItem('userRole') as 'Admin' | 'User' | 'Moder' | undefined ?? undefined;
        setUserData({ username, role, token });
        if (role !== "Admin") navigate('/');
    }, []);

    // const handleSave = async () => {
    //     if (!userData?.token) return;

    //     try {
    //     //   let coverUrl = songData?.songCover; // если не меняли — оставляем старую
    //     //   let audioUrl = songData?.audioFile; // если не меняли — оставляем старую

    //     // Загружаем новую обложку, если выбрана

    //         const res = await fetch(`${process.env.REACT_APP_SERVER}/api/admin/songs`, {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${userData.token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 songName: title,
    //                 authorName: artist,
    //                 textSong: lyrics,
    //                 yearOfCreation: year,
    //             })
    //         });
                
    //         if (res.ok) {
    //             alert('Трек успешно добавлён!');
    //         } else {
    //             throw new Error(`Ошибка добавления трека!`);
    //         }

    //         console.log(res);
            
    //         const songData = await res.json();

    //         console.log(songData);

    //         const { songId } = songData;
            
            
    //         if (coverFile) {
    //             const formData = new FormData();
    //             formData.append('songCover', coverFile);
    //             const res = await fetch(`${process.env.REACT_APP_SERVER}/api/admin/songs/songs/${songId}/cover`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': `Bearer ${userData.token}`
    //                 },
    //                 body: formData
    //             });
    //             if (!res.ok) throw new Error('Ошибка загрузки обложки:')
    //         }

    //         // Загружаем новую аудиозапись, если выбрана
    //         if (audioFile) {
    //             const formData = new FormData();
    //             formData.append('audioFile', audioFile);
    //             const res = await fetch(`${process.env.REACT_APP_SERVER}/api/admin/songs/songs/${songId}/audio`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Authorization': `Bearer ${userData.token}`
    //                 },
    //                 body: formData
    //             });
    //             if (!res.ok) throw new Error('Ошибка загрузки аудиофайла:')
    //         }

        
    //     } catch (err) {
    //         console.error('Ошибка сохранения:', err);
    //         alert('Произошла ошибка');
    //     }
    // };

    const handleSave = async () => {
    if (!userData?.token) return;

    try {
        const formData = new FormData();

        // Текстовые поля
        formData.append('songName', title);
        formData.append('authorName', artist);
        formData.append('yearOfCreation', year.toString());

        if (lyrics) {
            formData.append('textSong', lyrics);
        }

        // Файлы (если выбраны)
        if (coverFile) {
            formData.append('songCover', coverFile);
        }

        if (audioFile) {
            formData.append('audioFile', audioFile);
        }

        const res = await fetch(
            `${process.env.REACT_APP_SERVER}/api/admin/songs`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userData.token}`
                    // ❗ Content-Type НЕ УКАЗЫВАЕМ
                },
                body: formData
            }
        );

        if (!res.ok) {
            throw new Error('Ошибка добавления трека');
        }

        const songData = await res.json();

        console.log('Трек создан:', songData);
        alert('Трек успешно добавлён!');

    } catch (err) {
        console.error('Ошибка сохранения:', err);
        alert('Произошла ошибка');
    }
};


    return (
        <main className={styles.songEditPage}>
            <NavButton
                className={styles.nav}
                purpose="back"
                onClick={() => navigate(-1)}
            />

            <div className={styles.editForm}>
                <h3 className={styles.formTitle}>Редактирование данных о треке</h3>

                <div className={styles.formRow}>
                    <label>Название трека</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formRow}>
                    <label>Исполнитель</label>
                    <input
                        type="text"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formRow}>
                    <label>Год выпуска</label>
                    <input
                        type="text"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.formRow}>
                    <label>Текст песни</label>
                    <textarea
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                        className={styles.textarea}
                    />
                </div>

                <div className={styles.formRow}>


                <label>Обложка</label>

                <div className={styles.fileInputWrapper}>
                    <span className={styles.fileName}>
                        {coverFile?.name || songData?.songCover || 'Файл не выбран'}
                    </span>

                    <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                    />

                    <button
                        type="button"
                        className={styles.uploadButton}
                        onClick={() => coverInputRef.current?.click()}
                    >
                        {coverFile || songData?.songCover
                            ? 'Загрузить заново'
                            : 'Загрузить файл'}
                    </button>
                </div>

                </div>
                <div className={styles.formRow}>
                    <label>Аудиозапись</label>

                    <div className={styles.fileInputWrapper}>
                        <span className={styles.fileName}>
                            {audioFile?.name || songData?.audioFile || 'Файл не выбран'}
                        </span>

                        <input
                            ref={audioInputRef}
                            type="file"
                            accept="audio/*"
                            hidden
                            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                        />

                        <button
                            type="button"
                            className={styles.uploadButton}
                            onClick={() => audioInputRef.current?.click()}
                        >
                            {audioFile || songData?.audioFile
                                ? 'Загрузить заново'
                                : 'Загрузить файл'}
                        </button>
                    </div>
                </div>


                <Button
                    background='primary'
                    onClick={handleSave}
                    className={styles.saveButton}
                >
                Сохранить изменения
                </Button>
            </div>
        </main>
    );
}