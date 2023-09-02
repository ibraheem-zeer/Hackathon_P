// src/entities/ImageLog.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ImageLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imagePath: string;

    @Column('json')
    apiResult: Record<string, any>;
}
