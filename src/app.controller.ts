import { Get, Controller, Render, UseInterceptors } from '@nestjs/common';
import { LoadTimeInterceptor } from './loadtime.interceptor';

@Controller()
@UseInterceptors(LoadTimeInterceptor)
export class AppController {
  @Get()
  @Render('pages/index')
  root() {
    return {};
  }
  @Get('index')
  @Render('pages/index')
  root6() {
    return {};
  }

  @Get('photos')
  @Render('pages/photos')
  root2() {
    return {};
  }

  @Get('pictures')
  @Render('pages/pictures')
  root3() {
    return {};
  }

  @Get('wishlist')
  @Render('pages/wishlist')
  root4() {
    return {};
  }

  @Get('api-example')
  @Render('pages/api-example')
  root5() {
    return { message: 'hello' };
  }
}
