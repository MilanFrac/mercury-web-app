import parseDescription from '../handlers/longDescriptionHandler';

export const sampleEvents = [
  {
    allDay: false,
    title: 'Instal-230',
    description: parseDescription(
      'Jan;Brzoza;03-432 Gdańsk, ul. Akacjowa 21A/2;+48508273556;Montaż;2023-07-29;Opis przykładowy;'
    ),
    realizationDate: new Date(2024, 6, 27, 10, 30),
    end: new Date(2024, 6, 27, 11, 30)
  },
  {
    allDay: false,
    title: 'Combo-231',
    description: parseDescription(
      'Jan;Brzoza;03-432 Gdańsk, ul. Akacjowa 21A/2;+48508273556;Montaż;2023-07-29;Opis przykładowy;'
    ),
    realizationDate: new Date(2024, 6, 28, 12, 30),
    end: new Date(2024, 6, 28, 13, 30)
  }
];
