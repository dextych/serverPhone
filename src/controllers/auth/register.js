import { createUser, findUserByEmail } from '../../repositories/user/index.js';
import { generateToken } from '../../services/jwtService.js';
import { 
  ValidationError,
  ConflictError,
  InternalServerError
} from '../../errors/index.js';

const registerController = async (req, res) => {
  
  const { firstName, lastName, patronymicName, email, phone, address, password } = req.body;
  
  // Минимальная валидация
  if (!firstName || !lastName || !email || !password) {
    throw new ValidationError('Заполните все обязательные поля');
  }
  
  if (password.length < 6) {
    throw new ValidationError('Пароль должен содержать минимум 6 символов');
  }
  
  // Проверка существования пользователя
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ConflictError('Пользователь с таким email уже существует', {
      code: 'ERR_EMAIL_EXISTS',
      data: { email: normalizedEmail }
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

  // Генерация токена
  const tokenPayload = {
    userId: user.guid,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
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
  
};

export default registerController;