import {
  Body,
  Param,
  Controller,
  Query,
  UseGuards,
  Post,
  Get,
  Patch,
  Delete,
  Session,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Serialize } from "../iterceptors/serialize.interceptor";
import { UserDto } from "./dto/user.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { User } from "./user.entity";
import { AuthGuard } from "../guards/auth.guard";

@Controller('auth')
@Serialize(UserDto)
export class UsersController {

  constructor(private userService: UsersService, private authService: AuthService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  me(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Post('/register')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/authenticate')
  async authenticate(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.authenticate(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
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
