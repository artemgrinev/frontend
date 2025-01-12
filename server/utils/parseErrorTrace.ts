export function parseErrorTrace(trace: string) {
  const lines = trace.split("\n");

  const errorInfo = {
    errorType: lines[0].split(":")[0], // Тип ошибки
    message: lines[0].substring(lines[0].indexOf(":") + 1).trim(), // Сообщение об ошибке
    stackFrames: [] as string[], // Массив для хранения стеков вызовов
    codeSnippet: [] as string[], // Массив для хранения строк кода
  };

  let inCodeBlock = false;

  for (const line of lines) {
    if (line.includes("at ")) {
      // Если строка содержит 'at', это часть стека вызовов
      errorInfo.stackFrames.push(line.trim());
    } else if (
      line.includes("const recipe = await prisma.recipe.findUnique(")
    ) {
      inCodeBlock = true; // Начинаем блок кода
    } else if (inCodeBlock) {
      if (line.trim() === "") {
        inCodeBlock = false; // Выходим из блока кода при пустой строке
      } else {
        errorInfo.codeSnippet.push(line.trim()); // Добавляем строку кода
      }
    }
  }

  return errorInfo;
}
