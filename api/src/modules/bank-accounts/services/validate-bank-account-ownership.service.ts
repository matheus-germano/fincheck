import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async validate(userId: string, bankAccountId: string) {
    const isUserBankAccountOwner = await this.bankAccountsRepository.findFirst({
      where: { userId, id: bankAccountId },
    });

    if (!isUserBankAccountOwner) {
      throw new NotFoundException(
        'There is no bank account found with provided id',
      );
    }
  }
}
