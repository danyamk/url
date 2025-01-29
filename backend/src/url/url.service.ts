import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async createShortUrl(original: string): Promise<string> {
    if (!original) {
      throw new Error('Original URL is required');
    }

    const shortId = nanoid(6);

    await this.prisma.url.create({
      data: {
        shortId: `${shortId}`,
        original: original,
      },
    });

    return shortId;
  }

  async getOriginalUrl(shortId: string): Promise<string> {
    const url = await this.prisma.url.findUnique({
      where: { shortId },
    });

    console.log('Оригинальная ссылка:', url?.original);

    if (!url) {
      throw new NotFoundException('Сокращённая ссылка не найдена');
    }

    return url.original;
  }

  async getAllUrls() {
    return await this.prisma.url.findMany(); // Получение всех ссылок
  }
}
