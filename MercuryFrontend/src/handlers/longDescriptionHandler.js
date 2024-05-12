export default function parseDescription(description) {
  const labels = [
    'First name',
    'Last name',
    'Address',
    'Phone number',
    'Service type',
    'Product',
    'Realization date',
    'Description'
  ];
  const args = description.split(';');
  let result = '';
  for (let i = 0; i < labels.length; i++) {
    result = result
      .concat('\n' + labels[i])
      .concat(': ')
      .concat(args[i]);
  }

  return result;
}
