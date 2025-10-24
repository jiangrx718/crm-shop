import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Switch, Modal, Form, Input, Select, message, TreeSelect } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { categoryData, flattenCategoryData, CategoryItem, FlattenedCategoryItem } from '../../services/mockData';

const { Option } = Select;

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [flattenedCategories, setFlattenedCategories] = useState<FlattenedCategoryItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    // 模拟从API获取数据
    setCategories(categoryData);
    setFlattenedCategories(flattenCategoryData(categoryData));
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: FlattenedCategoryItem) => (
        <span style={{ paddingLeft: `${record.level ? record.level * 20 : 0}px` }}>
          {record.level ? '├─ ' : ''}
          {text}
        </span>
      ),
    },
    {
      title: '分类图标',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="分类图标" style={{ width: 40, height: 40 }} />
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: FlattenedCategoryItem) => (
        <Switch 
          checked={status} 
          onChange={(checked) => handleStatusChange(record.id, checked)}
          checkedChildren="开启" 
          unCheckedChildren="关闭" 
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: FlattenedCategoryItem) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusChange = (id: number, status: boolean) => {
    // 这里应该更新原始树形结构数据的状态
    message.success(`状态已${status ? '启用' : '禁用'}`);
  };

  const handleEdit = (record: FlattenedCategoryItem) => {
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      image: record.image,
      sort: record.sort,
      status: record.status,
      parentId: record.parentId,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个分类吗？',
      onOk() {
        // 这里应该从原始树形结构中删除分类
        message.success('删除成功');
      },
    });
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    form.setFieldsValue({ status: true, sort: 0, parentId: undefined });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingId) {
        // 编辑现有分类
        message.success('更新成功');
      } else {
        // 添加新分类
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
  };

  // 构建父级分类选择器选项
  const getParentCategoryOptions = () => {
    const options: { value: number | undefined; label: string }[] = [{ value: undefined, label: '无父级分类' }];
    
    const addOptions = (categories: CategoryItem[], prefix = '') => {
      categories.forEach(category => {
        options.push({
          value: category.id,
          label: `${prefix}${category.name}`
        });
        
        if (category.children && category.children.length > 0) {
          addOptions(category.children, `${prefix}${category.name} > `);
        }
      });
    };
    
    addOptions(categories);
    return options;
  };

  return (
    <div className="category-page">
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>商品分类</span>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
        >
          添加分类
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={flattenedCategories} 
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId ? "编辑分类" : "添加分类"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="parentId"
            label="父级分类"
          >
            <TreeSelect
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={getParentCategoryOptions() as any}
              placeholder="请选择父级分类"
              treeDefaultExpandAll
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item
            name="image"
            label="分类图标"
            rules={[{ required: true, message: '请输入图标URL' }]}
          >
            <Input placeholder="请输入图标URL" />
          </Form.Item>
          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序值' }]}
          >
            <Input type="number" placeholder="数字越小越靠前" />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
          >
            <Switch checkedChildren="开启" unCheckedChildren="关闭" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryPage;