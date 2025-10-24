import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Input, 
  Select, 
  Button, 
  Table, 
  Tag, 
  Space, 
  Image, 
  Switch,
  Row,
  Col
} from 'antd';
import { 
  PlusOutlined, 
  ExportOutlined, 
  FilterOutlined, 
  SortAscendingOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../../services/mockData';

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;

const ProductPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();

  // 表格列定义
  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: '商品ID',
      dataIndex: 'productId',
      key: 'productId',
      width: 100,
      render: (text: string) => <div>{text}</div>,
    },
    {
      title: '商品图',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string) => (
        <Image
          src={image}
          alt="商品图片"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text: string, record: any) => (
        <div>
          <div>{text}</div>
          {record.tags && record.tags.map((tag: string) => (
            <Tag color="blue" key={tag}>{tag}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: '参与活动',
      dataIndex: 'activities',
      key: 'activities',
      width: 100,
      render: (activities: string[]) => (
        <div>
          {activities && activities.map((activity: string) => (
            <Tag color="orange" key={activity}>{activity}</Tag>
          ))}
        </div>
      ),
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '商品单价',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
      width: 80,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: boolean) => (
        <Switch checked={status} size="small" />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_: any, record: any) => (
        <Space size="middle">
          <a href="#" onClick={(e) => { e.preventDefault(); }}>编辑</a>
          <a href="#" onClick={(e) => { e.preventDefault(); }}>更多</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="product-page">
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          tabBarExtraContent={
            <Button type="primary">发布</Button>
          }
        >
          <TabPane tab="主页" key="1"></TabPane>
          <TabPane tab="商品列表" key="2"></TabPane>
          <TabPane tab="商品管理" key="3" />
          <TabPane tab="商品分类" key="4" />
          <TabPane tab="代售列表" key="5" />
          <TabPane tab="活动管理" key="6" />
          <TabPane tab="用户评价" key="7" />
        </Tabs>

        <div className="filter-section" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Row gutter={16} align="middle">
            <Col span={8}>
              <Search placeholder="输入商品名称或编号搜索" style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: '100%' }}>
                <Option value="all">全部</Option>
                <Option value="normal">普通商品</Option>
                <Option value="special">特价商品</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select defaultValue="全部" style={{ width: '100%' }}>
                <Option value="all">全部</Option>
                <Option value="inStock">有库存</Option>
                <Option value="outOfStock">无库存</Option>
              </Select>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Space>
                <Button icon={<PlusOutlined />} onClick={() => navigate('/product/add')}>添加商品</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<SortAscendingOutlined />}>排序</Button>
              </Space>
            </Col>
          </Row>
        </div>

        <Tabs defaultActiveKey="1">
          <TabPane tab="出售中的商品(49)" key="1" />
          <TabPane tab="仓库中的商品(4)" key="2" />
          <TabPane tab="已售罄商品(10)" key="3" />
          <TabPane tab="违规下架商品(20)" key="4" />
          <TabPane tab="定时上架商品(76)" key="5" />
        </Tabs>

        <div className="table-actions" style={{ marginBottom: '16px', marginTop: '16px' }}>
          <Space>
            <Button>批量操作</Button>
            <Button>批量上架</Button>
            <Button>批量改价</Button>
            <Button>批量分类</Button>
          </Space>
        </div>

        <Table 
          columns={columns} 
          dataSource={mockProducts} 
          rowKey="id"
          pagination={{ 
            position: ['bottomRight'],
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`
          }}
          rowSelection={{
            type: 'checkbox',
          }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default ProductPage;