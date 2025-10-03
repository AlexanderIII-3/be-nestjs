// logger.middleware.ts (hoặc đặt tên check-role.middleware.ts)
import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckHrMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as any; // đã được attach từ JwtAuthGuard

    if (!user) {
      throw new ForbiddenException('Bạn chưa đăng nhập');
    }

    if (user.role === 'HR') {
      const companyId = user.companyId;
      const cvCompanyId = req.params.companyId;

      if (companyId.toString() !== cvCompanyId.toString()) {
        throw new ForbiddenException(
          'HR chỉ được xem CV trong công ty của mình',
        );
      }
    }

    next(); // pass qua controller nếu ok
  }
}
