import { DateUtils } from "src/common/utils/date.utils";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class TblSignInAttempt {
    @PrimaryColumn()
    sginat_ip: string;

    @Column()
    sginat_attempt_count: number;

    @Column({ default: DateUtils.toMysqlDateTime() })
    sginat_updated_at: string;
}