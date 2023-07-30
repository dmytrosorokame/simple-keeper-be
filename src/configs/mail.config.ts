import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

interface IMailConfig {
  transport: string;
  defaults: {
    from: string;
  };
  template: {
    adapter: EjsAdapter;
    options: {
      strict: boolean;
    };
  };
}

export const getMailConfig = async (
  configService: ConfigService,
): Promise<IMailConfig> => {
  const transport = configService.get<string>('MAIL_TRANSPORT');
  const mailFromName = configService.get<string>('MAIL_FROM_NAME');
  const mailFromAddress = transport.split(':')[1].split('//')[1];

  return {
    transport,
    defaults: {
      from: `"${mailFromName}" <${mailFromAddress}>`,
    },
    template: {
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
