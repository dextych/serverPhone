import bcrypt from 'bcrypt';
import { findUserByEmail } from '../../repositories/user/index.js';
import { generateToken } from '../../services/jwtService.js';

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка входных данных
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Введите email и пароль'
      });
    }

    // Поиск пользователя (с паролем)
    const user = await findUserByEmail(email, { raw: true });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Неверный email или пароль(1)'
      });
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Неверный email или пароль(2)'
      });
    }

    // Удаляем пароль
    delete user.password;

    // Генерация токена
    const tokenPayload = {
      userId: user.guid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

    const token = generateToken(tokenPayload);

    // Ответ
    res.json({
      success: true,
      message: 'Вход выполнен',
      data: {
        user,
        token,
        tokenType: 'Bearer'
      }
    });

  } catch (error) {
    console.error('Ошибка входа:', error);
    res.status(500).json({
      success: false,
      error: 'Ошибка при авторизации'
    });
  }
};

export default loginController;