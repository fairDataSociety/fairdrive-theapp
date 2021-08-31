interface IStateEntries {
  access_time?: string;
  block_size?: string;
  content_type?: string;
  creation_time?: string;
  modification_time?: string;
  name: string;
  size?: string;
}
export default function sortByProp(prop: any, up: any) {
  if (up === 'asc') {
    return (a: any, b: any) => (a[prop] > b[prop] ? 1 : -1);
  } else {
    return (b: any, a: any) => (a[prop] > b[prop] ? 1 : -1);
  }
}
export const sortyByCurrentFilter = (
  arrayOfEntries: IStateEntries[] | null,
  currentFilter
): IStateEntries[] => {
  if (!arrayOfEntries) {
    return [];
  }
  const entriesCopy = [...arrayOfEntries];
  switch (currentFilter) {
    case 'file-type':
      entriesCopy.sort((current, next) =>
        current.content_type.localeCompare(next.content_type)
      );
      break;
    case 'decreasing-size':
      entriesCopy.sort(
        (current, next) => parseInt(next.size) - parseInt(current.size)
      );
      break;
    case 'increasing-size':
      entriesCopy.sort(
        (current, next) => parseInt(current.size) - parseInt(next.size)
      );
      break;
    case 'ascending-abc':
      entriesCopy.sort((current, next) =>
        current.name.localeCompare(next.name)
      );

      break;
    case 'descending-abc':
      entriesCopy.sort((current, next) =>
        current.name.localeCompare(next.name)
      );
      entriesCopy.reverse();
      break;
    default:
      entriesCopy.sort(
        (current, next) => parseInt(next.creation_time) - parseInt(current.size)
      );
      break;
  }
  return entriesCopy;
};
