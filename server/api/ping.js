export default defineEventHandler((event) => {
  return {
    message: "Пинг успешен! Сервер работает.",
    timestamp: new Date().toISOString(),
  };
});
