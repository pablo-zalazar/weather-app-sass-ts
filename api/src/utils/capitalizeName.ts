export const capitalizeName = (name: string) => {
  let arr = name.toLowerCase().trim().split(" ");
  const newName = arr.map((i) => `${i.charAt(0).toUpperCase()}${i.slice(1)}`);
  return newName.join(" ");
};
