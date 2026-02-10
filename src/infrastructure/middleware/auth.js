// Импортируем как обычные функции, а не класс
import { verifyToken } from '../../services/jwtService.js';
import { findUserByGuid } from '../../repositories/user/index.js';

/**
 * Middleware для проверки JWT аутентификации
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Получаем токен из заголовка
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Требуется авторизация. Не предоставлен токен.'
      });
    }
    
    // Убираем 'Bearer ' если есть
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;
    
    // Верифицируем токен (используем как функцию, не как метод класса)
    const decoded = verifyToken(token);
    
    // Находим пользователя в БД
    // ИСПРАВЛЕНИЕ: используем decoded.userId, а не decoded.sub
    const user = await findUserByGuid(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Пользователь не найден'
      });
    }
    
    // Добавляем пользователя в запрос
    req.user = user;
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    
    let statusCode = 401;
    let errorMessage = 'Неавторизован';
    
    // Проверяем сообщение об ошибке
    if (error.message.includes('верификации')) {
      errorMessage = 'Невалидный токен';
    }
    if (error.message.includes('expired')) {
      errorMessage = 'Срок действия токена истек';
    }
    
    return res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
};

export default authMiddleware;