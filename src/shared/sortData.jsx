export const sortData = (data, sortOption) => {
  return [...data].sort((a, b) => {
    switch (sortOption) {
      case "no-asc":
        return a.id - b.id;
      case "no-desc":
        return b.id - a.id;
      case "active-asc":
        return Number(b.is_active) - Number(a.is_active);
      case "active-desc":
        return Number(a.is_active) - Number(b.is_active);
      case "point-asc":
        return a.point - b.point;
      case "point-desc":
        return b.point - a.point;
    }
  });
};
