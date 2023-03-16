// +-------------+--------------+------+-----+---------+-------+
// | Field       | Type         | Null | Key | Default | Extra |
// +-------------+--------------+------+-----+---------+-------+
// | Id          | char(36)     | NO   | PRI | NULL    |       |
// | Nombre      | varchar(100) | NO   |     | NULL    |       |
// | Costo       | decimal(6,2) | NO   |     | NULL    |       |
// | Descripcion | text         | NO   |     | NULL    |       |
// | Active      | tinyint(1)   | YES  |     | 1       |       |
// | base64Image | text         | YES  |     | NULL    |       |

import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

// +-------------+--------------+------+-----+---------+-------+
@Entity({
  name: "Producto"
})
export class Product {
  @PrimaryColumn({ name: "Id" })
  id: string;

  @Column({ name: "Nombre" })
  name: string;

  @Column({ name: "Costo" })
  cost: number;

  @Column({ name: "Descripcion" })
  description: string;

  @Column({ name: "Active", nullable: true })
  active: boolean;

  @Column({ name: "base64Image", nullable: true })
  base64Image: string;

  @BeforeInsert()
  beforeInsert() {
    this.active = true;
  }
}
