import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { SearchDto } from './dto/search.dto';
import { ApiResponse } from 'src/common/response/response.dto';
import { SetupDto } from './dto/setup.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('categories:read')
export class CategoriesController {
    constructor(private readonly cateServices: CategoriesService){}

    @Get()
    async index(@Query() searchDto: SearchDto) {
        const categories = await this.cateServices.getRows(searchDto);
        return new ApiResponse(categories);
    }
    
    @Post('setup')
    @Permissions('categories:write')
    async setup(@Body() setupDto: SetupDto) {
        const category = await this.cateServices.setup(setupDto);
        return new ApiResponse(category);
    }
}
