import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

const password = '1234'

function App() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLinkActive, setIsLinkActive] = useState(true);
    const [limitedRedirect, setLimitedRedirect] = useState(2);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLinkActive(false);
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
            setIsLinkActive(true);
        }
    }, [shortUrl]);

    const handleShorten = async () => {
        try {
            const response = await axios.post('http://localhost:3000/url', { original: originalUrl });
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            console.error('Error creating short URL:', error);
        }
    };

    const handleRedirect = async (shortLink: string) => {
        try {
            console.log(isLinkActive);
            const enteredPassword = prompt("Введите пароль");
            if (enteredPassword !== password) {
                alert('Неверный пароль');
                return;
            }
            if (isLinkActive && limitedRedirect !== 0) {
                // @ts-ignore
                const age = prompt("Введите свой возврат", 0);

                if (age && Number(age) >= 18) {
                    const response = await axios.get(`http://localhost:3000/url/${shortLink}`);
                    const original = response.data.original;
                    setLimitedRedirect(limitedRedirect - 1)
                    if (original) {
                        window.location.href = original;
                    }
                } else {
                    alert("Вы должны быть старше 17 лет");
                }
            } else {
                alert('Ссылка больше не актива')
            }



        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <input
                    type="text"
                    placeholder="Вставьте ссылку для сокращения"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                />
                <button onClick={handleShorten}>Нажми на меня</button>

                {shortUrl && (
                    <div>
                        <p>Короткая ссылка: <a href="#" onClick={() => handleRedirect(shortUrl)}>{shortUrl}</a></p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
