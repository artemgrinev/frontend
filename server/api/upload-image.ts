import { defineEventHandler, readMultipartFormData } from "h3";
import { S3 } from "@aws-sdk/client-s3";

// Инициализация клиента S3
const s3 = new S3({
  endpoint: "https://storage.yandexcloud.net",
  region: "ru-central1",
  credentials: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY!,
    secretAccessKey: process.env.YANDEX_SECRET_KEY!,
  },
});

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event);
    const file = form?.find((part) => part.name === "image");

    if (!file) {
      throw new Error("Изображение не найдено");
    }

    const fileName = `image_${Date.now()}_${file.filename}`;
    const uploadResult = await s3.putObject({
      Bucket: process.env.YANDEX_BACKET_NAME!,
      Key: `images/${fileName}`,
      Body: file.data,
      ContentType: file.type,
    });

    if (!uploadResult) {
      throw new Error("Ошибка при загрузке файла");
    }

    const fileUrl = `https://storage.yandexcloud.net/${process.env.YANDEX_BACKET_NAME}/images/${fileName}`;

    return {
      success: true,
      message: "Изображение успешно загружено",
      fileUrl: fileUrl,
    };
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    return {
      success: false,
      message: error,
    };
  }
});
