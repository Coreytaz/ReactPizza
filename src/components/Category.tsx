import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (id: number) => void;
};

const categoryes = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Category: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categoryes.map((category, i) => (
            <li
              key={i}
              className={value === i ? "active" : ""}
              onClick={() => onChangeCategory(i)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Category;
