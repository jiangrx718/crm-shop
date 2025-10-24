// 模拟商品分类数据（支持树状结构）
export interface CategoryItem {
  id: number;
  name: string;
  image: string;
  sort: number;
  status: boolean;
  parentId: number | null;
  children: CategoryItem[];
}

export interface FlattenedCategoryItem extends CategoryItem {
  level?: number;
}

export const categoryData: CategoryItem[] = [
  {
    id: 1,
    name: '家用电器',
    image: 'https://via.placeholder.com/40',
    sort: 1,
    status: true,
    parentId: null,
    children: [
      {
        id: 11,
        name: '大家电',
        image: 'https://via.placeholder.com/40',
        sort: 1,
        status: true,
        parentId: 1,
        children: []
      },
      {
        id: 12,
        name: '厨房电器',
        image: 'https://via.placeholder.com/40',
        sort: 2,
        status: true,
        parentId: 1,
        children: []
      }
    ]
  },
  {
    id: 2,
    name: '服装服饰',
    image: 'https://via.placeholder.com/40',
    sort: 2,
    status: true,
    parentId: null,
    children: [
      {
        id: 21,
        name: '男装',
        image: 'https://via.placeholder.com/40',
        sort: 1,
        status: true,
        parentId: 2,
        children: [
          {
            id: 211,
            name: 'T恤',
            image: 'https://via.placeholder.com/40',
            sort: 1,
            status: true,
            parentId: 21,
            children: []
          }
        ]
      },
      {
        id: 22,
        name: '女装',
        image: 'https://via.placeholder.com/40',
        sort: 2,
        status: true,
        parentId: 2,
        children: []
      }
    ]
  },
  {
    id: 3,
    name: '家居用品',
    image: 'https://via.placeholder.com/40',
    sort: 3,
    status: true,
    parentId: null,
    children: []
  },
  {
    id: 4,
    name: '厨房用品',
    image: 'https://via.placeholder.com/40',
    sort: 4,
    status: true,
    parentId: null,
    children: []
  },
  {
    id: 5,
    name: '美妆护肤',
    image: 'https://via.placeholder.com/40',
    sort: 5,
    status: true,
    parentId: null,
    children: []
  }
];

// 将树形结构转换为扁平化数组用于表格显示
export const flattenCategoryData = (categories: CategoryItem[], level = 0): FlattenedCategoryItem[] => {
  let result: FlattenedCategoryItem[] = [];
  categories.forEach(category => {
    result.push({ ...category, level });
    if (category.children && category.children.length > 0) {
      result = result.concat(flattenCategoryData(category.children, level + 1));
    }
  });
  return result;
};