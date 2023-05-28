import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { request } from "express";
import { Role } from "../../users/enums/Role";
import { UsersService } from "../../users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user= await this.usersService.findOne(request.user['sub']);
      console.log(user);
      console.log(roles);
      return roles.some(role => user.roles.includes(role));
    }
}