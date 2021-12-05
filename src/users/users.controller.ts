import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Serialize } from "../iterceptors/serialize.interceptor";
import { UserDto } from "./dto/user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

  constructor(private userService: UsersService, private authService: AuthService) {}

  @Post('/register')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('/authenticate')
  authenticate(@Body() body: CreateUserDto) {
    return this.authService.authenticate(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return  this.userService.findOne(Number(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(Number(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }

}
