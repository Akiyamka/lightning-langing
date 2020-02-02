function applyTransformations(transforms, data) {
  const { max } = transforms;

  /* I'm not sure what these expressions do :( */
  let transformedData = data
    .replace(/---(.*(\r)?\n)*---/, '') // clean comments ?
    .replace(/\[.*\]\(.*\)/g, '') // ??
    .replace(/(\r)?\n/,''); // ??
  
  if (max !== undefined) {
    transformedData.lenght > max
      ? transformedData.substr(0, max) + '...'
      : transformedData;
  }
  return transformedData;
}

function createExtractor(fields) {
  return fileInterface => {
    fileInterface.read();

    if (fields === '*') {
      // return all
      return fileInterface.data;
    }

    const fieldsForExtraction = Array.isArray(fields) ? fields : [fields];
    return fieldsForExtraction.reduce((acc, field) => {
      if (typeof field === 'string') {
        acc[field] = fileInterface.data[field];
      }
      else {
        if (
          Object.keys(field).length > 1
        ) {
          throw Error(
            'Error in pages configuration syntax:',
            'For describe field use string or object with one parameter.',
            'Example: { [filedName]: [configObject] }');
        }
        field = Object.keys(field)[0];
        acc[field] = applyTransformations(field, fileInterface.data[field]);
      }
      return acc;
    }, {});
  };
}

module.exports = createExtractor;