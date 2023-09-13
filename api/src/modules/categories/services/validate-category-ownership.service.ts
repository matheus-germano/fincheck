import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async validate(userId: string, categoryId: string) {
    const isUserCategoryOwner = await this.categoriesRepository.findFirst({
      where: { userId, id: categoryId },
    });

    if (!isUserCategoryOwner) {
      throw new NotFoundException(
        'There is no category found with provided id',
      );
    }
  }
}
