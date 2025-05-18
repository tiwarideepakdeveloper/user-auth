import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { JobsService } from './jobs.service';
import { SearchDto } from './dto/search.dto';

@Controller('jobs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class JobsController {
    constructor(private readonly jobsService: JobsService){}

    @Get()
    async index(@Query() searchDto : SearchDto) {
        
    }
}
