import { Controller, Get, Param, Res } from '@nestjs/common';
import environment from 'src/config/env.config';

@Controller('images')
export class ImagesController {
  constructor() { }

  @Get(':fileName')
  findOne(@Res() res: any, @Param('fileName') fileName: string) {
    res.sendFile(`${fileName}`, { root: `${environment.fileStorageDir}` });
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.imagesService.remove(+id);
  // }
}
