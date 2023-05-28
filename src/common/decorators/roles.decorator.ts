import { SetMetadata } from "@nestjs/common"
import { Role } from "../../users/enums/Role";

export const Roles = (...roles: Role[]) => SetMetadata('roles',Roles);