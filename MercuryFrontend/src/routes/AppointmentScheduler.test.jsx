import React from 'react';
import renderer from 'react-test-renderer';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import AppointmentScheduler from './AppointmentScheduler';
import { CustomEvent } from './AppointmentScheduler';

describe('AppointmentScheduler Snapshot testing suite', () => {
//   let windowSpy;

//   beforeEach(() => {
//     windowSpy = jest.spyOn(window, 'window', 'get');
//   });

//   afterEach(() => {
//     windowSpy.mockRestore();
//   });

//   it('Matches DOM Snapshot', () => {
//     const localizer = dayjsLocalizer(dayjs);

//     // windowSpy.mockImplementation(() => ({
//     //   location: {
//     //     origin: 'https://example.com'
//     //   }
//     // }));

//     const domTree = renderer.create(<AppointmentScheduler {...localizer} />).toJSON();
//     expect(domTree).toMatchSnapshot();
//   });

  it('CustomEvent Snapshot', () => {
    const event = {
      allDay: false,
      title: 'Majonez',
      description:
        'Niesamowity majonez umówiony na wizytę we wtorek na Kasprzaka 10/22 w Warszawie. Montaż',
      start: new Date(2024, 0, 17, 10, 30),
      end: new Date(2024, 0, 17, 12, 30)
    };

    const component = renderer.create(<CustomEvent {...event} />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
