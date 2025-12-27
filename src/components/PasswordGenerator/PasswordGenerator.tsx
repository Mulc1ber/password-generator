import React, { useEffect, useState } from "react";
import type { CharacterSets, PasswordOptions } from "../../types";

export const PasswordGenerator: React.FC = () => {
  // Начальные настройки пароля
  const [options, setOptions] = useState<PasswordOptions>({
    length: 15,
    includeNumbers: true,
    includeLowercase: true,
    includeUppercase: false,
    includeSpecial: false,
  });

  // Сгенерированные пароли
  const [passwords, setPasswords] = useState<string[]>([]);

  // Наборы символов
  const [characterSets, setCharacterSets] = useState<CharacterSets>({
    numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    lowercase: [],
    uppercase: [],
    special: [],
  });

  // Функция для генерации одного пароля
  const generatePassword = (): string => {
    // Собираем все доступные символы на основе выбранных опций
    let availableChars: string[] = [];

    if (options.includeNumbers) {
      availableChars = [...availableChars, ...characterSets.numbers];
    }

    if (options.includeLowercase) {
      availableChars = [...availableChars, ...characterSets.lowercase];
    }

    if (options.includeUppercase) {
      availableChars = [...availableChars, ...characterSets.uppercase];
    }

    if (options.includeSpecial) {
      availableChars = [...availableChars, ...characterSets.special];
    }

    // Проверяем, что выбран хотя бы один набор символов
    if (availableChars.length === 0) {
      return "Выберите хотя бы один набор символов";
    }

    // Генерируем пароль
    let password = "";
    for (let i = 0; i < options.length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }

    return password;
  };

  // Функция для генерации нескольких паролей
  const generatePasswords = () => {
    // Проверяем, что выбран хотя бы один набор символов
    if (
      !options.includeNumbers &&
      !options.includeLowercase &&
      !options.includeUppercase &&
      !options.includeSpecial
    ) {
      setPasswords(["Пожалуйста, выберите хотя бы один набор символов"]);
      return;
    }

    const newPasswords: string[] = [];
    for (let i = 0; i < 6; i++) {
      newPasswords.push(generatePassword());
    }
    setPasswords(newPasswords);
  };

  // Обработчик изменения длины пароля
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value);
    setOptions({ ...options, length: newLength });
  };

  // Обработчик изменения чекбоксов
  const handleCheckboxChange = (option: keyof PasswordOptions) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  // Копирование пароля в буфер обмена
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Пароль скопирован в буфер обмена!");
      })
      .catch((err) => {
        console.error("Ошибка копирования: ", err);
      });
  };

  // Инициализация наборов символов
  useEffect(() => {
    const lowercase = [];
    for (let i = 97; i <= 122; i++) {
      lowercase.push(String.fromCharCode(i));
    }

    const uppercase = [];
    for (let i = 65; i <= 90; i++) {
      uppercase.push(String.fromCharCode(i));
    }

    const special = [];
    for (let i = 33; i <= 47; i++) {
      special.push(String.fromCharCode(i));
    }
    for (let i = 91; i <= 96; i++) {
      special.push(String.fromCharCode(i));
    }

    //eslint-disable-next-line
    setCharacterSets({
      ...characterSets,
      lowercase,
      uppercase,
      special,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <div className="options">
        <div className="length-container">
          <label htmlFor="password-length">
            Длина пароля: <span id="num-length">{options.length}</span>
          </label>
          <input
            type="range"
            id="password-length"
            min="4"
            max="30"
            value={options.length}
            onChange={handleLengthChange}
          />
        </div>

        <div className="toolbar">
          <div>
            <input
              type="checkbox"
              id="number"
              checked={options.includeNumbers}
              onChange={() => handleCheckboxChange("includeNumbers")}
            />
            <label htmlFor="number">Числа</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="lowerSymbol"
              checked={options.includeLowercase}
              onChange={() => handleCheckboxChange("includeLowercase")}
            />
            <label className="form-check-label" htmlFor="lowerSymbol">
              Строчные буквы
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              id="upperSymbol"
              checked={options.includeUppercase}
              onChange={() => handleCheckboxChange("includeUppercase")}
            />
            <label htmlFor="upperSymbol">Прописные буквы</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="specialSymbol"
              checked={options.includeSpecial}
              onChange={() => handleCheckboxChange("includeSpecial")}
            />
            <label htmlFor="specialSymbol">Спец символы</label>
          </div>

          <button onClick={generatePasswords}>Generate Passwords</button>
        </div>
      </div>

      <div id="out" className="password-results">
        {passwords.length > 0 &&
          passwords.map((password, index) => (
            <div key={index}>
              <div className="password">
                <code className="password-text">{password}</code>
                <button
                  className="btn-copy"
                  onClick={() => copyToClipboard(password)}
                  title="Скопировать пароль"
                >
                  📋
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
