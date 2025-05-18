import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Raw, Repository } from 'typeorm';
import { TblCategory } from './entities/category.entity';
import { CategorySetup } from './interface/setup.interface';
import { CategorySearch } from './interface/search.interface';
import { CategoryList } from './interface/list.interface';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(TblCategory) private cateRepo : Repository<TblCategory>
    ) {}

    async getRows(cateSearch: CategorySearch) : Promise<CategoryList>{
        let findAndCountParam : any = {
            skip: (cateSearch.page - 1) * cateSearch.limit,
            take: cateSearch.limit,
            order: { category_id: 'DESC' },
        };
    
        if(cateSearch.keyword){
            findAndCountParam['where'] = [
                { 
                    category_identifier : Like(`%${cateSearch.keyword}%`) 
                }
            ];
        }
    
        const [categories, total] = await this.cateRepo.findAndCount(findAndCountParam);
        
        return {
            categories,
            page: cateSearch.page,
            limit: cateSearch.limit,
            recordCount: total
        };
    }

    async setup(cateSetup: CategorySetup){
        let category : TblCategory | null;

        if(cateSetup.category_id) {
            category = await this.cateRepo.findOne({where: { category_id: cateSetup.category_id}});
            if(!category) throw new ConflictException('CATEGORY NOT FOUND');
        } else {
            category = this.cateRepo.create();
        }
        
        const categoryIdentifierCheck = await this.cateRepo.findOne({
            where: { 
                category_identifier: Raw(
                    alias => `LOWER(${alias}) = LOWER(:category_identifier)`, 
                    {category_identifier : cateSetup.category_identifier}
                )
            }
        });

        if(
            categoryIdentifierCheck && 
            categoryIdentifierCheck.category_id != cateSetup.category_id
        ) throw new ConflictException('IDENTIFIER EXISIT');

        Object.assign(category, cateSetup);

        return await this.cateRepo.save(category);
    }
}
