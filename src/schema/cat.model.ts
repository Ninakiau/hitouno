import { Cat } from "../interfaces/cat.interface";
import { UserModel } from "../schema/user.model";  
import {
    AllowNull,
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
  } from "sequelize-typescript";
  

  
  @Table
  export class CatModel extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;
  
    @AllowNull(false)
    @Column(DataType.FLOAT)
    weight!: number;
  
    @AllowNull(false)
    @Column(DataType.FLOAT)
    height!: number;
  
    @AllowNull(false)
    @Column(DataType.INTEGER)
    age!: number;
  
    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isFat!: boolean;
  
    @ForeignKey(() => UserModel)
    @AllowNull(false)
    @Column(DataType.UUID)
    userId!: string;
  
    @BelongsTo(() => UserModel)
    user!: UserModel;
  }