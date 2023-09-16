import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { LoadTimeInterceptor } from './loadtime.interceptor';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
@UseInterceptors(LoadTimeInterceptor)
export class AppController {

  @ApiExcludeEndpoint(true)
  @Get()
  @Render('pages/index')
  root() {
    return {};
  }
  @ApiExcludeEndpoint(true)
  @Get('index')
  @Render('pages/index')
  index() {
    return {};
  }

  @ApiExcludeEndpoint(true)
  @Get('photos')
  @Render('pages/photos')
  photos() {
    return {};
  }

  @ApiExcludeEndpoint(true)
  @Get('pictures')
  @Render('pages/pictures')
  pictures() {
    return {};
  }

  @ApiExcludeEndpoint(true)
  @Get('wishlist')
  @Render('pages/wishlist')
  wishlist() {
    return {};
  }

  @ApiExcludeEndpoint(true)
  @Get('register')
  @Render('pages/register')
  register() {
    return {};
  }
}
