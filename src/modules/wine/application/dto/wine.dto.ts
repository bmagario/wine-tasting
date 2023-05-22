export class CreateWineDto {
  readonly name?: string;
  readonly description?: string;
  readonly year?: number;
  readonly type?: string;
  readonly vintage?: number;
  readonly price?: number;
}

export class UpdateWineDto {
  readonly name?: string;
  readonly description?: string;
  readonly year?: number;
  readonly type?: string;
  readonly vintage?: number;
  readonly price?: number;
}
