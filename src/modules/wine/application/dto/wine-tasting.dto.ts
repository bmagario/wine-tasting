export class CreateWineTastingDto {
  readonly wineId: number;
  readonly date: Date;
  readonly rating: number;
  readonly notes: string;
}

export class UpdateWineTastingDto {
  readonly date?: Date;
  readonly rating?: number;
  readonly notes?: string;
}
