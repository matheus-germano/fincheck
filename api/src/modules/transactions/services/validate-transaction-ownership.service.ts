import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async validate(userId: string, transactionId: string) {
    const isUserTransactionOwner = await this.transactionsRepository.findFirst({
      where: { userId, id: transactionId },
    });

    if (!isUserTransactionOwner) {
      throw new NotFoundException(
        'There is no transaction found with provided id',
      );
    }
  }
}
