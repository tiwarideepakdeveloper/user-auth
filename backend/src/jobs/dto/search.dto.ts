import { IsOptional } from "class-validator";
import { JobsActive, JobsStatus } from "../enums/jobs.enum";

export class SearchDto {
    @IsOptional()
    job_title?: string;

    @IsOptional()
    job_status?: JobsStatus

    @IsOptional()
    job_active?: JobsActive
}