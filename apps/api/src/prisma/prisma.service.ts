import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, createPrismaAdapter } from '@repo/db';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // @Inject explícito: o Vitest (esbuild) não emite decorator metadata
  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      adapter: createPrismaAdapter(config.getOrThrow<string>('DATABASE_URL')),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
