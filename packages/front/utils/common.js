import isEmpty from 'lodash/isEmpty';

export const getCategoryName = ({ category, subcategory, categories }) => {
  if (isEmpty(categories)) return { subcategories: [] };
  if (category && subcategory) {
    const cat = categories.find((e) => e.categoryId === category);
    const subcat = cat.subcategories.find(
      (e) => e.subcategoryId === subcategory,
    );

    return {
      subcategory: subcat.subcategory,
      category: cat.category,
    };
  } else if (category && !subcategory) {
    const title = categories.find((e) => e.categoryId === category).category;
    return { title };
  }
  return null;
};

export const sanitizeString = (str) => str.toLowerCase().trim();
