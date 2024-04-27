import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

export interface DatabasePort extends PrismaClient, OnModuleInit {}

export const DatabasePort = Symbol('DatabasePort');
