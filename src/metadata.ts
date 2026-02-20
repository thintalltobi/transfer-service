/* eslint-disable */
export default async () => {
  const t = {
    ['./merchant/entities/merchant.entity']:
      await import('./merchant/entities/merchant.entity'),
    ['./merchant-balance/entities/merchant-balance.entity']:
      await import('./merchant-balance/entities/merchant-balance.entity'),
    ['./users/entities/user.entity']:
      await import('./users/entities/user.entity'),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./users/entities/user.entity'),
          {
            User: {
              id: { required: true, type: () => String },
              email: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./auth/dto/sign-in.dto'),
          {
            SignInDto: {
              email: {
                required: true,
                type: () => String,
                maxLength: 255,
                format: 'email',
              },
              password: {
                required: true,
                type: () => String,
                minLength: 8,
                maxLength: 20,
                pattern:
                  '/((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
              },
            },
          },
        ],
        [
          import('./auth/dto/sign-up.dto'),
          {
            SignUpDto: {
              email: {
                required: true,
                type: () => String,
                maxLength: 255,
                format: 'email',
              },
              password: {
                required: true,
                type: () => String,
                minLength: 8,
                maxLength: 20,
                pattern:
                  '/((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
              },
              passwordConfirm: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./merchant-balance/entities/merchant-balance.entity'),
          {
            MerchantBalance: {
              id: { required: true, type: () => String },
              merchantId: { required: true, type: () => String },
              merchant: {
                required: true,
                type: () => t['./merchant/entities/merchant.entity'].Merchant,
              },
              currency: { required: true, type: () => String },
              amountMinor: { required: true, type: () => Number },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./merchant/entities/merchant.entity'),
          {
            Merchant: {
              id: { required: true, type: () => String },
              reference: { required: true, type: () => String },
              name: { required: true, type: () => String },
              email: { required: true, type: () => String },
              balance: {
                required: true,
                type: () =>
                  t['./merchant-balance/entities/merchant-balance.entity']
                    .MerchantBalance,
              },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              deletedAt: { required: false, type: () => Date },
            },
          },
        ],
        [
          import('./merchant-balance/dto/fund-merchant-balance.dto'),
          {
            FundMerchantBalanceDto: {
              amountMinor: { required: true, type: () => Number, minimum: 1 },
            },
          },
        ],
        [
          import('./merchant/dto/create-merchant.dto'),
          {
            CreateMerchantDto: {
              name: { required: true, type: () => String, maxLength: 120 },
              email: {
                required: true,
                type: () => String,
                maxLength: 255,
                format: 'email',
              },
            },
          },
        ],
        [
          import('./merchant/dto/update-merchant.dto'),
          { UpdateMerchantDto: {} },
        ],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./auth/auth.controller'),
          { AuthController: { signUp: {}, signIn: {}, signOut: {} } },
        ],
        [
          import('./merchant-balance/merchant-balance.controller'),
          {
            MerchantBalanceController: {
              getBalance: {
                type: t['./merchant-balance/entities/merchant-balance.entity']
                  .MerchantBalance,
              },
              fundBalance: {
                type: t['./merchant-balance/entities/merchant-balance.entity']
                  .MerchantBalance,
              },
            },
          },
        ],
        [
          import('./merchant/merchant.controller'),
          {
            MerchantController: {
              create: {
                type: t['./merchant/entities/merchant.entity'].Merchant,
              },
              findAll: {
                type: [t['./merchant/entities/merchant.entity'].Merchant],
              },
              findOne: {
                type: t['./merchant/entities/merchant.entity'].Merchant,
              },
              update: {
                type: t['./merchant/entities/merchant.entity'].Merchant,
              },
              remove: {},
            },
          },
        ],
        [
          import('./users/users.controller'),
          {
            UsersController: {
              getMe: { type: t['./users/entities/user.entity'].User },
            },
          },
        ],
      ],
    },
  };
};
