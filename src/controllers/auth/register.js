import { createUser, findUserByEmail } from '../../repositories/user/index.js';
import { generateToken } from '../../services/jwtService.js';

const registerController = async (req, res) => {
  try {
    const { firstName, lastName, patronymicName, email, phone, address, password } = req.body;

    // Проверка обязательных полей
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Заполните все обязательные поля'
      });
    }

    // Проверка существования пользователя
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Пользователь с таким email уже существует'
      });
    }

    // Создание пользователя
    const user = await createUser({
      firstName,
      lastName,
      patronymicName: patronymicName || null,
      email,
      phone: phone || null,
      address: address || null,
      password
    });

    const userJson = user.toJSON(); // Без пароля

    // Генерация токена
    const tokenPayload = {
      userId: userJson.guid,
      email: userJson.email,
      firstName: userJson.firstName,
      lastName: userJson.lastName
    };

    const token = generateToken(tokenPayload);

    // Ответ
    res.status(201).json({
      success: true,
      message: 'Пользователь создан',
      data: {
        user: userJson,
        token,
        tokenType: 'Bearer'
      }
    });

  } catch (error) {
    console.error('Ошибка регистрации:', error);
    
    // Ошибки валидации от Sequelize
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      error: 'Ошибка при регистрации'
    });
  }
};

export default registerController;