import { Controller, Post, Body, Get, Param, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}


  @Get()
  async getAllUrls() {
    return await this.urlService.getAllUrls();
  }

  @Post()
  async createShortUrl(@Body('original') original: string) {
    if (!original) {
      throw new Error('Original URL is required');
    }

    const shortId = await this.urlService.createShortUrl(original);
    return { shortUrl: `${shortId}` };
  }

  @Get(':shortId')
  async getOriginalUrl(
    @Param('shortId') shortId: string,
  ): Promise<{ original: string }> {
    const original = await this.urlService.getOriginalUrl(shortId);

    if (!original) {
      throw new NotFoundException('Ссылка не найдена');
    }

    return { original };
  }
}
