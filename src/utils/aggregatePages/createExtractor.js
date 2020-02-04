function applyTransformations(transforms, data) {
  const { max } = transforms;

  /* I'm not sure what these expressions do :( */
  let transformedData = data
    .replace(/---(.*(\r)?\n)*---/, '') // clean comments ?
    .replace(/\[.*\]\(.*\)/g, '') // ??
    .replace(/(\r)?\n/,''); // ??
  
  if (max !== undefined) {
    transformedData = transformedData.length > max
      ? transformedData.substr(0, max) + '...'
      : transformedData;
  }

  return transformedData;
}

function createExtractor(fields) {
  const fieldsForExtraction = Array.isArray(fields) ? fields : [fields];

  return fileInterface => {
    fileInterface.read();

    if (fields === '*') {
      // return all
      return fileInterface.data;
    }

    return fieldsForExtraction.reduce((acc, field) => {
      // console.log(JSON.stringify(acc))

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
        const fieldName = Object.keys(field)[0];
        acc[fieldName] = applyTransformations(field[fieldName], fileInterface.data[fieldName]);
      }
      return acc;
    }, {});
  };
}

module.exports = createExtractor;