import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Radio, 
  Button, 
  Upload, 
  Space, 
  InputNumber,
  Switch,
  Checkbox,
  Row,
  Col,
  message
} from 'antd';
import { 
  ArrowLeftOutlined, 
  PlusOutlined, 
  UploadOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const AddProductPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const handlePrevious = () => {
    const currentKey = parseInt(activeKey);
    if (currentKey > 1) {
      setActiveKey((currentKey - 1).toString());
    }
  };

  const handleNext = () => {
    const currentKey = parseInt(activeKey);
    if (currentKey < 6) {
      setActiveKey((currentKey + 1).toString());
    }
  };

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        console.log('Form values:', values);
        message.success('商品保存成功');
        navigate('/product');
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleReturn = () => {
    navigate('/product');
  };

  return (
    <div className="add-product-page">
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={handleReturn}>返回</Button>
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>添加商品</span>
        </Space>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            productType: '单规格',
            shippingMethod: ['快递'],
            shippingSettings: '固定邮费',
            memberPriceEnabled: false
          }}
        >
          <Tabs activeKey={activeKey} onChange={handleTabChange}>
            <TabPane tab="基础信息" key="1">
              <div style={{ padding: '20px 0' }}>
                <Form.Item label="商品类型" name="productType">
                  <Radio.Group>
                    <Radio value="单规格">单规格</Radio>
                    <Radio value="多规格">多规格</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item 
                  label="图片" 
                  name="image"
                  extra="建议尺寸：800*800，支持jpg、png、gif格式，最大不能超过2M"
                >
                  <Upload 
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={() => false}
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>上传</div>
                    </div>
                  </Upload>
                </Form.Item>

                <Form.Item label="售价" name="price" rules={[{ required: true, message: '请输入售价' }]}>
                  <InputNumber style={{ width: '200px' }} min={0} precision={2} addonAfter="元" />
                </Form.Item>

                <Form.Item label="成本价" name="costPrice">
                  <InputNumber style={{ width: '200px' }} min={0} precision={2} addonAfter="元" />
                </Form.Item>

                <Form.Item label="划线价" name="originalPrice">
                  <InputNumber style={{ width: '200px' }} min={0} precision={2} addonAfter="元" />
                </Form.Item>

                <Form.Item label="库存" name="stock" rules={[{ required: true, message: '请输入库存' }]}>
                  <InputNumber style={{ width: '200px' }} min={0} precision={0} addonAfter="件" />
                </Form.Item>

                <Form.Item label="商品编码" name="productCode">
                  <Input style={{ width: '200px' }} />
                </Form.Item>

                <Form.Item label="条形码" name="barcode">
                  <Input style={{ width: '200px' }} />
                </Form.Item>

                <Form.Item label="重量" name="weight">
                  <InputNumber style={{ width: '200px' }} min={0} precision={2} addonAfter="kg" />
                </Form.Item>

                <Form.Item label="体积" name="volume">
                  <InputNumber style={{ width: '200px' }} min={0} precision={2} addonAfter="m³" />
                </Form.Item>

                <Form.Item label="商品状态" name="status">
                  <Radio.Group>
                    <Radio value={1}>上架</Radio>
                    <Radio value={0}>下架</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </TabPane>

            <TabPane tab="规格库存" key="2">
              <div style={{ padding: '20px 0' }}>
                <p>规格库存设置内容</p>
              </div>
            </TabPane>

            <TabPane tab="商品详情" key="3">
              <div style={{ padding: '20px 0' }}>
                <Form.Item 
                  label="商品详情" 
                  name="description"
                  rules={[{ required: true, message: '请输入商品详情' }]}
                >
                  <Input.TextArea
                    rows={12}
                    placeholder="请输入商品详情"
                    style={{ marginBottom: '20px' }}
                  />
                </Form.Item>
              </div>
            </TabPane>

            <TabPane tab="物流设置" key="4">
              <div style={{ padding: '20px 0' }}>
                <Form.Item label="物流方式" name="shippingMethod" required>
                  <Checkbox.Group>
                    <Checkbox value="快递">快递</Checkbox>
                    <Checkbox value="到店">到店</Checkbox>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item label="运费设置" name="shippingSettings">
                  <Radio.Group>
                    <Radio value="固定邮费">固定邮费</Radio>
                    <Radio value="运费模板">运费模板</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item 
                  label="邮费" 
                  name="shippingFee"
                  dependencies={['shippingSettings']}
                  noStyle
                >
                  {({ getFieldValue }) => 
                    getFieldValue('shippingSettings') === '固定邮费' ? (
                      <Form.Item>
                        <InputNumber style={{ width: '200px' }} min={0} precision={2} addonAfter="元" />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
              </div>
            </TabPane>

            <TabPane tab="会员价/佣金" key="5">
              <div style={{ padding: '20px 0' }}>
                <Form.Item label="付费会员专属" name="memberPriceEnabled" valuePropName="checked">
                  <Switch />
                </Form.Item>
                <p style={{ color: '#999', marginBottom: '20px' }}>开启后只付费会员可以查看并购买此商品</p>

                <Form.Item label="单独设置" name="specialSettings">
                  <Checkbox.Group>
                    <Row>
                      <Col span={8}>
                        <Checkbox value="memberPrice">会员价设置（数字即代表金额）</Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox value="commission">付费会员价</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </TabPane>

            <TabPane tab="其他设置" key="6">
              <div style={{ padding: '20px 0' }}>
                <p>其他设置内容</p>
              </div>
            </TabPane>
          </Tabs>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Space size="large">
              {activeKey !== '1' && (
                <Button onClick={handlePrevious}>上一步</Button>
              )}
              {activeKey !== '6' ? (
                <Button onClick={handleNext}>下一步</Button>
              ) : null}
              <Button type="primary" onClick={handleSave}>保存</Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddProductPage;