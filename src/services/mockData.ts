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

// 模拟商品数据
export interface ProductItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  type: string;
  price: string;
  sales: string;
  stock: string;
  views: string;
  status: boolean;
  tags?: string[];
  activities?: string[];
}

export const mockProducts: ProductItem[] = [
  {
    id: '1',
    productId: '983',
    name: 'U2024夏季新款上衣复古文艺风格条纹衫-字母印花T恤LOGO#2080',
    image: 'https://via.placeholder.com/50',
    type: '普通商品',
    price: '0.01',
    sales: '464',
    stock: '1778',
    views: '9999',
    status: true,
    tags: ['新品'],
    activities: ['促销']
  },
  {
    id: '2',
    productId: '908',
    name: 'FOXX 夏季 简约纯色宽松版男士T恤 2色M/2XL',
    image: 'https://via.placeholder.com/50',
    type: '普通商品',
    price: '7580.02',
    sales: '141',
    stock: '16511',
    views: '9999',
    status: true,
    tags: ['热销'],
    activities: ['促销']
  },
  {
    id: '3',
    productId: '48',
    name: '欧式沙发 实木 BSML 086XL 2米 3组合',
    image: 'https://via.placeholder.com/50',
    type: '普通商品',
    price: '300.00',
    sales: '609',
    stock: '2668',
    views: '9998',
    status: true,
    tags: ['热销'],
    activities: ['促销']
  },
  {
    id: '4',
    productId: '911',
    name: '真皮椅 (275XH) 电子家居办公系列ASSC 时尚舒适型电脑椅',
    image: 'https://via.placeholder.com/50',
    type: '普通商品',
    price: '8700.00',
    sales: '1295',
    stock: '33733',
    views: '9987',
    status: true,
    tags: ['热销'],
    activities: ['限时']
  },
  {
    id: '5',
    productId: '934',
    name: '实木家具 北欧风格设计师原创精致家居沙发组合',
    image: 'https://via.placeholder.com/50',
    type: '普通商品',
    price: '3432.00',
    sales: '8',
    stock: '471',
    views: '9995',
    status: true,
    tags: ['新品'],
    activities: []
  }
];

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