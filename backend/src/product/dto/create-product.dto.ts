// +-------------+--------------+------+-----+---------+-------+
// | Field       | Type         | Null | Key | Default | Extra |
// +-------------+--------------+------+-----+---------+-------+
// | Id          | char(36)     | NO   | PRI | NULL    |       |
// | Nombre      | varchar(100) | NO   |     | NULL    |       |
// | Costo       | decimal(6,2) | NO   |     | NULL    |       |
// | Descripcion | text         | NO   |     | NULL    |       |
// | Active      | tinyint(1)   | YES  |     | 1       |       |
// | base64Image | text         | YES  |     | NULL    |       |
// +-------------+--------------+------+-----+---------+-------+
import { IsOptional, IsString } from "class-validator";

/// +-----------------+--------------+------+-----+---------+-------+
export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly cost: number;

  @IsString()
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly base64Image?: string;
}
