import React from "react";
import {
  Col,
  Dropdown,
  Form,
  Input,
  Row,
  Space,
  TimePicker,
  Typography,
  DownOutlined,
} from "antd";

const ApplyDoctor = () => {
  const handlesFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handlesFinish} className="m-3">
        <h4>Personal Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstname"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastname"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your email" />
            </Form.Item>
          </Col>
        </Row>

        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
          <select
                    class="form-select"
                    name="specialization"
                    area-label="Default select example"
                    onChange={handlesFinish}
                  >
                    <option value="select one" disabled selected>Select one</option>
                    {/* {categories.map((item, index) => {
                      return (
                        <>
                        <option key={index} value={item._id}>{item.category}</option></>
                      );
                    })} */}
                  </select>
          </Col>
          <br />
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees per consultation"
              name="feesPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Enter your fees" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ApplyDoctor;
