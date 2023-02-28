export function getImage(name)
{
  try {
    const image = require(`./assets/images/${name}`);
    const value = image ? image : null;
    return value;
  }
  catch (exception) {
    console.log(`Image with name "${name}" does not exist.`);
    return null;
  }
}