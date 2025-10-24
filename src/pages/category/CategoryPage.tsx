import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Switch, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { categoryData } from '../../services/mockData.ts';

const { Option } = Select;

interface CategoryItem {
  id: number;
  name: string;
  image: string;
  sort: number;
  status: boolean;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    // 模拟从API获取数据
    setCategories(categoryData);
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
      render: (status: boolean, record: CategoryItem) => (
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
      render: (_: any, record: CategoryItem) => (
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
    setCategories(
      categories.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
    message.success(`状态已${status ? '启用' : '禁用'}`);
  };

  const handleEdit = (record: CategoryItem) => {
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      image: record.image,
      sort: record.sort,
      status: record.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个分类吗？',
      onOk() {
        setCategories(categories.filter(item => item.id !== id));
        message.success('删除成功');
      },
    });
  };

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    form.setFieldsValue({ status: true, sort: 0 });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingId) {
        // 编辑现有分类
        setCategories(
          categories.map(item => 
            item.id === editingId ? { ...item, ...values } : item
          )
        );
        message.success('更新成功');
      } else {
        // 添加新分类
        const newCategory = {
          id: Math.max(...categories.map(c => c.id), 0) + 1,
          ...values,
        };
        setCategories([...categories, newCategory]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
    });
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
        dataSource={categories} 
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