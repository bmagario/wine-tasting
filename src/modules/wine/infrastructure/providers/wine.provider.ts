import Wine from '../../domain/entities/wine.entity';

export const wineProviders = [
  {
    provide: 'WINE_REPOSITORY',
    useValue: Wine,
  },
];
