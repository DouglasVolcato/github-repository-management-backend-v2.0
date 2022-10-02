import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('create-user')
  teste() {
    return { message: 'teste' };
  }
}

// {
//     "name": "Douglas Volcato",
//     "email": "douglasvolcato777@gmail.com",
//     "password": "12345"
//   }

// {
//     "id": "e2a4683e-4439-4cab-99bf-5c28087ff990",
//     "name": "Douglas Volcato",
//     "email": "douglasvolcato777@gmail.com",
//     "password": "$2a$10$ZquQaLuLR0onlVedu5KfuOFOtCwAs7PYrCZTw.fpCl5l7xppLtwcm",
//     "photo": "",
//     "repositories": [],
//     "securityKeys": [],
//     "_id": "6338bcd6cdd97eab900a47b1",
//     "__v": 0
//   }
